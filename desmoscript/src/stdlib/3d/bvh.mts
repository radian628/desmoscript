import { ParsedOBJ } from "./obj-importer.mjs";

export type AABB = {
  min: [number, number, number],
  max: [number, number, number]
};

export type BVHNode<T extends AABB> = {
  data: T[],
  children: BVHNode<T>[]
} & AABB;

enum Axis { X, Y, Z };

function getCombinedBounds(aabbs: AABB[]): AABB {
  if (aabbs.length == 0) {
    return { min: [0, 0, 0], max: [-1, -1, -1] };
  }
  return {
    min:[
      Math.min(...aabbs.map(aabb => aabb.min[0])),
      Math.min(...aabbs.map(aabb => aabb.min[1])),
      Math.min(...aabbs.map(aabb => aabb.min[2])),
    ],
    max:[
      Math.max(...aabbs.map(aabb => aabb.max[0])),
      Math.max(...aabbs.map(aabb => aabb.max[1])),
      Math.max(...aabbs.map(aabb => aabb.max[2])),
    ],
  };
}

function bvhNodeFromData<T extends AABB>(data: T[]) {
  return {
    ...getCombinedBounds(data),
    children: [],
    data
  }
}

function splitBVHNode<T extends AABB>(node: BVHNode<T>): void {
  const xrange = node.max[0] - node.min[0];
  const yrange = node.max[1] - node.min[1];
  const zrange = node.max[2] - node.min[2];
  const longestAxis = Math.max(xrange, yrange, zrange);
  const axis: Axis = {
    [xrange]: Axis.X,
    [yrange]: Axis.Y,
    [zrange]: Axis.Z
  }[longestAxis];

  let sortedChildren: T[];

  function axisCallback(axis: number) {
    return (a: AABB, b: AABB) => (a.max[axis] + a.min[axis]) / 2 - (b.max[axis] + b.min[axis]) / 2
  }

  if (axis == Axis.X) {
    sortedChildren = node.data.sort(axisCallback(0));
  } else if (axis == Axis.Y) {
    sortedChildren = node.data.sort(axisCallback(1));
  } else {
    sortedChildren = node.data.sort(axisCallback(2));
  }

  const splitPoint = Math.floor(sortedChildren.length / 2);

  const halves = [
    sortedChildren.slice(0, splitPoint),
    sortedChildren.slice(splitPoint, sortedChildren.length)
  ];

  node.children = halves.map(half => bvhNodeFromData(half));
}

export function bvhify<T extends AABB>(data: T[]): BVHNode<T> {
  const bvhNode = bvhNodeFromData(data);
  helper(bvhNode);

  function helper(data: BVHNode<T>) {
    splitBVHNode(bvhNode);
    for (const child of bvhNode.children) {
      helper(child);
    }
  }
  
  return bvhNode;
}



export function getBounds(obj: { vertices: [number, number, number][] }) {
  return obj.vertices.reduce((prev: AABB, curr) => {
    return {
      min: [ Math.min(curr[0], prev.min[0]), Math.min(curr[1], prev.min[1]), Math.min(curr[2], prev.min[2]) ],
      max: [ Math.max(curr[0], prev.min[0]), Math.max(curr[1], prev.min[1]), Math.max(curr[2], prev.min[2]) ],
    } as AABB;
  }, { min: [Infinity, Infinity, Infinity], max: [-Infinity, -Infinity, -Infinity]});
}


export function makeOBJBVH(objs: ParsedOBJ[]): BVHNode<ParsedOBJ & AABB> {
  return bvhify(objs.map(obj => {
    return { ...obj, ...getBounds(obj) }
  }));
}