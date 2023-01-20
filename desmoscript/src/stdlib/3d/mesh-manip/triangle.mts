export type Triangle = [
  [number, number, number],
  [number, number, number],
  [number, number, number]
];

export function getAABBOfTriangle(triangle: Triangle): AABB {
  return {
    min: [
      Math.min(...triangle.map(v => v[0])),
      Math.min(...triangle.map(v => v[1])),
      Math.min(...triangle.map(v => v[2])),
    ],
    max: [
      Math.max(...triangle.map(v => v[0])),
      Math.max(...triangle.map(v => v[1])),
      Math.max(...triangle.map(v => v[2])),
    ],
  }
}

export function flipNormal(triangle: Triangle): Triangle {
  return [
    triangle[0],
    triangle[2],
    triangle[1]
  ];
}

export function sphereIntersectLine(center: [number, number, number], radius: number, start: [number, number, number], end: [number, number, number]) {
  let a = (end[0] - start[0]);
  let b = start[0];
  let c = (end[1] - start[1]);
  let d = start[1];
  let e = end[2] - start[2];
  let f = start[2];

  const A = a**2 + c**2 + e**2;
  const B = 2*a*b + 2*c*d + 2*e*f - 2*a*center[0] - 2*c*center[1] - 2*e*center[2];
  const C = b**2 + d**2 + f**2 + center[0]**2 + center[1]**2 + center[2]**2 - 2*b*center[0] - 2*d*center[1] - 2*f*center[2] - radius**2;

  let discrim = (B**2 - 4 * A * C);
  if (discrim < 0) return [];
  discrim = Math.sqrt(discrim);
  return [(-B - discrim) / (2 * A), (-B + discrim) / (2 * A)].filter(t => t >= 0 && t <= 1);
}

function getPointOnLineSegment(start: [number, number, number], end: [number, number, number], t: number) {
  return [
    start[0] + (end[0] - start[0]) * t,
    start[1] + (end[1] - start[1]) * t,
    start[2] + (end[2] - start[2]) * t
  ] as [number, number, number];
}

function triangulateConvexPolygon(polygon: [number, number, number][]) {
  const triangles: Triangle[] = [];
  for (let i = 2; i < polygon.length; i++) {
    triangles.push([
      polygon[0],
      polygon[i - 1],
      polygon[i]
    ]);
  }
  return triangles;
}

import { AABB } from "../bvh.mjs";
import { getNormal, normalize } from "../multi-obj-bvh-to-desmoscript.mjs";
import { approxEqual } from "./multi-obj-cel-shading-to-desmoscript.mjs";

function zTo1(x: number) {
  return (x == 0) ? 1 : x;
}

export function makeNormalsConsistent(triangles: Triangle[], correctTriangle: Triangle): Triangle[] {
  const correctNormal = getNormal(...correctTriangle);
  return triangles.map(t => {
    const otherNormal = getNormal(...t);
    return approxEqual(otherNormal, correctNormal, 0.1) ? t : flipNormal(t);
    // return (otherNormal.every((c, i) => {
    //   const ns1 = Math.sign(c);
    //   const ns2 = Math.sign(correctNormal[i]);
    //   if (ns1 == 0 || ns2 == 0) return true;
    //   return ns1 == ns2;
    // })) ? t : flipNormal(t)
  });
}

export function sphereIntersectTriangle(triangle: Triangle, center: [number, number, number], radius: number): Triangle[] {
  const intersects = [
    sphereIntersectLine(center, radius, triangle[0], triangle[1]),
    sphereIntersectLine(center, radius, triangle[1], triangle[2]),
    sphereIntersectLine(center, radius, triangle[2], triangle[0]),
  ];

  let allTriangles: Triangle[] = [];
  let centerPolygon: [number, number, number][] = [];

  for (let i = 0; i < 3; i++) {
    const vertexIndex = (i + 1) % 3;
    const edge1 = [triangle[i], triangle[(i + 1) % 3]] as const;
    const edge2 = [triangle[(i + 1) % 3], triangle[(i + 2) % 3]] as const;
    const intersects1 = intersects[i];
    const intersects2 = intersects[vertexIndex];

    if (intersects1.length != 0 && intersects2.length != 0) {
      const t1 = intersects1[1] ?? intersects1[0];
      const t2 = intersects2[0];
      const v1 = getPointOnLineSegment(...edge1, t1);
      const v2 = getPointOnLineSegment(...edge2, t2);
      const v3 = triangle[vertexIndex];
      allTriangles.push([v1, v2, v3]);
      centerPolygon.push(
        getPointOnLineSegment(...edge1, t1),
        getPointOnLineSegment(...edge2, t2),
      );
    } else {
      centerPolygon.push(triangle[vertexIndex]);
    }
  }

  allTriangles.push(...triangulateConvexPolygon(centerPolygon));
  
  return makeNormalsConsistent(allTriangles, triangle);
}

export function getSmoothSurfaceLightToDarkFactor(start: [number, number, number], end: [number, number, number], light: [number, number, number]) {
  return -(
    light[0] * start[0] + light[1] * start[1] + light[2] * start[2] 
  ) / (
    light[0] * (end[0] - start[0]) +
    light[1] * (end[1] - start[1]) +
    light[2] * (end[2] - start[2])
  );
}

// export function splitTriangleLightDark(triangle: Triangle, vertexNormals: Triangle, light: [number, number, number]) {
//   const lToDFactors: number[] = [];
//   for (let i = 0; i < 3; i++) {
//     let pos1 = triangle[i];
//     let pos2 = triangle[(i + 1) % 3];

//     let lightOffset = normalize([
//       light[0] - (pos1[0] + pos2[0]) / 2,
//       light[1] - (pos1[1] + pos2[1]) / 2,
//       light[2] - (pos1[2] + pos2[2]) / 2,
//     ]);
    
//     lToDFactors.push(
//       getSmoothSurfaceLightToDarkFactor(
//         vertexNormals[i],
//         vertexNormals[(i + 1) % 3],
//         lightOffset
//       )
//     );
//   }

//   let intersects = 0;
//   for (let factor of lToDFactors) {
//     if (factor > 0 && factor < 1) {
//       intersects++;
//     }
//   }

//   // keep triangle whole if there's only one intersection
//   if (intersects == 0 || intersects == 1) {
//     return [{ vertices: triangle, vertexNormals }]
//   }

//   // split triangle into three if there's two intersections
//   if (intersects == 2) {
//     const firstEdgeIndex = lToDFactors.findIndex(i => i > 0 && i < 1);
//     const secondEdgeIndex = lToDFactors.slice(firstEdgeIndex + 1).findIndex(i => i > 0 && i < 1) + firstEdgeIndex;
//     const cutEdges: [
//       [number, number, number],
//       [number, number, number],
//       [number, number, number],
//       [number, number, number]
//     ] = [
//       triangle[firstEdgeIndex],
//       triangle[(firstEdgeIndex + 1) % 3],
//       triangle[secondEdgeIndex],
//       triangle[(secondEdgeIndex + 1) % 3]
//     ];

//     // where are the edges cut?
//     let cutEdgeLocations: [
//       [number, number, number],
//       [number, number, number]
//     ] = [
//       getPointOnLineSegment(cutEdges[0], cutEdges[1], lToDFactors[firstEdgeIndex]),
//       getPointOnLineSegment(cutEdges[2], cutEdges[3], lToDFactors[firstEdgeIndex])
//     ];

//     // where is the vertex that is "cut off"?
//     let cutVertexIndex = 0;
//     if (firstEdgeIndex == 0) {
//       if (secondEdgeIndex == 1) {
//         cutVertexIndex = 1;
//       } else {
//         cutVertexIndex = 0;
//       }
//     } else {
//       cutVertexIndex = 2;
//     }
//   }

//   // split triangle into six if there's three intersections
// }

export function center(triangle: Triangle): [number, number, number] {
  return [
    (triangle[0][0] + triangle[1][0] + triangle[2][0]) / 3,
    (triangle[0][1] + triangle[1][1] + triangle[2][1]) / 3,
    (triangle[0][2] + triangle[1][2] + triangle[2][2]) / 3
  ];
}

export function distance(p1: [number, number, number], p2: [number, number, number]) {
  return Math.hypot(
    p1[0] - p2[0],
    p1[1] - p2[1],
    p1[2] - p2[2],
  );
}

export type DesmosLightingModelMesh = {
  triangles: {
    vertices: Triangle,
    color: [number, number, number],
    depthOffset: number,
    lighting: {
      color: [number, number, number], // light color
      type: number // determines how the light flickers over time
    }[]
  }[],
  aabb: AABB
};
