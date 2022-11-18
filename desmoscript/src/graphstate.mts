import { z } from "zod";

interface BaseItemState {
  id: ID;
  secret?: boolean;
}

export const baseItemStateParser = z.object({
  id: z.string(),
  secret: z.boolean().optional(),
});

interface BaseNonFolderState extends BaseItemState {
  folderId?: ID;
}

export const baseNonFolderStateParser = z.intersection(
  baseItemStateParser,
  z.object({
    folderId: z.string().optional(),
  })
);

export type LineStyle = "SOLID" | "DASHED" | "DOTTED";

export const lineStyleParser = z.union(
  [z.literal("SOLID"), z.literal("DASHED"), z.literal("DOTTED")],
  {}
);

export type PointStyle = "POINT" | "OPEN" | "CROSS";

export const pointStyleParser = z.union(
  [z.literal("POINT"), z.literal("OPEN"), z.literal("CROSS")],
  {}
);

export type DragMode = "NONE" | "X" | "Y" | "XY" | "AUTO";

export const dragModeParser = z.union(
  [
    z.literal("NONE"),
    z.literal("X"),
    z.literal("Y"),
    z.literal("XY"),
    z.literal("AUTO"),
  ],
  {}
);

export type LabelSize = "SMALL" | "MEDIUM" | "LARGE" | Latex;

export const labelSizeParser = z.union(
  [z.literal("SMALL"), z.literal("MEDIUM"), z.literal("LARGE"), z.string()],
  {}
);

export type LabelOrientation =
  | "default"
  | "center"
  | "center_auto"
  | "auto_center"
  | "above"
  | "above_left"
  | "above_right"
  | "above_auto"
  | "below"
  | "below_left"
  | "below_right"
  | "below_auto"
  | "left"
  | "auto_left"
  | "right"
  | "auto_right";

export const labelOrientationParser = z.union(
  [
    z.literal("default"),
    z.literal("center"),
    z.literal("center_auto"),
    z.literal("auto_center"),
    z.literal("above"),
    z.literal("above_left"),
    z.literal("above_right"),
    z.literal("above_auto"),
    z.literal("below"),
    z.literal("below_left"),
    z.literal("below_right"),
    z.literal("below_auto"),
    z.literal("left"),
    z.literal("auto_left"),
    z.literal("right"),
    z.literal("auto_right"),
  ],
  {}
);

export interface Domain {
  min: Latex;
  max: Latex;
}

export const domainParser = z.object({
  min: z.string(),
  max: z.string(),
});

export interface BaseClickable {
  enabled?: boolean;
  // description is the screen reader label
  description?: string;
  latex?: Latex;
}

export const baseClickableParser = z.object({
  enabled: z.boolean().optional(),
  description: z.string().optional(),
  latex: z.string().optional(),
});

interface ExpressionStateWithoutColumn extends BaseNonFolderState {
  type: "expression";
  showLabel?: boolean;
  fill?: boolean;
  fillOpacity?: Latex;
  label?: string;
  labelSize?: LabelSize;
  labelOrientation?: LabelOrientation;
  labelAngle?: Latex;
  suppressTextOutline?: boolean;
  // interactiveLabel is show-on-hover
  interactiveLabel?: boolean;
  editableLabelMode?: "MATH" | "TEXT";
  residualVariable?: Latex;
  regressionParameters?: {
    // key should be Latex, but type aliases are not allowed as keys
    [key: string]: number;
  };
  isLogModeRegression?: boolean;
  displayEvaluationAsFraction?: boolean;
  slider?: {
    hardMin?: boolean;
    hardMax?: boolean;
    animationPeriod?: number;
    loopMode?:
      | "LOOP_FORWARD_REVERSE"
      | "LOOP_FORWARD"
      | "PLAY_ONCE"
      | "PLAY_INDEFINITELY";
    playDirection?: 1 | -1;
    isPlaying?: boolean;
    min?: Latex;
    max?: Latex;
    step?: Latex;
  };
  polarDomain?: Domain;
  parametricDomain?: Domain;
  // seems like `domain` may be the same as `parametricDomain`
  domain?: Domain;
  cdf?: {
    show: boolean;
    min?: Latex;
    max?: Latex;
  };
  vizProps?: {
    // -- Applies to boxplot only:
    // axisOffset=offset and breadth=height (boxplots only)
    breadth?: Latex;
    axisOffset?: Latex;
    alignedAxis?: "x" | "y";
    showBoxplotOutliers?: boolean;
    // -- Applies to dotplot only:
    // the string "binned" is never actually checked,
    // just inferred by the absence of "exact"
    dotplotXMode?: "exact" | "binned";
    // -- applies to dotplot and histogram only:
    binAlignment?: "left" | "center";
    // -- applies to histogram only:
    // the string "count" is never actually checked,
    // just inferred by the absence of "relative" and "density"
    histogramMode?: "count" | "relative" | "density";
  };
  clickableInfo?: BaseClickable;
}

export const expressionStateWithoutColumnParser = z.object({
  type: z.literal("expression"),
  showLabel: z.boolean().optional(),
  fill: z.boolean().optional(),
  fillOpacity: z.string().optional(),
  label: z.string().optional(),
  labelSize: labelSizeParser.optional(),
  labelOrientation: labelOrientationParser.optional(),
  labelAngle: z.string().optional(),
  suppressTextOutline: z.boolean().optional(),
  interactiveLabel: z.boolean().optional(),
  editableLabelMode: z.union([z.literal("MATH"), z.literal("TEXT")]).optional(),
  residualVariable: z.string().optional(),
  regressionParameters: z.record(z.string(), z.number()).optional(),
  isLogModeRegression: z.boolean().optional(),
  displayEvaluationAsFraction: z.boolean().optional(),
  slider: z
    .object({
      hardMin: z.boolean().optional(),
      hardMax: z.boolean().optional(),
      animationPeriod: z.number().optional(),
      loopMode: z
        .union([
          z.literal("LOOP_FORWARD_REVERSE"),
          z.literal("LOOP_FORWARD"),
          z.literal("PLAY_ONCE"),
          z.literal("PLAY_INDEFINITELY"),
        ])
        .optional(),
      playDirection: z.union([z.literal(-1), z.literal(1)]).optional(),
      isPlaying: z.boolean().optional(),
      min: z.string().optional(),
      max: z.string().optional(),
      step: z.string().optional(),
    })
    .optional(),
  polarDomain: domainParser.optional(),
  parametricDomain: domainParser.optional(),
  domain: domainParser.optional(),
  cdf: z
    .object({
      show: z.boolean(),
      min: z.string().optional(),
      max: z.string().optional(),
    })
    .optional(),
  vizProps: z
    .object({
      breadth: z.string().optional(),
      axisOffset: z.string().optional(),
      alignedAxis: z.union([z.literal("x"), z.literal("y")]).optional(),
      showBoxplotOutliers: z.boolean().optional(),
      dotplotXMode: z
        .union([z.literal("exact"), z.literal("binned")])
        .optional(),
      binAlignment: z
        .union([z.literal("left"), z.literal("center")])
        .optional(),
      histogramMode: z
        .union([
          z.literal("count"),
          z.literal("relative"),
          z.literal("density"),
        ])
        .optional(),
    })
    .optional(),
  clickableinfo: baseClickableParser.optional(),
});

export interface ColumnExpressionShared {
  color: string;
  latex?: Latex;
  hidden?: boolean;
  points?: boolean;
  lines?: boolean;
  dragMode?: DragMode;
  lineStyle?: LineStyle;
  pointStyle?: PointStyle;
  colorLatex?: Latex;
  lineOpacity?: Latex;
  lineWidth?: Latex;
  pointSize?: Latex;
  pointOpacity?: Latex;
}

export const columnExpressionSharedParser = z.object({
  color: z.string(),
  latex: z.string().optional(),
  hidden: z.boolean().optional(),
  points: z.boolean().optional(),
  lines: z.boolean().optional(),
  dragMode: dragModeParser.optional(),
  lineStyle: lineStyleParser.optional(),
  pointStyle: pointStyleParser.optional(),
  colorLatex: z.string().optional(),
  lineOpacity: z.string().optional(),
  lineWidth: z.string().optional(),
  pointSize: z.string().optional(),
  pointOpacity: z.string().optional(),
});

export type ExpressionState = ExpressionStateWithoutColumn &
  ColumnExpressionShared;

export const expressionStateParser = expressionStateWithoutColumnParser.merge(
  columnExpressionSharedParser
);

export interface ImageState extends BaseNonFolderState {
  type: "image";
  image_url: string;
  name?: string;
  width?: Latex;
  height?: Latex;
  hidden?: boolean;
  center?: Latex;
  angle?: Latex;
  opacity?: Latex;
  foreground?: boolean;
  draggable?: boolean;
  clickableInfo?: BaseClickable & {
    hoveredImage?: string;
    depressedImage?: string;
  };
}

export const imageStateParser = z.object({
  type: z.literal("image"),
  image_url: z.string(),
  name: z.string().optional(),
  width: z.string().optional(),
  height: z.string().optional(),
  hidden: z.boolean().optional(),
  center: z.string().optional(),
  angle: z.string().optional(),
  opacity: z.string().optional(),
  foreground: z.boolean().optional(),
  draggable: z.boolean().optional(),
  clickableInfo: z.intersection(
    baseClickableParser,
    z.object({
      hoveredImage: z.string().optional(),
      depressedImage: z.string().optional(),
    })
  ),
});

export type TableColumn = {
  id: ID;
  values: Latex[];
} & ColumnExpressionShared;

export const tableColumnParser = z.intersection(
  z.object({
    id: z.string(),
    values: z.array(z.string()),
  }),
  columnExpressionSharedParser
);

export interface TableState extends BaseNonFolderState {
  type: "table";
  columns: TableColumn[];
}

export const tableStateParser = z.intersection(
  baseNonFolderStateParser,
  z.object({
    type: z.literal("table"),
    columns: z.array(tableColumnParser),
  })
);

export interface FolderState extends BaseItemState {
  type: "folder";
  hidden?: boolean;
  collapsed?: boolean;
  title?: string;
}
export const folderStateParser = z.intersection(
  baseItemStateParser,
  z.object({
    type: z.literal("folder"),
    hidden: z.boolean().optional(),
    collapsed: z.boolean().optional(),
    title: z.string().optional(),
  })
);

export interface TextState extends BaseNonFolderState {
  type: "text";
  text?: string;
}

export const textStateParser = z.intersection(
  baseNonFolderStateParser,
  z.object({
    type: z.literal("text"),
    text: z.string().optional(),
  })
);

export type ArrowMode = "NONE" | "POSITIVE" | "BOTH";

export const arrowModeParser = z.union(
  [z.literal("NONE"), z.literal("POSITIVE"), z.literal("BOTH")],
  {}
);

export interface GrapherState {
  viewport: {
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
  };
  // {x,y}AxisMinorSubdivisions appears to be either 5 or 0 (disabled)
  // but Desmos accepts other subdivisions
  xAxisMinorSubdivisions?: number;
  yAxisMinorSubdivisions?: number;
  degreeMode?: boolean;
  showGrid?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  // the UI appears to only have xAxisNumbers = yAxisNumbers = polarNumbers
  xAxisNumbers?: boolean;
  yAxisNumbers?: boolean;
  polarNumbers?: boolean;
  // {x,y}AxisStep are interesting. The user can put any LaTeX, but the result is stored as a
  // number and displayed as a number or multiple of pi
  xAxisStep?: number;
  yAxisStep?: number;
  xAxisArrowMode?: ArrowMode;
  yAxisArrowMode?: ArrowMode;
  xAxisLabel?: string;
  yAxisLabel?: string;
  squareAxes?: boolean;
  restrictGridToFirstQuadrant?: boolean;
  polarMode?: boolean;
  userLockedViewport?: boolean;
}

export const GrapherStateParser = z
  .object({
    viewport: z
      .object({
        xmin: z.number(),
        ymin: z.number(),
        xmax: z.number(),
        ymax: z.number(),
      })
      .strict(),
    xAxisMinorSubdivisions: z.number().optional(),
    yAxisMinorSubdivisions: z.number().optional(),
    degreeMode: z.boolean().optional(),
    showGrid: z.boolean().optional(),
    showXAxis: z.boolean().optional(),
    showYAxis: z.boolean().optional(),
    xAxisNumbers: z.boolean().optional(),
    yAxisNumbers: z.boolean().optional(),
    polarNumbers: z.boolean().optional(),

    xAxisStep: z.number().optional(),
    yAxisStep: z.number().optional(),
    xAxisArrowMode: arrowModeParser.optional(),
    yAxisArrowMode: arrowModeParser.optional(),

    xAxisLabel: z.string().optional(),
    yAxisLabel: z.string().optional(),

    squareAxes: z.boolean().optional(),
    restrictGridToFirstQuadrant: z.boolean().optional(),
    polarMode: z.boolean().optional(),
    userLockedViewport: z.boolean().optional(),
  })
  .strict();

export type NonFolderState =
  | ExpressionState
  | ImageState
  | TableState
  | TextState;

export const nonFolderStateParser = z.union([
  expressionStateParser,
  imageStateParser,
  tableStateParser,
  textStateParser,
]);

export interface Ticker {
  handlerLatex?: Latex;
  minStepLatex?: Latex;
  open?: boolean;
  playing?: boolean;
}

export const tickerParser = z.object({
  handlerLatex: z.string().optional(),
  minStepLatex: z.string().optional(),
  open: z.boolean().optional(),
  playing: z.boolean().optional(),
});

type Latex = string;
type ID = string;

export type ItemState = NonFolderState | FolderState;

export const itemStateParser = z.union(
  [nonFolderStateParser, folderStateParser],
  {}
);

export interface GraphState {
  version: 9;
  randomSeed?: string;
  graph: GrapherState;
  expressions: {
    list: ItemState[];
    ticker?: Ticker;
  };
}

export const GraphStateParser = z.object({
  version: z.literal(9),
  randomSeed: z.string().optional(),
  graph: GrapherStateParser,
  expressions: z.object({
    list: z.array(itemStateParser),
    ticker: z.optional(tickerParser),
  }),
});
