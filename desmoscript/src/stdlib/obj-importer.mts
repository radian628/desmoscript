import { MacroDefinition } from "../../dist/semantic-analysis-types.mjs";


export type ParsedOBJ = {
    vertices: [number, number, number][],
    normals: [number, number, number][],
    texcoords: [number, number][],
    vertexIndices: number[],
    normalIndices: number[],
    texcoordIndices: number[]
}

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


export let loadObj: MacroDefinition["fn"] = async function (expr, ctx, a) {
    
}