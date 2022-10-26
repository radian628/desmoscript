import { ASTFunctionCall, ASTType } from "../ast.mjs";
import { MacroAPI, MacroDefinition, ScopedASTExpr, ScopeInfo } from "../semantic-analysis-types.mjs";
import * as fs from "node:fs/promises";


export type ParsedOBJ = {
    vertices: [number, number, number][],
    normals: [number, number, number][],
    texcoords: [number, number][],
    vertexIndices: number[],
    normalIndices: number[],
    texcoordIndices: number[],
    materials: MTLMaterial[],
    faceMaterials: number[],
    materialMap: {
        [str: string]: number
    }
}

export type MTLMaterial = {
    ambient?: [number, number, number],
    diffuse?: [number, number, number],
    specular?: [number, number, number],
    specularExponent?: number,
    dissolve?: number,
    illuminationModel?: number
};

export type ParsedMTL = {
    materials: {
        [materialName: string]: MTLMaterial
    }
}

export const parsedOBJKeys: (keyof ParsedOBJ)[] = [
    "vertices",
    "normals",
    "texcoords",
    "vertexIndices",
    "normalIndices",
    "texcoordIndices",
    "materials",
    "faceMaterials"
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

function is1long<T>(l: T[]): T {
    if (l.length != 1) throw new Error("Malformed input: Expected 1 number.");
    //@ts-ignore
    return l;
}

export function parseMtl(src: string) {
    const output: ParsedMTL = {
        materials: {}
    }
    let currentMaterial: MTLMaterial | undefined;
    
    
    const splitSrc = src.split("\n").map(s => s.split(" "));
    for (let line of splitSrc) {
        switch (line[0]) {
        case "newmtl":
            currentMaterial = {};
            output.materials[line[1]] = currentMaterial;
            break;
        }

        if (!currentMaterial) continue;

        switch (line[0]) {
        case "Ns":
            currentMaterial.specularExponent = is1long(rest2num(line));
            break;
        case "d":
            currentMaterial.dissolve = is1long(rest2num(line));
            break;
        case "illum":
            currentMaterial.illuminationModel = is1long(rest2num(line));
            break;
        case "Ka":
            currentMaterial.ambient = is3long(rest2num(line));
            break;
        case "Kd":
            currentMaterial.diffuse = is3long(rest2num(line));
            break;
        case "Ks":
            currentMaterial.specular = is3long(rest2num(line));
            break;
        }
    }

    return output;
}

export async function parseObj(src: string) {
    const output: ParsedOBJ = {
        vertices: [],
        normals: [],
        texcoords: [],
        vertexIndices: [],
        normalIndices: [],
        texcoordIndices: [],
        faceMaterials: [],
        materials: [],
        materialMap: {}
    };
    let currentMaterial = -1;
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
            output.faceMaterials.push(currentMaterial);
            break;
        case "mtllib":
            let mtls = (await Promise.all(
                line.slice(1)
                .map(async l => await fs.readFile(l))
            )).map(mtl => mtl.toString())
                .map(mtl => parseMtl(mtl));
            for (let mtl of mtls) {
                for (let [mtlname, mtldata] of Object.entries(mtl.materials)) {
                    output.materials.push(mtldata);
                    output.materialMap[mtlname] = output.materials.length - 1;
                }
            }
            break;
        case "usemtl":
            currentMaterial = output.materialMap[line[1]] ?? -1;
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

    const obj = await tryParseObj(objFileStr, a);

    return a.ns(namespace,
        includeArg.map(arg => {
            switch (arg) {
            case "vertices":
                return desmoscriptObjVertices(obj, a);
            case "normals":
                return desmoscriptObjNormals(obj, a);
            case "texcoords":
                return desmoscriptObjTexcoords(obj, a);
            case "vertexIndices":
                return desmoscriptObjVertexIndices(obj, a);
            case "normalIndices":
                return desmoscriptObjNormalIndices(obj, a);
            case "texcoordIndices":
                return desmoscriptObjTexcoordIndices(obj, a);
            case "materials":
                return desmoscriptObjMaterials(obj, a);
            case "faceMaterials":
                return desmoscriptObjFaceMaterials(obj, a);
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

function desmoscriptObjNormals(obj: ParsedOBJ, a: MacroAPI) {
    return a.ns(
        "normals",
        [
            a.binop(a.ident("x"), "=", a.list(...obj.normals.map(v => a.number(v[0])))),
            a.binop(a.ident("y"), "=", a.list(...obj.normals.map(v => a.number(v[1])))),
            a.binop(a.ident("z"), "=", a.list(...obj.normals.map(v => a.number(v[2])))),
        ]
    )
}

function desmoscriptObjTexcoords(obj: ParsedOBJ, a: MacroAPI) {
    return a.ns(
        "texcoords",
        [
            a.binop(a.ident("x"), "=", a.list(...obj.texcoords.map(v => a.number(v[0])))),
            a.binop(a.ident("y"), "=", a.list(...obj.texcoords.map(v => a.number(v[1])))),
        ]
    )
}

function desmoscriptObjVertexIndices(obj: ParsedOBJ, a: MacroAPI) {
    return a.binop(a.ident("vertexIndices"), "=", a.list(...obj.vertexIndices.map(v => a.number(v))));
}

function desmoscriptObjNormalIndices(obj: ParsedOBJ, a: MacroAPI) {
    return a.binop(a.ident("normalIndices"), "=", a.list(...obj.normalIndices.map(v => a.number(v))));
}

function desmoscriptObjTexcoordIndices(obj: ParsedOBJ, a: MacroAPI) {
    return a.binop(a.ident("texcoordIndices"), "=", a.list(...obj.texcoordIndices.map(v => a.number(v))));
}

function desmoscriptObjFaceMaterials(obj: ParsedOBJ, a: MacroAPI) {
    return a.binop(a.ident("faceMaterials"), "=", a.list(...obj.faceMaterials.map(v => a.number(v + 1))));
}

function desmoscriptObjMaterials(obj: ParsedOBJ, a: MacroAPI) {

    function rgbProperty(name: string, data: [number, number, number][]) {
        return a.ns(
            name,
            [
                a.binop(a.ident("r"), "=", a.list(...data.map(d => a.number(d[0])))),
                a.binop(a.ident("g"), "=", a.list(...data.map(d => a.number(d[1])))),
                a.binop(a.ident("b"), "=", a.list(...data.map(d => a.number(d[2]))))
            ]
        );
    }

    return a.ns(
        "materials",
        [
            rgbProperty("diffuse", 
            obj.materials
            .map(mat => mat.diffuse ?? [-1,-1,-1])),

            rgbProperty("ambient", 
            obj.materials
            .map(mat => mat.ambient ?? [-1,-1,-1])),

            rgbProperty("specular", 
            obj.materials
            .map(mat => mat.specular ?? [-1,-1,-1])),

            a.binop(a.ident("specularExponent"), "=",
            a.list(...obj.materials.map(mat => a.number(mat.specularExponent ?? -1)))),

            a.binop(a.ident("illuminationModel"), "=",
            a.list(...obj.materials.map(mat => a.number(mat.illuminationModel ?? -1)))),

            a.binop(a.ident("dissolve"), "=",
            a.list(...obj.materials.map(mat => a.number(mat.dissolve ?? -1)))),
        ]
    )
}