import { ASTFunctionCall, ASTType } from "../ast.mjs";
import { MacroAPI, MacroDefinition, ScopedASTExpr, ScopeInfo } from "../semantic-analysis-types.mjs";
import * as fs from "node:fs/promises";


export type ParsedOBJ = {
    vertices: [number, number, number][],
    normals: [number, number, number][],
    texcoords: [number, number][],
    vertexIndices: number[],
    normalIndices: number[],
    texcoordIndices: number[]
}

export const parsedOBJKeys: (keyof ParsedOBJ)[] = [
    "vertices",
    "normals",
    "texcoords",
    "vertexIndices",
    "normalIndices",
    "texcoordIndices"
];

function rest2num(l: string[]) {
    return l.slice(1).map(n => Number(n));
}

function is3long<T>(l: T[]): [T, T, T] {
    if (l.length != 3) throw new Error("Malformed input: Expected 3 numbers.");
    //@ts-ignore
    return l;
}
function is2long<T>(l: T[]): [T, T] {
    if (l.length != 2) throw new Error("Malformed input: Expected 2 numbers.");
    //@ts-ignore
    return l;
}

export function parseObj(src: string) {
    const output: ParsedOBJ = {
        vertices: [],
        normals: [],
        texcoords: [],
        vertexIndices: [],
        normalIndices: [],
        texcoordIndices: []
    };
    const splitSrc = src.split("\n").map(s => s.split(" "));
    for (let line of splitSrc) {
        switch (line[0]) {
        case "v":
            output.vertices.push(is3long(rest2num(line)));
            break;
        case "vn":
            output.normals.push(is3long(rest2num(line)));
            break;
        case "vt":
            output.texcoords.push(is2long(rest2num(line)));
            break;
        case "f":
            const coords = line.slice(1)
                .map(s => s.split("/").map(s => Number(s)));
            output.vertexIndices.push(coords[0][0], coords[1][0], coords[2][0]);
            output.texcoordIndices.push(coords[0][1], coords[1][1], coords[2][1]);
            output.normalIndices.push(coords[0][2], coords[1][2], coords[2][2]);
            break;
        }
    }
    return output;
}

function parseNoteString(expr: ScopedASTExpr | undefined, a: MacroAPI, errctx: string): string {
    if (!expr || expr.type != ASTType.NOTE) {
        a.error(`Error in ${errctx}: Expected a string literal.`);
    }
    return expr.text;
}

function parseIdentSingleString(expr: ScopedASTExpr | undefined, a: MacroAPI, errctx: string): string {
    if (!expr || expr.type != ASTType.IDENTIFIER) {
        a.error(`Error in ${errctx}: Expected an identifier.`);
    }
    if (expr.segments.length != 1) {
        a.error(`Error in ${errctx}: Expected the provided identifier to have only one segment (no '.')`);
    }
    return expr.segments[0];
}


function parseIdentList(expr: ScopedASTExpr | undefined, a: MacroAPI, errctx: string): string[] {
    if (!expr || expr.type != ASTType.LIST) {
        a.error(`Error in ${errctx}: Expected a list of identifiers.`);
    }
    return expr.elements.map((elem, i) => parseIdentSingleString(elem, a, `${errctx}, element ${i}`))
}


function tryParseObj(str: string, a: MacroAPI) {
    try {
        return parseObj(str);
    } catch (err) {
        a.error(`Failed to parse OBJ file: ${(err as Error).message}`);
    }
}


function parseObjKey(key: string, a: MacroAPI): keyof ParsedOBJ {
    if (parsedOBJKeys.indexOf(key as keyof ParsedOBJ) == -1) {
        a.error(`'${key}' is not a valid OBJ property.`);
    }
    return key as keyof ParsedOBJ;
}


export let loadObj: MacroDefinition["fn"] = async function (expr, ctx, a) {
    const namespace = parseIdentSingleString(expr.args[0], a, "argument 1");
    const filepathArg = parseNoteString(expr.args[1], a, "argument 2");
    const includeArg = (expr.args.length == 2) ? parsedOBJKeys 
        : parseIdentList(expr.args[2], a, "argument 3").map(key => parseObjKey(key, a));
    for (const arg of includeArg) {
        if (includeArg.indexOf(arg) != includeArg.lastIndexOf(arg)) {
            a.error(`'${arg}' has a duplicate at position ${includeArg.lastIndexOf(arg)} within the OBJ property array.`);
        }
    }

    let objFileStr = "";

    try {
        objFileStr = (await fs.readFile(filepathArg)).toString();
    } catch {
        a.error("Failed to get OBJ file.");
    }

    const obj = tryParseObj(objFileStr, a);

    return a.ns(namespace,
        includeArg.map(arg => {
            switch (arg) {
            case "vertices":
                return desmoscriptObjVertices(obj, a);
            default:
                return a.note("INVALID OBJ DATA");
            }
        })
    );
}

function desmoscriptObjVertices(obj: ParsedOBJ, a: MacroAPI) {
    return a.ns(
        "vertices",
        [
            a.binop(a.ident("x"), "=", a.list(...obj.vertices.map(v => a.number(v[0])))),
            a.binop(a.ident("y"), "=", a.list(...obj.vertices.map(v => a.number(v[1])))),
            a.binop(a.ident("z"), "=", a.list(...obj.vertices.map(v => a.number(v[2])))),
        ]
    )
}