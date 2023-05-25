import { z } from "zod";
interface BaseItemState {
    id: ID;
    secret?: boolean;
}
export declare const baseItemStateParser: z.ZodObject<{
    id: z.ZodString;
    secret: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    secret?: boolean | undefined;
    id: string;
}, {
    secret?: boolean | undefined;
    id: string;
}>;
interface BaseNonFolderState extends BaseItemState {
    folderId?: ID;
}
export declare const baseNonFolderStateParser: z.ZodIntersection<z.ZodObject<{
    id: z.ZodString;
    secret: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    secret?: boolean | undefined;
    id: string;
}, {
    secret?: boolean | undefined;
    id: string;
}>, z.ZodObject<{
    folderId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    folderId?: string | undefined;
}, {
    folderId?: string | undefined;
}>>;
export type LineStyle = "SOLID" | "DASHED" | "DOTTED";
export declare const lineStyleParser: z.ZodUnion<[z.ZodLiteral<"SOLID">, z.ZodLiteral<"DASHED">, z.ZodLiteral<"DOTTED">]>;
export type PointStyle = "POINT" | "OPEN" | "CROSS";
export declare const pointStyleParser: z.ZodUnion<[z.ZodLiteral<"POINT">, z.ZodLiteral<"OPEN">, z.ZodLiteral<"CROSS">]>;
export type DragMode = "NONE" | "X" | "Y" | "XY" | "AUTO";
export declare const dragModeParser: z.ZodUnion<[z.ZodLiteral<"NONE">, z.ZodLiteral<"X">, z.ZodLiteral<"Y">, z.ZodLiteral<"XY">, z.ZodLiteral<"AUTO">]>;
export type LabelSize = "SMALL" | "MEDIUM" | "LARGE" | Latex;
export declare const labelSizeParser: z.ZodUnion<[z.ZodLiteral<"SMALL">, z.ZodLiteral<"MEDIUM">, z.ZodLiteral<"LARGE">, z.ZodString]>;
export type LabelOrientation = "default" | "center" | "center_auto" | "auto_center" | "above" | "above_left" | "above_right" | "above_auto" | "below" | "below_left" | "below_right" | "below_auto" | "left" | "auto_left" | "right" | "auto_right";
export declare const labelOrientationParser: z.ZodUnion<[z.ZodLiteral<"default">, z.ZodLiteral<"center">, z.ZodLiteral<"center_auto">, z.ZodLiteral<"auto_center">, z.ZodLiteral<"above">, z.ZodLiteral<"above_left">, z.ZodLiteral<"above_right">, z.ZodLiteral<"above_auto">, z.ZodLiteral<"below">, z.ZodLiteral<"below_left">, z.ZodLiteral<"below_right">, z.ZodLiteral<"below_auto">, z.ZodLiteral<"left">, z.ZodLiteral<"auto_left">, z.ZodLiteral<"right">, z.ZodLiteral<"auto_right">]>;
export interface Domain {
    min: Latex;
    max: Latex;
}
export declare const domainParser: z.ZodObject<{
    min: z.ZodString;
    max: z.ZodString;
}, "strip", z.ZodTypeAny, {
    max: string;
    min: string;
}, {
    max: string;
    min: string;
}>;
export interface BaseClickable {
    enabled?: boolean;
    description?: string;
    latex?: Latex;
}
export declare const baseClickableParser: z.ZodObject<{
    enabled: z.ZodOptional<z.ZodBoolean>;
    description: z.ZodOptional<z.ZodString>;
    latex: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    description?: string | undefined;
    enabled?: boolean | undefined;
    latex?: string | undefined;
}, {
    description?: string | undefined;
    enabled?: boolean | undefined;
    latex?: string | undefined;
}>;
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
    interactiveLabel?: boolean;
    editableLabelMode?: "MATH" | "TEXT";
    residualVariable?: Latex;
    regressionParameters?: {
        [key: string]: number;
    };
    isLogModeRegression?: boolean;
    displayEvaluationAsFraction?: boolean;
    slider?: {
        hardMin?: boolean;
        hardMax?: boolean;
        animationPeriod?: number;
        loopMode?: "LOOP_FORWARD_REVERSE" | "LOOP_FORWARD" | "PLAY_ONCE" | "PLAY_INDEFINITELY";
        playDirection?: 1 | -1;
        isPlaying?: boolean;
        min?: Latex;
        max?: Latex;
        step?: Latex;
    };
    polarDomain?: Domain;
    parametricDomain?: Domain;
    domain?: Domain;
    cdf?: {
        show: boolean;
        min?: Latex;
        max?: Latex;
    };
    vizProps?: {
        breadth?: Latex;
        axisOffset?: Latex;
        alignedAxis?: "x" | "y";
        showBoxplotOutliers?: boolean;
        dotplotXMode?: "exact" | "binned";
        binAlignment?: "left" | "center";
        histogramMode?: "count" | "relative" | "density";
    };
    clickableInfo?: BaseClickable;
}
export declare const expressionStateWithoutColumnParser: z.ZodObject<{
    type: z.ZodLiteral<"expression">;
    showLabel: z.ZodOptional<z.ZodBoolean>;
    fill: z.ZodOptional<z.ZodBoolean>;
    fillOpacity: z.ZodOptional<z.ZodString>;
    label: z.ZodOptional<z.ZodString>;
    labelSize: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"SMALL">, z.ZodLiteral<"MEDIUM">, z.ZodLiteral<"LARGE">, z.ZodString]>>;
    labelOrientation: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"default">, z.ZodLiteral<"center">, z.ZodLiteral<"center_auto">, z.ZodLiteral<"auto_center">, z.ZodLiteral<"above">, z.ZodLiteral<"above_left">, z.ZodLiteral<"above_right">, z.ZodLiteral<"above_auto">, z.ZodLiteral<"below">, z.ZodLiteral<"below_left">, z.ZodLiteral<"below_right">, z.ZodLiteral<"below_auto">, z.ZodLiteral<"left">, z.ZodLiteral<"auto_left">, z.ZodLiteral<"right">, z.ZodLiteral<"auto_right">]>>;
    labelAngle: z.ZodOptional<z.ZodString>;
    suppressTextOutline: z.ZodOptional<z.ZodBoolean>;
    interactiveLabel: z.ZodOptional<z.ZodBoolean>;
    editableLabelMode: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"MATH">, z.ZodLiteral<"TEXT">]>>;
    residualVariable: z.ZodOptional<z.ZodString>;
    regressionParameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
    isLogModeRegression: z.ZodOptional<z.ZodBoolean>;
    displayEvaluationAsFraction: z.ZodOptional<z.ZodBoolean>;
    slider: z.ZodOptional<z.ZodObject<{
        hardMin: z.ZodOptional<z.ZodBoolean>;
        hardMax: z.ZodOptional<z.ZodBoolean>;
        animationPeriod: z.ZodOptional<z.ZodNumber>;
        loopMode: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"LOOP_FORWARD_REVERSE">, z.ZodLiteral<"LOOP_FORWARD">, z.ZodLiteral<"PLAY_ONCE">, z.ZodLiteral<"PLAY_INDEFINITELY">]>>;
        playDirection: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<-1>, z.ZodLiteral<1>]>>;
        isPlaying: z.ZodOptional<z.ZodBoolean>;
        min: z.ZodOptional<z.ZodString>;
        max: z.ZodOptional<z.ZodString>;
        step: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        max?: string | undefined;
        step?: string | undefined;
        min?: string | undefined;
        hardMin?: boolean | undefined;
        hardMax?: boolean | undefined;
        animationPeriod?: number | undefined;
        loopMode?: "LOOP_FORWARD_REVERSE" | "LOOP_FORWARD" | "PLAY_ONCE" | "PLAY_INDEFINITELY" | undefined;
        playDirection?: 1 | -1 | undefined;
        isPlaying?: boolean | undefined;
    }, {
        max?: string | undefined;
        step?: string | undefined;
        min?: string | undefined;
        hardMin?: boolean | undefined;
        hardMax?: boolean | undefined;
        animationPeriod?: number | undefined;
        loopMode?: "LOOP_FORWARD_REVERSE" | "LOOP_FORWARD" | "PLAY_ONCE" | "PLAY_INDEFINITELY" | undefined;
        playDirection?: 1 | -1 | undefined;
        isPlaying?: boolean | undefined;
    }>>;
    polarDomain: z.ZodOptional<z.ZodObject<{
        min: z.ZodString;
        max: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        max: string;
        min: string;
    }, {
        max: string;
        min: string;
    }>>;
    parametricDomain: z.ZodOptional<z.ZodObject<{
        min: z.ZodString;
        max: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        max: string;
        min: string;
    }, {
        max: string;
        min: string;
    }>>;
    domain: z.ZodOptional<z.ZodObject<{
        min: z.ZodString;
        max: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        max: string;
        min: string;
    }, {
        max: string;
        min: string;
    }>>;
    cdf: z.ZodOptional<z.ZodObject<{
        show: z.ZodBoolean;
        min: z.ZodOptional<z.ZodString>;
        max: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        max?: string | undefined;
        min?: string | undefined;
        show: boolean;
    }, {
        max?: string | undefined;
        min?: string | undefined;
        show: boolean;
    }>>;
    vizProps: z.ZodOptional<z.ZodObject<{
        breadth: z.ZodOptional<z.ZodString>;
        axisOffset: z.ZodOptional<z.ZodString>;
        alignedAxis: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"x">, z.ZodLiteral<"y">]>>;
        showBoxplotOutliers: z.ZodOptional<z.ZodBoolean>;
        dotplotXMode: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"exact">, z.ZodLiteral<"binned">]>>;
        binAlignment: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"left">, z.ZodLiteral<"center">]>>;
        histogramMode: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"count">, z.ZodLiteral<"relative">, z.ZodLiteral<"density">]>>;
    }, "strip", z.ZodTypeAny, {
        breadth?: string | undefined;
        axisOffset?: string | undefined;
        alignedAxis?: "x" | "y" | undefined;
        showBoxplotOutliers?: boolean | undefined;
        dotplotXMode?: "exact" | "binned" | undefined;
        binAlignment?: "center" | "left" | undefined;
        histogramMode?: "count" | "relative" | "density" | undefined;
    }, {
        breadth?: string | undefined;
        axisOffset?: string | undefined;
        alignedAxis?: "x" | "y" | undefined;
        showBoxplotOutliers?: boolean | undefined;
        dotplotXMode?: "exact" | "binned" | undefined;
        binAlignment?: "center" | "left" | undefined;
        histogramMode?: "count" | "relative" | "density" | undefined;
    }>>;
    clickableInfo: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodOptional<z.ZodBoolean>;
        description: z.ZodOptional<z.ZodString>;
        latex: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        description?: string | undefined;
        enabled?: boolean | undefined;
        latex?: string | undefined;
    }, {
        description?: string | undefined;
        enabled?: boolean | undefined;
        latex?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    fill?: boolean | undefined;
    fillOpacity?: string | undefined;
    label?: string | undefined;
    showLabel?: boolean | undefined;
    labelSize?: string | undefined;
    labelOrientation?: "default" | "center" | "left" | "right" | "center_auto" | "auto_center" | "above" | "above_left" | "above_right" | "above_auto" | "below" | "below_left" | "below_right" | "below_auto" | "auto_left" | "auto_right" | undefined;
    labelAngle?: string | undefined;
    suppressTextOutline?: boolean | undefined;
    interactiveLabel?: boolean | undefined;
    editableLabelMode?: "MATH" | "TEXT" | undefined;
    residualVariable?: string | undefined;
    regressionParameters?: Record<string, number> | undefined;
    isLogModeRegression?: boolean | undefined;
    displayEvaluationAsFraction?: boolean | undefined;
    slider?: {
        max?: string | undefined;
        step?: string | undefined;
        min?: string | undefined;
        hardMin?: boolean | undefined;
        hardMax?: boolean | undefined;
        animationPeriod?: number | undefined;
        loopMode?: "LOOP_FORWARD_REVERSE" | "LOOP_FORWARD" | "PLAY_ONCE" | "PLAY_INDEFINITELY" | undefined;
        playDirection?: 1 | -1 | undefined;
        isPlaying?: boolean | undefined;
    } | undefined;
    polarDomain?: {
        max: string;
        min: string;
    } | undefined;
    parametricDomain?: {
        max: string;
        min: string;
    } | undefined;
    domain?: {
        max: string;
        min: string;
    } | undefined;
    cdf?: {
        max?: string | undefined;
        min?: string | undefined;
        show: boolean;
    } | undefined;
    vizProps?: {
        breadth?: string | undefined;
        axisOffset?: string | undefined;
        alignedAxis?: "x" | "y" | undefined;
        showBoxplotOutliers?: boolean | undefined;
        dotplotXMode?: "exact" | "binned" | undefined;
        binAlignment?: "center" | "left" | undefined;
        histogramMode?: "count" | "relative" | "density" | undefined;
    } | undefined;
    clickableInfo?: {
        description?: string | undefined;
        enabled?: boolean | undefined;
        latex?: string | undefined;
    } | undefined;
    type: "expression";
}, {
    fill?: boolean | undefined;
    fillOpacity?: string | undefined;
    label?: string | undefined;
    showLabel?: boolean | undefined;
    labelSize?: string | undefined;
    labelOrientation?: "default" | "center" | "left" | "right" | "center_auto" | "auto_center" | "above" | "above_left" | "above_right" | "above_auto" | "below" | "below_left" | "below_right" | "below_auto" | "auto_left" | "auto_right" | undefined;
    labelAngle?: string | undefined;
    suppressTextOutline?: boolean | undefined;
    interactiveLabel?: boolean | undefined;
    editableLabelMode?: "MATH" | "TEXT" | undefined;
    residualVariable?: string | undefined;
    regressionParameters?: Record<string, number> | undefined;
    isLogModeRegression?: boolean | undefined;
    displayEvaluationAsFraction?: boolean | undefined;
    slider?: {
        max?: string | undefined;
        step?: string | undefined;
        min?: string | undefined;
        hardMin?: boolean | undefined;
        hardMax?: boolean | undefined;
        animationPeriod?: number | undefined;
        loopMode?: "LOOP_FORWARD_REVERSE" | "LOOP_FORWARD" | "PLAY_ONCE" | "PLAY_INDEFINITELY" | undefined;
        playDirection?: 1 | -1 | undefined;
        isPlaying?: boolean | undefined;
    } | undefined;
    polarDomain?: {
        max: string;
        min: string;
    } | undefined;
    parametricDomain?: {
        max: string;
        min: string;
    } | undefined;
    domain?: {
        max: string;
        min: string;
    } | undefined;
    cdf?: {
        max?: string | undefined;
        min?: string | undefined;
        show: boolean;
    } | undefined;
    vizProps?: {
        breadth?: string | undefined;
        axisOffset?: string | undefined;
        alignedAxis?: "x" | "y" | undefined;
        showBoxplotOutliers?: boolean | undefined;
        dotplotXMode?: "exact" | "binned" | undefined;
        binAlignment?: "center" | "left" | undefined;
        histogramMode?: "count" | "relative" | "density" | undefined;
    } | undefined;
    clickableInfo?: {
        description?: string | undefined;
        enabled?: boolean | undefined;
        latex?: string | undefined;
    } | undefined;
    type: "expression";
}>;
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
export declare const columnExpressionSharedParser: z.ZodObject<{
    color: z.ZodString;
    latex: z.ZodOptional<z.ZodString>;
    hidden: z.ZodOptional<z.ZodBoolean>;
    points: z.ZodOptional<z.ZodBoolean>;
    lines: z.ZodOptional<z.ZodBoolean>;
    dragMode: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"NONE">, z.ZodLiteral<"X">, z.ZodLiteral<"Y">, z.ZodLiteral<"XY">, z.ZodLiteral<"AUTO">]>>;
    lineStyle: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"SOLID">, z.ZodLiteral<"DASHED">, z.ZodLiteral<"DOTTED">]>>;
    pointStyle: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"POINT">, z.ZodLiteral<"OPEN">, z.ZodLiteral<"CROSS">]>>;
    colorLatex: z.ZodOptional<z.ZodString>;
    lineOpacity: z.ZodOptional<z.ZodString>;
    lineWidth: z.ZodOptional<z.ZodString>;
    pointSize: z.ZodOptional<z.ZodString>;
    pointOpacity: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    hidden?: boolean | undefined;
    latex?: string | undefined;
    points?: boolean | undefined;
    lines?: boolean | undefined;
    dragMode?: "NONE" | "X" | "Y" | "XY" | "AUTO" | undefined;
    lineStyle?: "SOLID" | "DASHED" | "DOTTED" | undefined;
    pointStyle?: "POINT" | "OPEN" | "CROSS" | undefined;
    colorLatex?: string | undefined;
    lineOpacity?: string | undefined;
    lineWidth?: string | undefined;
    pointSize?: string | undefined;
    pointOpacity?: string | undefined;
    color: string;
}, {
    hidden?: boolean | undefined;
    latex?: string | undefined;
    points?: boolean | undefined;
    lines?: boolean | undefined;
    dragMode?: "NONE" | "X" | "Y" | "XY" | "AUTO" | undefined;
    lineStyle?: "SOLID" | "DASHED" | "DOTTED" | undefined;
    pointStyle?: "POINT" | "OPEN" | "CROSS" | undefined;
    colorLatex?: string | undefined;
    lineOpacity?: string | undefined;
    lineWidth?: string | undefined;
    pointSize?: string | undefined;
    pointOpacity?: string | undefined;
    color: string;
}>;
export type ExpressionState = ExpressionStateWithoutColumn & ColumnExpressionShared;
export declare const expressionStateParser: z.ZodObject<z.extendShape<{
    type: z.ZodLiteral<"expression">;
    showLabel: z.ZodOptional<z.ZodBoolean>;
    fill: z.ZodOptional<z.ZodBoolean>;
    fillOpacity: z.ZodOptional<z.ZodString>;
    label: z.ZodOptional<z.ZodString>;
    labelSize: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"SMALL">, z.ZodLiteral<"MEDIUM">, z.ZodLiteral<"LARGE">, z.ZodString]>>;
    labelOrientation: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"default">, z.ZodLiteral<"center">, z.ZodLiteral<"center_auto">, z.ZodLiteral<"auto_center">, z.ZodLiteral<"above">, z.ZodLiteral<"above_left">, z.ZodLiteral<"above_right">, z.ZodLiteral<"above_auto">, z.ZodLiteral<"below">, z.ZodLiteral<"below_left">, z.ZodLiteral<"below_right">, z.ZodLiteral<"below_auto">, z.ZodLiteral<"left">, z.ZodLiteral<"auto_left">, z.ZodLiteral<"right">, z.ZodLiteral<"auto_right">]>>;
    labelAngle: z.ZodOptional<z.ZodString>;
    suppressTextOutline: z.ZodOptional<z.ZodBoolean>;
    interactiveLabel: z.ZodOptional<z.ZodBoolean>;
    editableLabelMode: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"MATH">, z.ZodLiteral<"TEXT">]>>;
    residualVariable: z.ZodOptional<z.ZodString>;
    regressionParameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
    isLogModeRegression: z.ZodOptional<z.ZodBoolean>;
    displayEvaluationAsFraction: z.ZodOptional<z.ZodBoolean>;
    slider: z.ZodOptional<z.ZodObject<{
        hardMin: z.ZodOptional<z.ZodBoolean>;
        hardMax: z.ZodOptional<z.ZodBoolean>;
        animationPeriod: z.ZodOptional<z.ZodNumber>;
        loopMode: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"LOOP_FORWARD_REVERSE">, z.ZodLiteral<"LOOP_FORWARD">, z.ZodLiteral<"PLAY_ONCE">, z.ZodLiteral<"PLAY_INDEFINITELY">]>>;
        playDirection: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<-1>, z.ZodLiteral<1>]>>;
        isPlaying: z.ZodOptional<z.ZodBoolean>;
        min: z.ZodOptional<z.ZodString>;
        max: z.ZodOptional<z.ZodString>;
        step: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        max?: string | undefined;
        step?: string | undefined;
        min?: string | undefined;
        hardMin?: boolean | undefined;
        hardMax?: boolean | undefined;
        animationPeriod?: number | undefined;
        loopMode?: "LOOP_FORWARD_REVERSE" | "LOOP_FORWARD" | "PLAY_ONCE" | "PLAY_INDEFINITELY" | undefined;
        playDirection?: 1 | -1 | undefined;
        isPlaying?: boolean | undefined;
    }, {
        max?: string | undefined;
        step?: string | undefined;
        min?: string | undefined;
        hardMin?: boolean | undefined;
        hardMax?: boolean | undefined;
        animationPeriod?: number | undefined;
        loopMode?: "LOOP_FORWARD_REVERSE" | "LOOP_FORWARD" | "PLAY_ONCE" | "PLAY_INDEFINITELY" | undefined;
        playDirection?: 1 | -1 | undefined;
        isPlaying?: boolean | undefined;
    }>>;
    polarDomain: z.ZodOptional<z.ZodObject<{
        min: z.ZodString;
        max: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        max: string;
        min: string;
    }, {
        max: string;
        min: string;
    }>>;
    parametricDomain: z.ZodOptional<z.ZodObject<{
        min: z.ZodString;
        max: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        max: string;
        min: string;
    }, {
        max: string;
        min: string;
    }>>;
    domain: z.ZodOptional<z.ZodObject<{
        min: z.ZodString;
        max: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        max: string;
        min: string;
    }, {
        max: string;
        min: string;
    }>>;
    cdf: z.ZodOptional<z.ZodObject<{
        show: z.ZodBoolean;
        min: z.ZodOptional<z.ZodString>;
        max: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        max?: string | undefined;
        min?: string | undefined;
        show: boolean;
    }, {
        max?: string | undefined;
        min?: string | undefined;
        show: boolean;
    }>>;
    vizProps: z.ZodOptional<z.ZodObject<{
        breadth: z.ZodOptional<z.ZodString>;
        axisOffset: z.ZodOptional<z.ZodString>;
        alignedAxis: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"x">, z.ZodLiteral<"y">]>>;
        showBoxplotOutliers: z.ZodOptional<z.ZodBoolean>;
        dotplotXMode: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"exact">, z.ZodLiteral<"binned">]>>;
        binAlignment: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"left">, z.ZodLiteral<"center">]>>;
        histogramMode: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"count">, z.ZodLiteral<"relative">, z.ZodLiteral<"density">]>>;
    }, "strip", z.ZodTypeAny, {
        breadth?: string | undefined;
        axisOffset?: string | undefined;
        alignedAxis?: "x" | "y" | undefined;
        showBoxplotOutliers?: boolean | undefined;
        dotplotXMode?: "exact" | "binned" | undefined;
        binAlignment?: "center" | "left" | undefined;
        histogramMode?: "count" | "relative" | "density" | undefined;
    }, {
        breadth?: string | undefined;
        axisOffset?: string | undefined;
        alignedAxis?: "x" | "y" | undefined;
        showBoxplotOutliers?: boolean | undefined;
        dotplotXMode?: "exact" | "binned" | undefined;
        binAlignment?: "center" | "left" | undefined;
        histogramMode?: "count" | "relative" | "density" | undefined;
    }>>;
    clickableInfo: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodOptional<z.ZodBoolean>;
        description: z.ZodOptional<z.ZodString>;
        latex: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        description?: string | undefined;
        enabled?: boolean | undefined;
        latex?: string | undefined;
    }, {
        description?: string | undefined;
        enabled?: boolean | undefined;
        latex?: string | undefined;
    }>>;
}, {
    color: z.ZodString;
    latex: z.ZodOptional<z.ZodString>;
    hidden: z.ZodOptional<z.ZodBoolean>;
    points: z.ZodOptional<z.ZodBoolean>;
    lines: z.ZodOptional<z.ZodBoolean>;
    dragMode: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"NONE">, z.ZodLiteral<"X">, z.ZodLiteral<"Y">, z.ZodLiteral<"XY">, z.ZodLiteral<"AUTO">]>>;
    lineStyle: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"SOLID">, z.ZodLiteral<"DASHED">, z.ZodLiteral<"DOTTED">]>>;
    pointStyle: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"POINT">, z.ZodLiteral<"OPEN">, z.ZodLiteral<"CROSS">]>>;
    colorLatex: z.ZodOptional<z.ZodString>;
    lineOpacity: z.ZodOptional<z.ZodString>;
    lineWidth: z.ZodOptional<z.ZodString>;
    pointSize: z.ZodOptional<z.ZodString>;
    pointOpacity: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
    fill?: boolean | undefined;
    fillOpacity?: string | undefined;
    hidden?: boolean | undefined;
    label?: string | undefined;
    latex?: string | undefined;
    showLabel?: boolean | undefined;
    labelSize?: string | undefined;
    labelOrientation?: "default" | "center" | "left" | "right" | "center_auto" | "auto_center" | "above" | "above_left" | "above_right" | "above_auto" | "below" | "below_left" | "below_right" | "below_auto" | "auto_left" | "auto_right" | undefined;
    labelAngle?: string | undefined;
    suppressTextOutline?: boolean | undefined;
    interactiveLabel?: boolean | undefined;
    editableLabelMode?: "MATH" | "TEXT" | undefined;
    residualVariable?: string | undefined;
    regressionParameters?: Record<string, number> | undefined;
    isLogModeRegression?: boolean | undefined;
    displayEvaluationAsFraction?: boolean | undefined;
    slider?: {
        max?: string | undefined;
        step?: string | undefined;
        min?: string | undefined;
        hardMin?: boolean | undefined;
        hardMax?: boolean | undefined;
        animationPeriod?: number | undefined;
        loopMode?: "LOOP_FORWARD_REVERSE" | "LOOP_FORWARD" | "PLAY_ONCE" | "PLAY_INDEFINITELY" | undefined;
        playDirection?: 1 | -1 | undefined;
        isPlaying?: boolean | undefined;
    } | undefined;
    polarDomain?: {
        max: string;
        min: string;
    } | undefined;
    parametricDomain?: {
        max: string;
        min: string;
    } | undefined;
    domain?: {
        max: string;
        min: string;
    } | undefined;
    cdf?: {
        max?: string | undefined;
        min?: string | undefined;
        show: boolean;
    } | undefined;
    vizProps?: {
        breadth?: string | undefined;
        axisOffset?: string | undefined;
        alignedAxis?: "x" | "y" | undefined;
        showBoxplotOutliers?: boolean | undefined;
        dotplotXMode?: "exact" | "binned" | undefined;
        binAlignment?: "center" | "left" | undefined;
        histogramMode?: "count" | "relative" | "density" | undefined;
    } | undefined;
    clickableInfo?: {
        description?: string | undefined;
        enabled?: boolean | undefined;
        latex?: string | undefined;
    } | undefined;
    points?: boolean | undefined;
    lines?: boolean | undefined;
    dragMode?: "NONE" | "X" | "Y" | "XY" | "AUTO" | undefined;
    lineStyle?: "SOLID" | "DASHED" | "DOTTED" | undefined;
    pointStyle?: "POINT" | "OPEN" | "CROSS" | undefined;
    colorLatex?: string | undefined;
    lineOpacity?: string | undefined;
    lineWidth?: string | undefined;
    pointSize?: string | undefined;
    pointOpacity?: string | undefined;
    type: "expression";
    color: string;
}, {
    fill?: boolean | undefined;
    fillOpacity?: string | undefined;
    hidden?: boolean | undefined;
    label?: string | undefined;
    latex?: string | undefined;
    showLabel?: boolean | undefined;
    labelSize?: string | undefined;
    labelOrientation?: "default" | "center" | "left" | "right" | "center_auto" | "auto_center" | "above" | "above_left" | "above_right" | "above_auto" | "below" | "below_left" | "below_right" | "below_auto" | "auto_left" | "auto_right" | undefined;
    labelAngle?: string | undefined;
    suppressTextOutline?: boolean | undefined;
    interactiveLabel?: boolean | undefined;
    editableLabelMode?: "MATH" | "TEXT" | undefined;
    residualVariable?: string | undefined;
    regressionParameters?: Record<string, number> | undefined;
    isLogModeRegression?: boolean | undefined;
    displayEvaluationAsFraction?: boolean | undefined;
    slider?: {
        max?: string | undefined;
        step?: string | undefined;
        min?: string | undefined;
        hardMin?: boolean | undefined;
        hardMax?: boolean | undefined;
        animationPeriod?: number | undefined;
        loopMode?: "LOOP_FORWARD_REVERSE" | "LOOP_FORWARD" | "PLAY_ONCE" | "PLAY_INDEFINITELY" | undefined;
        playDirection?: 1 | -1 | undefined;
        isPlaying?: boolean | undefined;
    } | undefined;
    polarDomain?: {
        max: string;
        min: string;
    } | undefined;
    parametricDomain?: {
        max: string;
        min: string;
    } | undefined;
    domain?: {
        max: string;
        min: string;
    } | undefined;
    cdf?: {
        max?: string | undefined;
        min?: string | undefined;
        show: boolean;
    } | undefined;
    vizProps?: {
        breadth?: string | undefined;
        axisOffset?: string | undefined;
        alignedAxis?: "x" | "y" | undefined;
        showBoxplotOutliers?: boolean | undefined;
        dotplotXMode?: "exact" | "binned" | undefined;
        binAlignment?: "center" | "left" | undefined;
        histogramMode?: "count" | "relative" | "density" | undefined;
    } | undefined;
    clickableInfo?: {
        description?: string | undefined;
        enabled?: boolean | undefined;
        latex?: string | undefined;
    } | undefined;
    points?: boolean | undefined;
    lines?: boolean | undefined;
    dragMode?: "NONE" | "X" | "Y" | "XY" | "AUTO" | undefined;
    lineStyle?: "SOLID" | "DASHED" | "DOTTED" | undefined;
    pointStyle?: "POINT" | "OPEN" | "CROSS" | undefined;
    colorLatex?: string | undefined;
    lineOpacity?: string | undefined;
    lineWidth?: string | undefined;
    pointSize?: string | undefined;
    pointOpacity?: string | undefined;
    type: "expression";
    color: string;
}>;
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
export declare const imageStateParser: z.ZodObject<{
    type: z.ZodLiteral<"image">;
    image_url: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    width: z.ZodOptional<z.ZodString>;
    height: z.ZodOptional<z.ZodString>;
    hidden: z.ZodOptional<z.ZodBoolean>;
    center: z.ZodOptional<z.ZodString>;
    angle: z.ZodOptional<z.ZodString>;
    opacity: z.ZodOptional<z.ZodString>;
    foreground: z.ZodOptional<z.ZodBoolean>;
    draggable: z.ZodOptional<z.ZodBoolean>;
    clickableInfo: z.ZodIntersection<z.ZodObject<{
        enabled: z.ZodOptional<z.ZodBoolean>;
        description: z.ZodOptional<z.ZodString>;
        latex: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        description?: string | undefined;
        enabled?: boolean | undefined;
        latex?: string | undefined;
    }, {
        description?: string | undefined;
        enabled?: boolean | undefined;
        latex?: string | undefined;
    }>, z.ZodObject<{
        hoveredImage: z.ZodOptional<z.ZodString>;
        depressedImage: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        hoveredImage?: string | undefined;
        depressedImage?: string | undefined;
    }, {
        hoveredImage?: string | undefined;
        depressedImage?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    height?: string | undefined;
    width?: string | undefined;
    center?: string | undefined;
    name?: string | undefined;
    opacity?: string | undefined;
    hidden?: boolean | undefined;
    draggable?: boolean | undefined;
    angle?: string | undefined;
    foreground?: boolean | undefined;
    type: "image";
    clickableInfo: {
        description?: string | undefined;
        enabled?: boolean | undefined;
        latex?: string | undefined;
    } & {
        hoveredImage?: string | undefined;
        depressedImage?: string | undefined;
    };
    image_url: string;
}, {
    height?: string | undefined;
    width?: string | undefined;
    center?: string | undefined;
    name?: string | undefined;
    opacity?: string | undefined;
    hidden?: boolean | undefined;
    draggable?: boolean | undefined;
    angle?: string | undefined;
    foreground?: boolean | undefined;
    type: "image";
    clickableInfo: {
        description?: string | undefined;
        enabled?: boolean | undefined;
        latex?: string | undefined;
    } & {
        hoveredImage?: string | undefined;
        depressedImage?: string | undefined;
    };
    image_url: string;
}>;
export type TableColumn = {
    id: ID;
    values: Latex[];
} & ColumnExpressionShared;
export declare const tableColumnParser: z.ZodIntersection<z.ZodObject<{
    id: z.ZodString;
    values: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    values: string[];
    id: string;
}, {
    values: string[];
    id: string;
}>, z.ZodObject<{
    color: z.ZodString;
    latex: z.ZodOptional<z.ZodString>;
    hidden: z.ZodOptional<z.ZodBoolean>;
    points: z.ZodOptional<z.ZodBoolean>;
    lines: z.ZodOptional<z.ZodBoolean>;
    dragMode: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"NONE">, z.ZodLiteral<"X">, z.ZodLiteral<"Y">, z.ZodLiteral<"XY">, z.ZodLiteral<"AUTO">]>>;
    lineStyle: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"SOLID">, z.ZodLiteral<"DASHED">, z.ZodLiteral<"DOTTED">]>>;
    pointStyle: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"POINT">, z.ZodLiteral<"OPEN">, z.ZodLiteral<"CROSS">]>>;
    colorLatex: z.ZodOptional<z.ZodString>;
    lineOpacity: z.ZodOptional<z.ZodString>;
    lineWidth: z.ZodOptional<z.ZodString>;
    pointSize: z.ZodOptional<z.ZodString>;
    pointOpacity: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    hidden?: boolean | undefined;
    latex?: string | undefined;
    points?: boolean | undefined;
    lines?: boolean | undefined;
    dragMode?: "NONE" | "X" | "Y" | "XY" | "AUTO" | undefined;
    lineStyle?: "SOLID" | "DASHED" | "DOTTED" | undefined;
    pointStyle?: "POINT" | "OPEN" | "CROSS" | undefined;
    colorLatex?: string | undefined;
    lineOpacity?: string | undefined;
    lineWidth?: string | undefined;
    pointSize?: string | undefined;
    pointOpacity?: string | undefined;
    color: string;
}, {
    hidden?: boolean | undefined;
    latex?: string | undefined;
    points?: boolean | undefined;
    lines?: boolean | undefined;
    dragMode?: "NONE" | "X" | "Y" | "XY" | "AUTO" | undefined;
    lineStyle?: "SOLID" | "DASHED" | "DOTTED" | undefined;
    pointStyle?: "POINT" | "OPEN" | "CROSS" | undefined;
    colorLatex?: string | undefined;
    lineOpacity?: string | undefined;
    lineWidth?: string | undefined;
    pointSize?: string | undefined;
    pointOpacity?: string | undefined;
    color: string;
}>>;
export interface TableState extends BaseNonFolderState {
    type: "table";
    columns: TableColumn[];
}
export declare const tableStateParser: z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
    id: z.ZodString;
    secret: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    secret?: boolean | undefined;
    id: string;
}, {
    secret?: boolean | undefined;
    id: string;
}>, z.ZodObject<{
    folderId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    folderId?: string | undefined;
}, {
    folderId?: string | undefined;
}>>, z.ZodObject<{
    type: z.ZodLiteral<"table">;
    columns: z.ZodArray<z.ZodIntersection<z.ZodObject<{
        id: z.ZodString;
        values: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        values: string[];
        id: string;
    }, {
        values: string[];
        id: string;
    }>, z.ZodObject<{
        color: z.ZodString;
        latex: z.ZodOptional<z.ZodString>;
        hidden: z.ZodOptional<z.ZodBoolean>;
        points: z.ZodOptional<z.ZodBoolean>;
        lines: z.ZodOptional<z.ZodBoolean>;
        dragMode: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"NONE">, z.ZodLiteral<"X">, z.ZodLiteral<"Y">, z.ZodLiteral<"XY">, z.ZodLiteral<"AUTO">]>>;
        lineStyle: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"SOLID">, z.ZodLiteral<"DASHED">, z.ZodLiteral<"DOTTED">]>>;
        pointStyle: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"POINT">, z.ZodLiteral<"OPEN">, z.ZodLiteral<"CROSS">]>>;
        colorLatex: z.ZodOptional<z.ZodString>;
        lineOpacity: z.ZodOptional<z.ZodString>;
        lineWidth: z.ZodOptional<z.ZodString>;
        pointSize: z.ZodOptional<z.ZodString>;
        pointOpacity: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        hidden?: boolean | undefined;
        latex?: string | undefined;
        points?: boolean | undefined;
        lines?: boolean | undefined;
        dragMode?: "NONE" | "X" | "Y" | "XY" | "AUTO" | undefined;
        lineStyle?: "SOLID" | "DASHED" | "DOTTED" | undefined;
        pointStyle?: "POINT" | "OPEN" | "CROSS" | undefined;
        colorLatex?: string | undefined;
        lineOpacity?: string | undefined;
        lineWidth?: string | undefined;
        pointSize?: string | undefined;
        pointOpacity?: string | undefined;
        color: string;
    }, {
        hidden?: boolean | undefined;
        latex?: string | undefined;
        points?: boolean | undefined;
        lines?: boolean | undefined;
        dragMode?: "NONE" | "X" | "Y" | "XY" | "AUTO" | undefined;
        lineStyle?: "SOLID" | "DASHED" | "DOTTED" | undefined;
        pointStyle?: "POINT" | "OPEN" | "CROSS" | undefined;
        colorLatex?: string | undefined;
        lineOpacity?: string | undefined;
        lineWidth?: string | undefined;
        pointSize?: string | undefined;
        pointOpacity?: string | undefined;
        color: string;
    }>>, "many">;
}, "strip", z.ZodTypeAny, {
    type: "table";
    columns: ({
        values: string[];
        id: string;
    } & {
        hidden?: boolean | undefined;
        latex?: string | undefined;
        points?: boolean | undefined;
        lines?: boolean | undefined;
        dragMode?: "NONE" | "X" | "Y" | "XY" | "AUTO" | undefined;
        lineStyle?: "SOLID" | "DASHED" | "DOTTED" | undefined;
        pointStyle?: "POINT" | "OPEN" | "CROSS" | undefined;
        colorLatex?: string | undefined;
        lineOpacity?: string | undefined;
        lineWidth?: string | undefined;
        pointSize?: string | undefined;
        pointOpacity?: string | undefined;
        color: string;
    })[];
}, {
    type: "table";
    columns: ({
        values: string[];
        id: string;
    } & {
        hidden?: boolean | undefined;
        latex?: string | undefined;
        points?: boolean | undefined;
        lines?: boolean | undefined;
        dragMode?: "NONE" | "X" | "Y" | "XY" | "AUTO" | undefined;
        lineStyle?: "SOLID" | "DASHED" | "DOTTED" | undefined;
        pointStyle?: "POINT" | "OPEN" | "CROSS" | undefined;
        colorLatex?: string | undefined;
        lineOpacity?: string | undefined;
        lineWidth?: string | undefined;
        pointSize?: string | undefined;
        pointOpacity?: string | undefined;
        color: string;
    })[];
}>>;
export interface FolderState extends BaseItemState {
    type: "folder";
    hidden?: boolean;
    collapsed?: boolean;
    title?: string;
}
export declare const folderStateParser: z.ZodIntersection<z.ZodObject<{
    id: z.ZodString;
    secret: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    secret?: boolean | undefined;
    id: string;
}, {
    secret?: boolean | undefined;
    id: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"folder">;
    hidden: z.ZodOptional<z.ZodBoolean>;
    collapsed: z.ZodOptional<z.ZodBoolean>;
    title: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    hidden?: boolean | undefined;
    title?: string | undefined;
    collapsed?: boolean | undefined;
    type: "folder";
}, {
    hidden?: boolean | undefined;
    title?: string | undefined;
    collapsed?: boolean | undefined;
    type: "folder";
}>>;
export interface TextState extends BaseNonFolderState {
    type: "text";
    text?: string;
}
export declare const textStateParser: z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
    id: z.ZodString;
    secret: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    secret?: boolean | undefined;
    id: string;
}, {
    secret?: boolean | undefined;
    id: string;
}>, z.ZodObject<{
    folderId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    folderId?: string | undefined;
}, {
    folderId?: string | undefined;
}>>, z.ZodObject<{
    type: z.ZodLiteral<"text">;
    text: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    text?: string | undefined;
    type: "text";
}, {
    text?: string | undefined;
    type: "text";
}>>;
export type ArrowMode = "NONE" | "POSITIVE" | "BOTH";
export declare const arrowModeParser: z.ZodUnion<[z.ZodLiteral<"NONE">, z.ZodLiteral<"POSITIVE">, z.ZodLiteral<"BOTH">]>;
export interface GrapherState {
    viewport: {
        xmin: number;
        ymin: number;
        xmax: number;
        ymax: number;
    };
    xAxisMinorSubdivisions?: number;
    yAxisMinorSubdivisions?: number;
    degreeMode?: boolean;
    showGrid?: boolean;
    showXAxis?: boolean;
    showYAxis?: boolean;
    xAxisNumbers?: boolean;
    yAxisNumbers?: boolean;
    polarNumbers?: boolean;
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
export declare const GrapherStateParser: z.ZodObject<{
    viewport: z.ZodObject<{
        xmin: z.ZodNumber;
        ymin: z.ZodNumber;
        xmax: z.ZodNumber;
        ymax: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        xmin: number;
        ymin: number;
        xmax: number;
        ymax: number;
    }, {
        xmin: number;
        ymin: number;
        xmax: number;
        ymax: number;
    }>;
    xAxisMinorSubdivisions: z.ZodOptional<z.ZodNumber>;
    yAxisMinorSubdivisions: z.ZodOptional<z.ZodNumber>;
    degreeMode: z.ZodOptional<z.ZodBoolean>;
    showGrid: z.ZodOptional<z.ZodBoolean>;
    showXAxis: z.ZodOptional<z.ZodBoolean>;
    showYAxis: z.ZodOptional<z.ZodBoolean>;
    xAxisNumbers: z.ZodOptional<z.ZodBoolean>;
    yAxisNumbers: z.ZodOptional<z.ZodBoolean>;
    polarNumbers: z.ZodOptional<z.ZodBoolean>;
    xAxisStep: z.ZodOptional<z.ZodNumber>;
    yAxisStep: z.ZodOptional<z.ZodNumber>;
    xAxisArrowMode: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"NONE">, z.ZodLiteral<"POSITIVE">, z.ZodLiteral<"BOTH">]>>;
    yAxisArrowMode: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"NONE">, z.ZodLiteral<"POSITIVE">, z.ZodLiteral<"BOTH">]>>;
    xAxisLabel: z.ZodOptional<z.ZodString>;
    yAxisLabel: z.ZodOptional<z.ZodString>;
    squareAxes: z.ZodOptional<z.ZodBoolean>;
    restrictGridToFirstQuadrant: z.ZodOptional<z.ZodBoolean>;
    polarMode: z.ZodOptional<z.ZodBoolean>;
    userLockedViewport: z.ZodOptional<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    xAxisMinorSubdivisions?: number | undefined;
    yAxisMinorSubdivisions?: number | undefined;
    degreeMode?: boolean | undefined;
    showGrid?: boolean | undefined;
    showXAxis?: boolean | undefined;
    showYAxis?: boolean | undefined;
    xAxisNumbers?: boolean | undefined;
    yAxisNumbers?: boolean | undefined;
    polarNumbers?: boolean | undefined;
    xAxisStep?: number | undefined;
    yAxisStep?: number | undefined;
    xAxisArrowMode?: "NONE" | "POSITIVE" | "BOTH" | undefined;
    yAxisArrowMode?: "NONE" | "POSITIVE" | "BOTH" | undefined;
    xAxisLabel?: string | undefined;
    yAxisLabel?: string | undefined;
    squareAxes?: boolean | undefined;
    restrictGridToFirstQuadrant?: boolean | undefined;
    polarMode?: boolean | undefined;
    userLockedViewport?: boolean | undefined;
    viewport: {
        xmin: number;
        ymin: number;
        xmax: number;
        ymax: number;
    };
}, {
    xAxisMinorSubdivisions?: number | undefined;
    yAxisMinorSubdivisions?: number | undefined;
    degreeMode?: boolean | undefined;
    showGrid?: boolean | undefined;
    showXAxis?: boolean | undefined;
    showYAxis?: boolean | undefined;
    xAxisNumbers?: boolean | undefined;
    yAxisNumbers?: boolean | undefined;
    polarNumbers?: boolean | undefined;
    xAxisStep?: number | undefined;
    yAxisStep?: number | undefined;
    xAxisArrowMode?: "NONE" | "POSITIVE" | "BOTH" | undefined;
    yAxisArrowMode?: "NONE" | "POSITIVE" | "BOTH" | undefined;
    xAxisLabel?: string | undefined;
    yAxisLabel?: string | undefined;
    squareAxes?: boolean | undefined;
    restrictGridToFirstQuadrant?: boolean | undefined;
    polarMode?: boolean | undefined;
    userLockedViewport?: boolean | undefined;
    viewport: {
        xmin: number;
        ymin: number;
        xmax: number;
        ymax: number;
    };
}>;
export type NonFolderState = ExpressionState | ImageState | TableState | TextState;
export declare const nonFolderStateParser: z.ZodUnion<[z.ZodObject<z.extendShape<{
    type: z.ZodLiteral<"expression">;
    showLabel: z.ZodOptional<z.ZodBoolean>;
    fill: z.ZodOptional<z.ZodBoolean>;
    fillOpacity: z.ZodOptional<z.ZodString>;
    label: z.ZodOptional<z.ZodString>;
    labelSize: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"SMALL">, z.ZodLiteral<"MEDIUM">, z.ZodLiteral<"LARGE">, z.ZodString]>>;
    labelOrientation: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"default">, z.ZodLiteral<"center">, z.ZodLiteral<"center_auto">, z.ZodLiteral<"auto_center">, z.ZodLiteral<"above">, z.ZodLiteral<"above_left">, z.ZodLiteral<"above_right">, z.ZodLiteral<"above_auto">, z.ZodLiteral<"below">, z.ZodLiteral<"below_left">, z.ZodLiteral<"below_right">, z.ZodLiteral<"below_auto">, z.ZodLiteral<"left">, z.ZodLiteral<"auto_left">, z.ZodLiteral<"right">, z.ZodLiteral<"auto_right">]>>;
    labelAngle: z.ZodOptional<z.ZodString>;
    suppressTextOutline: z.ZodOptional<z.ZodBoolean>;
    interactiveLabel: z.ZodOptional<z.ZodBoolean>;
    editableLabelMode: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"MATH">, z.ZodLiteral<"TEXT">]>>;
    residualVariable: z.ZodOptional<z.ZodString>;
    regressionParameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
    isLogModeRegression: z.ZodOptional<z.ZodBoolean>;
    displayEvaluationAsFraction: z.ZodOptional<z.ZodBoolean>;
    slider: z.ZodOptional<z.ZodObject<{
        hardMin: z.ZodOptional<z.ZodBoolean>;
        hardMax: z.ZodOptional<z.ZodBoolean>;
        animationPeriod: z.ZodOptional<z.ZodNumber>;
        loopMode: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"LOOP_FORWARD_REVERSE">, z.ZodLiteral<"LOOP_FORWARD">, z.ZodLiteral<"PLAY_ONCE">, z.ZodLiteral<"PLAY_INDEFINITELY">]>>;
        playDirection: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<-1>, z.ZodLiteral<1>]>>;
        isPlaying: z.ZodOptional<z.ZodBoolean>;
        min: z.ZodOptional<z.ZodString>;
        max: z.ZodOptional<z.ZodString>;
        step: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        max?: string | undefined;
        step?: string | undefined;
        min?: string | undefined;
        hardMin?: boolean | undefined;
        hardMax?: boolean | undefined;
        animationPeriod?: number | undefined;
        loopMode?: "LOOP_FORWARD_REVERSE" | "LOOP_FORWARD" | "PLAY_ONCE" | "PLAY_INDEFINITELY" | undefined;
        playDirection?: 1 | -1 | undefined;
        isPlaying?: boolean | undefined;
    }, {
        max?: string | undefined;
        step?: string | undefined;
        min?: string | undefined;
        hardMin?: boolean | undefined;
        hardMax?: boolean | undefined;
        animationPeriod?: number | undefined;
        loopMode?: "LOOP_FORWARD_REVERSE" | "LOOP_FORWARD" | "PLAY_ONCE" | "PLAY_INDEFINITELY" | undefined;
        playDirection?: 1 | -1 | undefined;
        isPlaying?: boolean | undefined;
    }>>;
    polarDomain: z.ZodOptional<z.ZodObject<{
        min: z.ZodString;
        max: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        max: string;
        min: string;
    }, {
        max: string;
        min: string;
    }>>;
    parametricDomain: z.ZodOptional<z.ZodObject<{
        min: z.ZodString;
        max: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        max: string;
        min: string;
    }, {
        max: string;
        min: string;
    }>>;
    domain: z.ZodOptional<z.ZodObject<{
        min: z.ZodString;
        max: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        max: string;
        min: string;
    }, {
        max: string;
        min: string;
    }>>;
    cdf: z.ZodOptional<z.ZodObject<{
        show: z.ZodBoolean;
        min: z.ZodOptional<z.ZodString>;
        max: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        max?: string | undefined;
        min?: string | undefined;
        show: boolean;
    }, {
        max?: string | undefined;
        min?: string | undefined;
        show: boolean;
    }>>;
    vizProps: z.ZodOptional<z.ZodObject<{
        breadth: z.ZodOptional<z.ZodString>;
        axisOffset: z.ZodOptional<z.ZodString>;
        alignedAxis: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"x">, z.ZodLiteral<"y">]>>;
        showBoxplotOutliers: z.ZodOptional<z.ZodBoolean>;
        dotplotXMode: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"exact">, z.ZodLiteral<"binned">]>>;
        binAlignment: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"left">, z.ZodLiteral<"center">]>>;
        histogramMode: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"count">, z.ZodLiteral<"relative">, z.ZodLiteral<"density">]>>;
    }, "strip", z.ZodTypeAny, {
        breadth?: string | undefined;
        axisOffset?: string | undefined;
        alignedAxis?: "x" | "y" | undefined;
        showBoxplotOutliers?: boolean | undefined;
        dotplotXMode?: "exact" | "binned" | undefined;
        binAlignment?: "center" | "left" | undefined;
        histogramMode?: "count" | "relative" | "density" | undefined;
    }, {
        breadth?: string | undefined;
        axisOffset?: string | undefined;
        alignedAxis?: "x" | "y" | undefined;
        showBoxplotOutliers?: boolean | undefined;
        dotplotXMode?: "exact" | "binned" | undefined;
        binAlignment?: "center" | "left" | undefined;
        histogramMode?: "count" | "relative" | "density" | undefined;
    }>>;
    clickableInfo: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodOptional<z.ZodBoolean>;
        description: z.ZodOptional<z.ZodString>;
        latex: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        description?: string | undefined;
        enabled?: boolean | undefined;
        latex?: string | undefined;
    }, {
        description?: string | undefined;
        enabled?: boolean | undefined;
        latex?: string | undefined;
    }>>;
}, {
    color: z.ZodString;
    latex: z.ZodOptional<z.ZodString>;
    hidden: z.ZodOptional<z.ZodBoolean>;
    points: z.ZodOptional<z.ZodBoolean>;
    lines: z.ZodOptional<z.ZodBoolean>;
    dragMode: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"NONE">, z.ZodLiteral<"X">, z.ZodLiteral<"Y">, z.ZodLiteral<"XY">, z.ZodLiteral<"AUTO">]>>;
    lineStyle: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"SOLID">, z.ZodLiteral<"DASHED">, z.ZodLiteral<"DOTTED">]>>;
    pointStyle: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"POINT">, z.ZodLiteral<"OPEN">, z.ZodLiteral<"CROSS">]>>;
    colorLatex: z.ZodOptional<z.ZodString>;
    lineOpacity: z.ZodOptional<z.ZodString>;
    lineWidth: z.ZodOptional<z.ZodString>;
    pointSize: z.ZodOptional<z.ZodString>;
    pointOpacity: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
    fill?: boolean | undefined;
    fillOpacity?: string | undefined;
    hidden?: boolean | undefined;
    label?: string | undefined;
    latex?: string | undefined;
    showLabel?: boolean | undefined;
    labelSize?: string | undefined;
    labelOrientation?: "default" | "center" | "left" | "right" | "center_auto" | "auto_center" | "above" | "above_left" | "above_right" | "above_auto" | "below" | "below_left" | "below_right" | "below_auto" | "auto_left" | "auto_right" | undefined;
    labelAngle?: string | undefined;
    suppressTextOutline?: boolean | undefined;
    interactiveLabel?: boolean | undefined;
    editableLabelMode?: "MATH" | "TEXT" | undefined;
    residualVariable?: string | undefined;
    regressionParameters?: Record<string, number> | undefined;
    isLogModeRegression?: boolean | undefined;
    displayEvaluationAsFraction?: boolean | undefined;
    slider?: {
        max?: string | undefined;
        step?: string | undefined;
        min?: string | undefined;
        hardMin?: boolean | undefined;
        hardMax?: boolean | undefined;
        animationPeriod?: number | undefined;
        loopMode?: "LOOP_FORWARD_REVERSE" | "LOOP_FORWARD" | "PLAY_ONCE" | "PLAY_INDEFINITELY" | undefined;
        playDirection?: 1 | -1 | undefined;
        isPlaying?: boolean | undefined;
    } | undefined;
    polarDomain?: {
        max: string;
        min: string;
    } | undefined;
    parametricDomain?: {
        max: string;
        min: string;
    } | undefined;
    domain?: {
        max: string;
        min: string;
    } | undefined;
    cdf?: {
        max?: string | undefined;
        min?: string | undefined;
        show: boolean;
    } | undefined;
    vizProps?: {
        breadth?: string | undefined;
        axisOffset?: string | undefined;
        alignedAxis?: "x" | "y" | undefined;
        showBoxplotOutliers?: boolean | undefined;
        dotplotXMode?: "exact" | "binned" | undefined;
        binAlignment?: "center" | "left" | undefined;
        histogramMode?: "count" | "relative" | "density" | undefined;
    } | undefined;
    clickableInfo?: {
        description?: string | undefined;
        enabled?: boolean | undefined;
        latex?: string | undefined;
    } | undefined;
    points?: boolean | undefined;
    lines?: boolean | undefined;
    dragMode?: "NONE" | "X" | "Y" | "XY" | "AUTO" | undefined;
    lineStyle?: "SOLID" | "DASHED" | "DOTTED" | undefined;
    pointStyle?: "POINT" | "OPEN" | "CROSS" | undefined;
    colorLatex?: string | undefined;
    lineOpacity?: string | undefined;
    lineWidth?: string | undefined;
    pointSize?: string | undefined;
    pointOpacity?: string | undefined;
    type: "expression";
    color: string;
}, {
    fill?: boolean | undefined;
    fillOpacity?: string | undefined;
    hidden?: boolean | undefined;
    label?: string | undefined;
    latex?: string | undefined;
    showLabel?: boolean | undefined;
    labelSize?: string | undefined;
    labelOrientation?: "default" | "center" | "left" | "right" | "center_auto" | "auto_center" | "above" | "above_left" | "above_right" | "above_auto" | "below" | "below_left" | "below_right" | "below_auto" | "auto_left" | "auto_right" | undefined;
    labelAngle?: string | undefined;
    suppressTextOutline?: boolean | undefined;
    interactiveLabel?: boolean | undefined;
    editableLabelMode?: "MATH" | "TEXT" | undefined;
    residualVariable?: string | undefined;
    regressionParameters?: Record<string, number> | undefined;
    isLogModeRegression?: boolean | undefined;
    displayEvaluationAsFraction?: boolean | undefined;
    slider?: {
        max?: string | undefined;
        step?: string | undefined;
        min?: string | undefined;
        hardMin?: boolean | undefined;
        hardMax?: boolean | undefined;
        animationPeriod?: number | undefined;
        loopMode?: "LOOP_FORWARD_REVERSE" | "LOOP_FORWARD" | "PLAY_ONCE" | "PLAY_INDEFINITELY" | undefined;
        playDirection?: 1 | -1 | undefined;
        isPlaying?: boolean | undefined;
    } | undefined;
    polarDomain?: {
        max: string;
        min: string;
    } | undefined;
    parametricDomain?: {
        max: string;
        min: string;
    } | undefined;
    domain?: {
        max: string;
        min: string;
    } | undefined;
    cdf?: {
        max?: string | undefined;
        min?: string | undefined;
        show: boolean;
    } | undefined;
    vizProps?: {
        breadth?: string | undefined;
        axisOffset?: string | undefined;
        alignedAxis?: "x" | "y" | undefined;
        showBoxplotOutliers?: boolean | undefined;
        dotplotXMode?: "exact" | "binned" | undefined;
        binAlignment?: "center" | "left" | undefined;
        histogramMode?: "count" | "relative" | "density" | undefined;
    } | undefined;
    clickableInfo?: {
        description?: string | undefined;
        enabled?: boolean | undefined;
        latex?: string | undefined;
    } | undefined;
    points?: boolean | undefined;
    lines?: boolean | undefined;
    dragMode?: "NONE" | "X" | "Y" | "XY" | "AUTO" | undefined;
    lineStyle?: "SOLID" | "DASHED" | "DOTTED" | undefined;
    pointStyle?: "POINT" | "OPEN" | "CROSS" | undefined;
    colorLatex?: string | undefined;
    lineOpacity?: string | undefined;
    lineWidth?: string | undefined;
    pointSize?: string | undefined;
    pointOpacity?: string | undefined;
    type: "expression";
    color: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"image">;
    image_url: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    width: z.ZodOptional<z.ZodString>;
    height: z.ZodOptional<z.ZodString>;
    hidden: z.ZodOptional<z.ZodBoolean>;
    center: z.ZodOptional<z.ZodString>;
    angle: z.ZodOptional<z.ZodString>;
    opacity: z.ZodOptional<z.ZodString>;
    foreground: z.ZodOptional<z.ZodBoolean>;
    draggable: z.ZodOptional<z.ZodBoolean>;
    clickableInfo: z.ZodIntersection<z.ZodObject<{
        enabled: z.ZodOptional<z.ZodBoolean>;
        description: z.ZodOptional<z.ZodString>;
        latex: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        description?: string | undefined;
        enabled?: boolean | undefined;
        latex?: string | undefined;
    }, {
        description?: string | undefined;
        enabled?: boolean | undefined;
        latex?: string | undefined;
    }>, z.ZodObject<{
        hoveredImage: z.ZodOptional<z.ZodString>;
        depressedImage: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        hoveredImage?: string | undefined;
        depressedImage?: string | undefined;
    }, {
        hoveredImage?: string | undefined;
        depressedImage?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    height?: string | undefined;
    width?: string | undefined;
    center?: string | undefined;
    name?: string | undefined;
    opacity?: string | undefined;
    hidden?: boolean | undefined;
    draggable?: boolean | undefined;
    angle?: string | undefined;
    foreground?: boolean | undefined;
    type: "image";
    clickableInfo: {
        description?: string | undefined;
        enabled?: boolean | undefined;
        latex?: string | undefined;
    } & {
        hoveredImage?: string | undefined;
        depressedImage?: string | undefined;
    };
    image_url: string;
}, {
    height?: string | undefined;
    width?: string | undefined;
    center?: string | undefined;
    name?: string | undefined;
    opacity?: string | undefined;
    hidden?: boolean | undefined;
    draggable?: boolean | undefined;
    angle?: string | undefined;
    foreground?: boolean | undefined;
    type: "image";
    clickableInfo: {
        description?: string | undefined;
        enabled?: boolean | undefined;
        latex?: string | undefined;
    } & {
        hoveredImage?: string | undefined;
        depressedImage?: string | undefined;
    };
    image_url: string;
}>, z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
    id: z.ZodString;
    secret: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    secret?: boolean | undefined;
    id: string;
}, {
    secret?: boolean | undefined;
    id: string;
}>, z.ZodObject<{
    folderId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    folderId?: string | undefined;
}, {
    folderId?: string | undefined;
}>>, z.ZodObject<{
    type: z.ZodLiteral<"table">;
    columns: z.ZodArray<z.ZodIntersection<z.ZodObject<{
        id: z.ZodString;
        values: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        values: string[];
        id: string;
    }, {
        values: string[];
        id: string;
    }>, z.ZodObject<{
        color: z.ZodString;
        latex: z.ZodOptional<z.ZodString>;
        hidden: z.ZodOptional<z.ZodBoolean>;
        points: z.ZodOptional<z.ZodBoolean>;
        lines: z.ZodOptional<z.ZodBoolean>;
        dragMode: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"NONE">, z.ZodLiteral<"X">, z.ZodLiteral<"Y">, z.ZodLiteral<"XY">, z.ZodLiteral<"AUTO">]>>;
        lineStyle: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"SOLID">, z.ZodLiteral<"DASHED">, z.ZodLiteral<"DOTTED">]>>;
        pointStyle: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"POINT">, z.ZodLiteral<"OPEN">, z.ZodLiteral<"CROSS">]>>;
        colorLatex: z.ZodOptional<z.ZodString>;
        lineOpacity: z.ZodOptional<z.ZodString>;
        lineWidth: z.ZodOptional<z.ZodString>;
        pointSize: z.ZodOptional<z.ZodString>;
        pointOpacity: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        hidden?: boolean | undefined;
        latex?: string | undefined;
        points?: boolean | undefined;
        lines?: boolean | undefined;
        dragMode?: "NONE" | "X" | "Y" | "XY" | "AUTO" | undefined;
        lineStyle?: "SOLID" | "DASHED" | "DOTTED" | undefined;
        pointStyle?: "POINT" | "OPEN" | "CROSS" | undefined;
        colorLatex?: string | undefined;
        lineOpacity?: string | undefined;
        lineWidth?: string | undefined;
        pointSize?: string | undefined;
        pointOpacity?: string | undefined;
        color: string;
    }, {
        hidden?: boolean | undefined;
        latex?: string | undefined;
        points?: boolean | undefined;
        lines?: boolean | undefined;
        dragMode?: "NONE" | "X" | "Y" | "XY" | "AUTO" | undefined;
        lineStyle?: "SOLID" | "DASHED" | "DOTTED" | undefined;
        pointStyle?: "POINT" | "OPEN" | "CROSS" | undefined;
        colorLatex?: string | undefined;
        lineOpacity?: string | undefined;
        lineWidth?: string | undefined;
        pointSize?: string | undefined;
        pointOpacity?: string | undefined;
        color: string;
    }>>, "many">;
}, "strip", z.ZodTypeAny, {
    type: "table";
    columns: ({
        values: string[];
        id: string;
    } & {
        hidden?: boolean | undefined;
        latex?: string | undefined;
        points?: boolean | undefined;
        lines?: boolean | undefined;
        dragMode?: "NONE" | "X" | "Y" | "XY" | "AUTO" | undefined;
        lineStyle?: "SOLID" | "DASHED" | "DOTTED" | undefined;
        pointStyle?: "POINT" | "OPEN" | "CROSS" | undefined;
        colorLatex?: string | undefined;
        lineOpacity?: string | undefined;
        lineWidth?: string | undefined;
        pointSize?: string | undefined;
        pointOpacity?: string | undefined;
        color: string;
    })[];
}, {
    type: "table";
    columns: ({
        values: string[];
        id: string;
    } & {
        hidden?: boolean | undefined;
        latex?: string | undefined;
        points?: boolean | undefined;
        lines?: boolean | undefined;
        dragMode?: "NONE" | "X" | "Y" | "XY" | "AUTO" | undefined;
        lineStyle?: "SOLID" | "DASHED" | "DOTTED" | undefined;
        pointStyle?: "POINT" | "OPEN" | "CROSS" | undefined;
        colorLatex?: string | undefined;
        lineOpacity?: string | undefined;
        lineWidth?: string | undefined;
        pointSize?: string | undefined;
        pointOpacity?: string | undefined;
        color: string;
    })[];
}>>, z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
    id: z.ZodString;
    secret: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    secret?: boolean | undefined;
    id: string;
}, {
    secret?: boolean | undefined;
    id: string;
}>, z.ZodObject<{
    folderId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    folderId?: string | undefined;
}, {
    folderId?: string | undefined;
}>>, z.ZodObject<{
    type: z.ZodLiteral<"text">;
    text: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    text?: string | undefined;
    type: "text";
}, {
    text?: string | undefined;
    type: "text";
}>>]>;
export interface Ticker {
    handlerLatex?: Latex;
    minStepLatex?: Latex;
    open?: boolean;
    playing?: boolean;
}
export declare const tickerParser: z.ZodObject<{
    handlerLatex: z.ZodOptional<z.ZodString>;
    minStepLatex: z.ZodOptional<z.ZodString>;
    open: z.ZodOptional<z.ZodBoolean>;
    playing: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    open?: boolean | undefined;
    playing?: boolean | undefined;
    handlerLatex?: string | undefined;
    minStepLatex?: string | undefined;
}, {
    open?: boolean | undefined;
    playing?: boolean | undefined;
    handlerLatex?: string | undefined;
    minStepLatex?: string | undefined;
}>;
type Latex = string;
type ID = string;
export type ItemState = NonFolderState | FolderState;
export declare const itemStateParser: z.ZodUnion<[z.ZodUnion<[z.ZodObject<z.extendShape<{
    type: z.ZodLiteral<"expression">;
    showLabel: z.ZodOptional<z.ZodBoolean>;
    fill: z.ZodOptional<z.ZodBoolean>;
    fillOpacity: z.ZodOptional<z.ZodString>;
    label: z.ZodOptional<z.ZodString>;
    labelSize: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"SMALL">, z.ZodLiteral<"MEDIUM">, z.ZodLiteral<"LARGE">, z.ZodString]>>;
    labelOrientation: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"default">, z.ZodLiteral<"center">, z.ZodLiteral<"center_auto">, z.ZodLiteral<"auto_center">, z.ZodLiteral<"above">, z.ZodLiteral<"above_left">, z.ZodLiteral<"above_right">, z.ZodLiteral<"above_auto">, z.ZodLiteral<"below">, z.ZodLiteral<"below_left">, z.ZodLiteral<"below_right">, z.ZodLiteral<"below_auto">, z.ZodLiteral<"left">, z.ZodLiteral<"auto_left">, z.ZodLiteral<"right">, z.ZodLiteral<"auto_right">]>>;
    labelAngle: z.ZodOptional<z.ZodString>;
    suppressTextOutline: z.ZodOptional<z.ZodBoolean>;
    interactiveLabel: z.ZodOptional<z.ZodBoolean>;
    editableLabelMode: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"MATH">, z.ZodLiteral<"TEXT">]>>;
    residualVariable: z.ZodOptional<z.ZodString>;
    regressionParameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
    isLogModeRegression: z.ZodOptional<z.ZodBoolean>;
    displayEvaluationAsFraction: z.ZodOptional<z.ZodBoolean>;
    slider: z.ZodOptional<z.ZodObject<{
        hardMin: z.ZodOptional<z.ZodBoolean>;
        hardMax: z.ZodOptional<z.ZodBoolean>;
        animationPeriod: z.ZodOptional<z.ZodNumber>;
        loopMode: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"LOOP_FORWARD_REVERSE">, z.ZodLiteral<"LOOP_FORWARD">, z.ZodLiteral<"PLAY_ONCE">, z.ZodLiteral<"PLAY_INDEFINITELY">]>>;
        playDirection: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<-1>, z.ZodLiteral<1>]>>;
        isPlaying: z.ZodOptional<z.ZodBoolean>;
        min: z.ZodOptional<z.ZodString>;
        max: z.ZodOptional<z.ZodString>;
        step: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        max?: string | undefined;
        step?: string | undefined;
        min?: string | undefined;
        hardMin?: boolean | undefined;
        hardMax?: boolean | undefined;
        animationPeriod?: number | undefined;
        loopMode?: "LOOP_FORWARD_REVERSE" | "LOOP_FORWARD" | "PLAY_ONCE" | "PLAY_INDEFINITELY" | undefined;
        playDirection?: 1 | -1 | undefined;
        isPlaying?: boolean | undefined;
    }, {
        max?: string | undefined;
        step?: string | undefined;
        min?: string | undefined;
        hardMin?: boolean | undefined;
        hardMax?: boolean | undefined;
        animationPeriod?: number | undefined;
        loopMode?: "LOOP_FORWARD_REVERSE" | "LOOP_FORWARD" | "PLAY_ONCE" | "PLAY_INDEFINITELY" | undefined;
        playDirection?: 1 | -1 | undefined;
        isPlaying?: boolean | undefined;
    }>>;
    polarDomain: z.ZodOptional<z.ZodObject<{
        min: z.ZodString;
        max: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        max: string;
        min: string;
    }, {
        max: string;
        min: string;
    }>>;
    parametricDomain: z.ZodOptional<z.ZodObject<{
        min: z.ZodString;
        max: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        max: string;
        min: string;
    }, {
        max: string;
        min: string;
    }>>;
    domain: z.ZodOptional<z.ZodObject<{
        min: z.ZodString;
        max: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        max: string;
        min: string;
    }, {
        max: string;
        min: string;
    }>>;
    cdf: z.ZodOptional<z.ZodObject<{
        show: z.ZodBoolean;
        min: z.ZodOptional<z.ZodString>;
        max: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        max?: string | undefined;
        min?: string | undefined;
        show: boolean;
    }, {
        max?: string | undefined;
        min?: string | undefined;
        show: boolean;
    }>>;
    vizProps: z.ZodOptional<z.ZodObject<{
        breadth: z.ZodOptional<z.ZodString>;
        axisOffset: z.ZodOptional<z.ZodString>;
        alignedAxis: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"x">, z.ZodLiteral<"y">]>>;
        showBoxplotOutliers: z.ZodOptional<z.ZodBoolean>;
        dotplotXMode: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"exact">, z.ZodLiteral<"binned">]>>;
        binAlignment: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"left">, z.ZodLiteral<"center">]>>;
        histogramMode: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"count">, z.ZodLiteral<"relative">, z.ZodLiteral<"density">]>>;
    }, "strip", z.ZodTypeAny, {
        breadth?: string | undefined;
        axisOffset?: string | undefined;
        alignedAxis?: "x" | "y" | undefined;
        showBoxplotOutliers?: boolean | undefined;
        dotplotXMode?: "exact" | "binned" | undefined;
        binAlignment?: "center" | "left" | undefined;
        histogramMode?: "count" | "relative" | "density" | undefined;
    }, {
        breadth?: string | undefined;
        axisOffset?: string | undefined;
        alignedAxis?: "x" | "y" | undefined;
        showBoxplotOutliers?: boolean | undefined;
        dotplotXMode?: "exact" | "binned" | undefined;
        binAlignment?: "center" | "left" | undefined;
        histogramMode?: "count" | "relative" | "density" | undefined;
    }>>;
    clickableInfo: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodOptional<z.ZodBoolean>;
        description: z.ZodOptional<z.ZodString>;
        latex: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        description?: string | undefined;
        enabled?: boolean | undefined;
        latex?: string | undefined;
    }, {
        description?: string | undefined;
        enabled?: boolean | undefined;
        latex?: string | undefined;
    }>>;
}, {
    color: z.ZodString;
    latex: z.ZodOptional<z.ZodString>;
    hidden: z.ZodOptional<z.ZodBoolean>;
    points: z.ZodOptional<z.ZodBoolean>;
    lines: z.ZodOptional<z.ZodBoolean>;
    dragMode: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"NONE">, z.ZodLiteral<"X">, z.ZodLiteral<"Y">, z.ZodLiteral<"XY">, z.ZodLiteral<"AUTO">]>>;
    lineStyle: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"SOLID">, z.ZodLiteral<"DASHED">, z.ZodLiteral<"DOTTED">]>>;
    pointStyle: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"POINT">, z.ZodLiteral<"OPEN">, z.ZodLiteral<"CROSS">]>>;
    colorLatex: z.ZodOptional<z.ZodString>;
    lineOpacity: z.ZodOptional<z.ZodString>;
    lineWidth: z.ZodOptional<z.ZodString>;
    pointSize: z.ZodOptional<z.ZodString>;
    pointOpacity: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
    fill?: boolean | undefined;
    fillOpacity?: string | undefined;
    hidden?: boolean | undefined;
    label?: string | undefined;
    latex?: string | undefined;
    showLabel?: boolean | undefined;
    labelSize?: string | undefined;
    labelOrientation?: "default" | "center" | "left" | "right" | "center_auto" | "auto_center" | "above" | "above_left" | "above_right" | "above_auto" | "below" | "below_left" | "below_right" | "below_auto" | "auto_left" | "auto_right" | undefined;
    labelAngle?: string | undefined;
    suppressTextOutline?: boolean | undefined;
    interactiveLabel?: boolean | undefined;
    editableLabelMode?: "MATH" | "TEXT" | undefined;
    residualVariable?: string | undefined;
    regressionParameters?: Record<string, number> | undefined;
    isLogModeRegression?: boolean | undefined;
    displayEvaluationAsFraction?: boolean | undefined;
    slider?: {
        max?: string | undefined;
        step?: string | undefined;
        min?: string | undefined;
        hardMin?: boolean | undefined;
        hardMax?: boolean | undefined;
        animationPeriod?: number | undefined;
        loopMode?: "LOOP_FORWARD_REVERSE" | "LOOP_FORWARD" | "PLAY_ONCE" | "PLAY_INDEFINITELY" | undefined;
        playDirection?: 1 | -1 | undefined;
        isPlaying?: boolean | undefined;
    } | undefined;
    polarDomain?: {
        max: string;
        min: string;
    } | undefined;
    parametricDomain?: {
        max: string;
        min: string;
    } | undefined;
    domain?: {
        max: string;
        min: string;
    } | undefined;
    cdf?: {
        max?: string | undefined;
        min?: string | undefined;
        show: boolean;
    } | undefined;
    vizProps?: {
        breadth?: string | undefined;
        axisOffset?: string | undefined;
        alignedAxis?: "x" | "y" | undefined;
        showBoxplotOutliers?: boolean | undefined;
        dotplotXMode?: "exact" | "binned" | undefined;
        binAlignment?: "center" | "left" | undefined;
        histogramMode?: "count" | "relative" | "density" | undefined;
    } | undefined;
    clickableInfo?: {
        description?: string | undefined;
        enabled?: boolean | undefined;
        latex?: string | undefined;
    } | undefined;
    points?: boolean | undefined;
    lines?: boolean | undefined;
    dragMode?: "NONE" | "X" | "Y" | "XY" | "AUTO" | undefined;
    lineStyle?: "SOLID" | "DASHED" | "DOTTED" | undefined;
    pointStyle?: "POINT" | "OPEN" | "CROSS" | undefined;
    colorLatex?: string | undefined;
    lineOpacity?: string | undefined;
    lineWidth?: string | undefined;
    pointSize?: string | undefined;
    pointOpacity?: string | undefined;
    type: "expression";
    color: string;
}, {
    fill?: boolean | undefined;
    fillOpacity?: string | undefined;
    hidden?: boolean | undefined;
    label?: string | undefined;
    latex?: string | undefined;
    showLabel?: boolean | undefined;
    labelSize?: string | undefined;
    labelOrientation?: "default" | "center" | "left" | "right" | "center_auto" | "auto_center" | "above" | "above_left" | "above_right" | "above_auto" | "below" | "below_left" | "below_right" | "below_auto" | "auto_left" | "auto_right" | undefined;
    labelAngle?: string | undefined;
    suppressTextOutline?: boolean | undefined;
    interactiveLabel?: boolean | undefined;
    editableLabelMode?: "MATH" | "TEXT" | undefined;
    residualVariable?: string | undefined;
    regressionParameters?: Record<string, number> | undefined;
    isLogModeRegression?: boolean | undefined;
    displayEvaluationAsFraction?: boolean | undefined;
    slider?: {
        max?: string | undefined;
        step?: string | undefined;
        min?: string | undefined;
        hardMin?: boolean | undefined;
        hardMax?: boolean | undefined;
        animationPeriod?: number | undefined;
        loopMode?: "LOOP_FORWARD_REVERSE" | "LOOP_FORWARD" | "PLAY_ONCE" | "PLAY_INDEFINITELY" | undefined;
        playDirection?: 1 | -1 | undefined;
        isPlaying?: boolean | undefined;
    } | undefined;
    polarDomain?: {
        max: string;
        min: string;
    } | undefined;
    parametricDomain?: {
        max: string;
        min: string;
    } | undefined;
    domain?: {
        max: string;
        min: string;
    } | undefined;
    cdf?: {
        max?: string | undefined;
        min?: string | undefined;
        show: boolean;
    } | undefined;
    vizProps?: {
        breadth?: string | undefined;
        axisOffset?: string | undefined;
        alignedAxis?: "x" | "y" | undefined;
        showBoxplotOutliers?: boolean | undefined;
        dotplotXMode?: "exact" | "binned" | undefined;
        binAlignment?: "center" | "left" | undefined;
        histogramMode?: "count" | "relative" | "density" | undefined;
    } | undefined;
    clickableInfo?: {
        description?: string | undefined;
        enabled?: boolean | undefined;
        latex?: string | undefined;
    } | undefined;
    points?: boolean | undefined;
    lines?: boolean | undefined;
    dragMode?: "NONE" | "X" | "Y" | "XY" | "AUTO" | undefined;
    lineStyle?: "SOLID" | "DASHED" | "DOTTED" | undefined;
    pointStyle?: "POINT" | "OPEN" | "CROSS" | undefined;
    colorLatex?: string | undefined;
    lineOpacity?: string | undefined;
    lineWidth?: string | undefined;
    pointSize?: string | undefined;
    pointOpacity?: string | undefined;
    type: "expression";
    color: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"image">;
    image_url: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    width: z.ZodOptional<z.ZodString>;
    height: z.ZodOptional<z.ZodString>;
    hidden: z.ZodOptional<z.ZodBoolean>;
    center: z.ZodOptional<z.ZodString>;
    angle: z.ZodOptional<z.ZodString>;
    opacity: z.ZodOptional<z.ZodString>;
    foreground: z.ZodOptional<z.ZodBoolean>;
    draggable: z.ZodOptional<z.ZodBoolean>;
    clickableInfo: z.ZodIntersection<z.ZodObject<{
        enabled: z.ZodOptional<z.ZodBoolean>;
        description: z.ZodOptional<z.ZodString>;
        latex: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        description?: string | undefined;
        enabled?: boolean | undefined;
        latex?: string | undefined;
    }, {
        description?: string | undefined;
        enabled?: boolean | undefined;
        latex?: string | undefined;
    }>, z.ZodObject<{
        hoveredImage: z.ZodOptional<z.ZodString>;
        depressedImage: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        hoveredImage?: string | undefined;
        depressedImage?: string | undefined;
    }, {
        hoveredImage?: string | undefined;
        depressedImage?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    height?: string | undefined;
    width?: string | undefined;
    center?: string | undefined;
    name?: string | undefined;
    opacity?: string | undefined;
    hidden?: boolean | undefined;
    draggable?: boolean | undefined;
    angle?: string | undefined;
    foreground?: boolean | undefined;
    type: "image";
    clickableInfo: {
        description?: string | undefined;
        enabled?: boolean | undefined;
        latex?: string | undefined;
    } & {
        hoveredImage?: string | undefined;
        depressedImage?: string | undefined;
    };
    image_url: string;
}, {
    height?: string | undefined;
    width?: string | undefined;
    center?: string | undefined;
    name?: string | undefined;
    opacity?: string | undefined;
    hidden?: boolean | undefined;
    draggable?: boolean | undefined;
    angle?: string | undefined;
    foreground?: boolean | undefined;
    type: "image";
    clickableInfo: {
        description?: string | undefined;
        enabled?: boolean | undefined;
        latex?: string | undefined;
    } & {
        hoveredImage?: string | undefined;
        depressedImage?: string | undefined;
    };
    image_url: string;
}>, z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
    id: z.ZodString;
    secret: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    secret?: boolean | undefined;
    id: string;
}, {
    secret?: boolean | undefined;
    id: string;
}>, z.ZodObject<{
    folderId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    folderId?: string | undefined;
}, {
    folderId?: string | undefined;
}>>, z.ZodObject<{
    type: z.ZodLiteral<"table">;
    columns: z.ZodArray<z.ZodIntersection<z.ZodObject<{
        id: z.ZodString;
        values: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        values: string[];
        id: string;
    }, {
        values: string[];
        id: string;
    }>, z.ZodObject<{
        color: z.ZodString;
        latex: z.ZodOptional<z.ZodString>;
        hidden: z.ZodOptional<z.ZodBoolean>;
        points: z.ZodOptional<z.ZodBoolean>;
        lines: z.ZodOptional<z.ZodBoolean>;
        dragMode: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"NONE">, z.ZodLiteral<"X">, z.ZodLiteral<"Y">, z.ZodLiteral<"XY">, z.ZodLiteral<"AUTO">]>>;
        lineStyle: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"SOLID">, z.ZodLiteral<"DASHED">, z.ZodLiteral<"DOTTED">]>>;
        pointStyle: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"POINT">, z.ZodLiteral<"OPEN">, z.ZodLiteral<"CROSS">]>>;
        colorLatex: z.ZodOptional<z.ZodString>;
        lineOpacity: z.ZodOptional<z.ZodString>;
        lineWidth: z.ZodOptional<z.ZodString>;
        pointSize: z.ZodOptional<z.ZodString>;
        pointOpacity: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        hidden?: boolean | undefined;
        latex?: string | undefined;
        points?: boolean | undefined;
        lines?: boolean | undefined;
        dragMode?: "NONE" | "X" | "Y" | "XY" | "AUTO" | undefined;
        lineStyle?: "SOLID" | "DASHED" | "DOTTED" | undefined;
        pointStyle?: "POINT" | "OPEN" | "CROSS" | undefined;
        colorLatex?: string | undefined;
        lineOpacity?: string | undefined;
        lineWidth?: string | undefined;
        pointSize?: string | undefined;
        pointOpacity?: string | undefined;
        color: string;
    }, {
        hidden?: boolean | undefined;
        latex?: string | undefined;
        points?: boolean | undefined;
        lines?: boolean | undefined;
        dragMode?: "NONE" | "X" | "Y" | "XY" | "AUTO" | undefined;
        lineStyle?: "SOLID" | "DASHED" | "DOTTED" | undefined;
        pointStyle?: "POINT" | "OPEN" | "CROSS" | undefined;
        colorLatex?: string | undefined;
        lineOpacity?: string | undefined;
        lineWidth?: string | undefined;
        pointSize?: string | undefined;
        pointOpacity?: string | undefined;
        color: string;
    }>>, "many">;
}, "strip", z.ZodTypeAny, {
    type: "table";
    columns: ({
        values: string[];
        id: string;
    } & {
        hidden?: boolean | undefined;
        latex?: string | undefined;
        points?: boolean | undefined;
        lines?: boolean | undefined;
        dragMode?: "NONE" | "X" | "Y" | "XY" | "AUTO" | undefined;
        lineStyle?: "SOLID" | "DASHED" | "DOTTED" | undefined;
        pointStyle?: "POINT" | "OPEN" | "CROSS" | undefined;
        colorLatex?: string | undefined;
        lineOpacity?: string | undefined;
        lineWidth?: string | undefined;
        pointSize?: string | undefined;
        pointOpacity?: string | undefined;
        color: string;
    })[];
}, {
    type: "table";
    columns: ({
        values: string[];
        id: string;
    } & {
        hidden?: boolean | undefined;
        latex?: string | undefined;
        points?: boolean | undefined;
        lines?: boolean | undefined;
        dragMode?: "NONE" | "X" | "Y" | "XY" | "AUTO" | undefined;
        lineStyle?: "SOLID" | "DASHED" | "DOTTED" | undefined;
        pointStyle?: "POINT" | "OPEN" | "CROSS" | undefined;
        colorLatex?: string | undefined;
        lineOpacity?: string | undefined;
        lineWidth?: string | undefined;
        pointSize?: string | undefined;
        pointOpacity?: string | undefined;
        color: string;
    })[];
}>>, z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
    id: z.ZodString;
    secret: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    secret?: boolean | undefined;
    id: string;
}, {
    secret?: boolean | undefined;
    id: string;
}>, z.ZodObject<{
    folderId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    folderId?: string | undefined;
}, {
    folderId?: string | undefined;
}>>, z.ZodObject<{
    type: z.ZodLiteral<"text">;
    text: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    text?: string | undefined;
    type: "text";
}, {
    text?: string | undefined;
    type: "text";
}>>]>, z.ZodIntersection<z.ZodObject<{
    id: z.ZodString;
    secret: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    secret?: boolean | undefined;
    id: string;
}, {
    secret?: boolean | undefined;
    id: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"folder">;
    hidden: z.ZodOptional<z.ZodBoolean>;
    collapsed: z.ZodOptional<z.ZodBoolean>;
    title: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    hidden?: boolean | undefined;
    title?: string | undefined;
    collapsed?: boolean | undefined;
    type: "folder";
}, {
    hidden?: boolean | undefined;
    title?: string | undefined;
    collapsed?: boolean | undefined;
    type: "folder";
}>>]>;
export interface GraphState {
    version: 9;
    randomSeed?: string;
    graph: GrapherState;
    expressions: {
        list: ItemState[];
        ticker?: Ticker;
    };
}
export declare const GraphStateParser: z.ZodObject<{
    version: z.ZodLiteral<9>;
    randomSeed: z.ZodOptional<z.ZodString>;
    graph: z.ZodObject<{
        viewport: z.ZodObject<{
            xmin: z.ZodNumber;
            ymin: z.ZodNumber;
            xmax: z.ZodNumber;
            ymax: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            xmin: number;
            ymin: number;
            xmax: number;
            ymax: number;
        }, {
            xmin: number;
            ymin: number;
            xmax: number;
            ymax: number;
        }>;
        xAxisMinorSubdivisions: z.ZodOptional<z.ZodNumber>;
        yAxisMinorSubdivisions: z.ZodOptional<z.ZodNumber>;
        degreeMode: z.ZodOptional<z.ZodBoolean>;
        showGrid: z.ZodOptional<z.ZodBoolean>;
        showXAxis: z.ZodOptional<z.ZodBoolean>;
        showYAxis: z.ZodOptional<z.ZodBoolean>;
        xAxisNumbers: z.ZodOptional<z.ZodBoolean>;
        yAxisNumbers: z.ZodOptional<z.ZodBoolean>;
        polarNumbers: z.ZodOptional<z.ZodBoolean>;
        xAxisStep: z.ZodOptional<z.ZodNumber>;
        yAxisStep: z.ZodOptional<z.ZodNumber>;
        xAxisArrowMode: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"NONE">, z.ZodLiteral<"POSITIVE">, z.ZodLiteral<"BOTH">]>>;
        yAxisArrowMode: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"NONE">, z.ZodLiteral<"POSITIVE">, z.ZodLiteral<"BOTH">]>>;
        xAxisLabel: z.ZodOptional<z.ZodString>;
        yAxisLabel: z.ZodOptional<z.ZodString>;
        squareAxes: z.ZodOptional<z.ZodBoolean>;
        restrictGridToFirstQuadrant: z.ZodOptional<z.ZodBoolean>;
        polarMode: z.ZodOptional<z.ZodBoolean>;
        userLockedViewport: z.ZodOptional<z.ZodBoolean>;
    }, "strict", z.ZodTypeAny, {
        xAxisMinorSubdivisions?: number | undefined;
        yAxisMinorSubdivisions?: number | undefined;
        degreeMode?: boolean | undefined;
        showGrid?: boolean | undefined;
        showXAxis?: boolean | undefined;
        showYAxis?: boolean | undefined;
        xAxisNumbers?: boolean | undefined;
        yAxisNumbers?: boolean | undefined;
        polarNumbers?: boolean | undefined;
        xAxisStep?: number | undefined;
        yAxisStep?: number | undefined;
        xAxisArrowMode?: "NONE" | "POSITIVE" | "BOTH" | undefined;
        yAxisArrowMode?: "NONE" | "POSITIVE" | "BOTH" | undefined;
        xAxisLabel?: string | undefined;
        yAxisLabel?: string | undefined;
        squareAxes?: boolean | undefined;
        restrictGridToFirstQuadrant?: boolean | undefined;
        polarMode?: boolean | undefined;
        userLockedViewport?: boolean | undefined;
        viewport: {
            xmin: number;
            ymin: number;
            xmax: number;
            ymax: number;
        };
    }, {
        xAxisMinorSubdivisions?: number | undefined;
        yAxisMinorSubdivisions?: number | undefined;
        degreeMode?: boolean | undefined;
        showGrid?: boolean | undefined;
        showXAxis?: boolean | undefined;
        showYAxis?: boolean | undefined;
        xAxisNumbers?: boolean | undefined;
        yAxisNumbers?: boolean | undefined;
        polarNumbers?: boolean | undefined;
        xAxisStep?: number | undefined;
        yAxisStep?: number | undefined;
        xAxisArrowMode?: "NONE" | "POSITIVE" | "BOTH" | undefined;
        yAxisArrowMode?: "NONE" | "POSITIVE" | "BOTH" | undefined;
        xAxisLabel?: string | undefined;
        yAxisLabel?: string | undefined;
        squareAxes?: boolean | undefined;
        restrictGridToFirstQuadrant?: boolean | undefined;
        polarMode?: boolean | undefined;
        userLockedViewport?: boolean | undefined;
        viewport: {
            xmin: number;
            ymin: number;
            xmax: number;
            ymax: number;
        };
    }>;
    expressions: z.ZodObject<{
        list: z.ZodArray<z.ZodUnion<[z.ZodUnion<[z.ZodObject<z.extendShape<{
            type: z.ZodLiteral<"expression">;
            showLabel: z.ZodOptional<z.ZodBoolean>;
            fill: z.ZodOptional<z.ZodBoolean>;
            fillOpacity: z.ZodOptional<z.ZodString>;
            label: z.ZodOptional<z.ZodString>;
            labelSize: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"SMALL">, z.ZodLiteral<"MEDIUM">, z.ZodLiteral<"LARGE">, z.ZodString]>>;
            labelOrientation: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"default">, z.ZodLiteral<"center">, z.ZodLiteral<"center_auto">, z.ZodLiteral<"auto_center">, z.ZodLiteral<"above">, z.ZodLiteral<"above_left">, z.ZodLiteral<"above_right">, z.ZodLiteral<"above_auto">, z.ZodLiteral<"below">, z.ZodLiteral<"below_left">, z.ZodLiteral<"below_right">, z.ZodLiteral<"below_auto">, z.ZodLiteral<"left">, z.ZodLiteral<"auto_left">, z.ZodLiteral<"right">, z.ZodLiteral<"auto_right">]>>;
            labelAngle: z.ZodOptional<z.ZodString>;
            suppressTextOutline: z.ZodOptional<z.ZodBoolean>;
            interactiveLabel: z.ZodOptional<z.ZodBoolean>;
            editableLabelMode: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"MATH">, z.ZodLiteral<"TEXT">]>>;
            residualVariable: z.ZodOptional<z.ZodString>;
            regressionParameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
            isLogModeRegression: z.ZodOptional<z.ZodBoolean>;
            displayEvaluationAsFraction: z.ZodOptional<z.ZodBoolean>;
            slider: z.ZodOptional<z.ZodObject<{
                hardMin: z.ZodOptional<z.ZodBoolean>;
                hardMax: z.ZodOptional<z.ZodBoolean>;
                animationPeriod: z.ZodOptional<z.ZodNumber>;
                loopMode: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"LOOP_FORWARD_REVERSE">, z.ZodLiteral<"LOOP_FORWARD">, z.ZodLiteral<"PLAY_ONCE">, z.ZodLiteral<"PLAY_INDEFINITELY">]>>;
                playDirection: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<-1>, z.ZodLiteral<1>]>>;
                isPlaying: z.ZodOptional<z.ZodBoolean>;
                min: z.ZodOptional<z.ZodString>;
                max: z.ZodOptional<z.ZodString>;
                step: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                max?: string | undefined;
                step?: string | undefined;
                min?: string | undefined;
                hardMin?: boolean | undefined;
                hardMax?: boolean | undefined;
                animationPeriod?: number | undefined;
                loopMode?: "LOOP_FORWARD_REVERSE" | "LOOP_FORWARD" | "PLAY_ONCE" | "PLAY_INDEFINITELY" | undefined;
                playDirection?: 1 | -1 | undefined;
                isPlaying?: boolean | undefined;
            }, {
                max?: string | undefined;
                step?: string | undefined;
                min?: string | undefined;
                hardMin?: boolean | undefined;
                hardMax?: boolean | undefined;
                animationPeriod?: number | undefined;
                loopMode?: "LOOP_FORWARD_REVERSE" | "LOOP_FORWARD" | "PLAY_ONCE" | "PLAY_INDEFINITELY" | undefined;
                playDirection?: 1 | -1 | undefined;
                isPlaying?: boolean | undefined;
            }>>;
            polarDomain: z.ZodOptional<z.ZodObject<{
                min: z.ZodString;
                max: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                max: string;
                min: string;
            }, {
                max: string;
                min: string;
            }>>;
            parametricDomain: z.ZodOptional<z.ZodObject<{
                min: z.ZodString;
                max: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                max: string;
                min: string;
            }, {
                max: string;
                min: string;
            }>>;
            domain: z.ZodOptional<z.ZodObject<{
                min: z.ZodString;
                max: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                max: string;
                min: string;
            }, {
                max: string;
                min: string;
            }>>;
            cdf: z.ZodOptional<z.ZodObject<{
                show: z.ZodBoolean;
                min: z.ZodOptional<z.ZodString>;
                max: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                max?: string | undefined;
                min?: string | undefined;
                show: boolean;
            }, {
                max?: string | undefined;
                min?: string | undefined;
                show: boolean;
            }>>;
            vizProps: z.ZodOptional<z.ZodObject<{
                breadth: z.ZodOptional<z.ZodString>;
                axisOffset: z.ZodOptional<z.ZodString>;
                alignedAxis: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"x">, z.ZodLiteral<"y">]>>;
                showBoxplotOutliers: z.ZodOptional<z.ZodBoolean>;
                dotplotXMode: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"exact">, z.ZodLiteral<"binned">]>>;
                binAlignment: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"left">, z.ZodLiteral<"center">]>>;
                histogramMode: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"count">, z.ZodLiteral<"relative">, z.ZodLiteral<"density">]>>;
            }, "strip", z.ZodTypeAny, {
                breadth?: string | undefined;
                axisOffset?: string | undefined;
                alignedAxis?: "x" | "y" | undefined;
                showBoxplotOutliers?: boolean | undefined;
                dotplotXMode?: "exact" | "binned" | undefined;
                binAlignment?: "center" | "left" | undefined;
                histogramMode?: "count" | "relative" | "density" | undefined;
            }, {
                breadth?: string | undefined;
                axisOffset?: string | undefined;
                alignedAxis?: "x" | "y" | undefined;
                showBoxplotOutliers?: boolean | undefined;
                dotplotXMode?: "exact" | "binned" | undefined;
                binAlignment?: "center" | "left" | undefined;
                histogramMode?: "count" | "relative" | "density" | undefined;
            }>>;
            clickableInfo: z.ZodOptional<z.ZodObject<{
                enabled: z.ZodOptional<z.ZodBoolean>;
                description: z.ZodOptional<z.ZodString>;
                latex: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                description?: string | undefined;
                enabled?: boolean | undefined;
                latex?: string | undefined;
            }, {
                description?: string | undefined;
                enabled?: boolean | undefined;
                latex?: string | undefined;
            }>>;
        }, {
            color: z.ZodString;
            latex: z.ZodOptional<z.ZodString>;
            hidden: z.ZodOptional<z.ZodBoolean>;
            points: z.ZodOptional<z.ZodBoolean>;
            lines: z.ZodOptional<z.ZodBoolean>;
            dragMode: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"NONE">, z.ZodLiteral<"X">, z.ZodLiteral<"Y">, z.ZodLiteral<"XY">, z.ZodLiteral<"AUTO">]>>;
            lineStyle: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"SOLID">, z.ZodLiteral<"DASHED">, z.ZodLiteral<"DOTTED">]>>;
            pointStyle: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"POINT">, z.ZodLiteral<"OPEN">, z.ZodLiteral<"CROSS">]>>;
            colorLatex: z.ZodOptional<z.ZodString>;
            lineOpacity: z.ZodOptional<z.ZodString>;
            lineWidth: z.ZodOptional<z.ZodString>;
            pointSize: z.ZodOptional<z.ZodString>;
            pointOpacity: z.ZodOptional<z.ZodString>;
        }>, "strip", z.ZodTypeAny, {
            fill?: boolean | undefined;
            fillOpacity?: string | undefined;
            hidden?: boolean | undefined;
            label?: string | undefined;
            latex?: string | undefined;
            showLabel?: boolean | undefined;
            labelSize?: string | undefined;
            labelOrientation?: "default" | "center" | "left" | "right" | "center_auto" | "auto_center" | "above" | "above_left" | "above_right" | "above_auto" | "below" | "below_left" | "below_right" | "below_auto" | "auto_left" | "auto_right" | undefined;
            labelAngle?: string | undefined;
            suppressTextOutline?: boolean | undefined;
            interactiveLabel?: boolean | undefined;
            editableLabelMode?: "MATH" | "TEXT" | undefined;
            residualVariable?: string | undefined;
            regressionParameters?: Record<string, number> | undefined;
            isLogModeRegression?: boolean | undefined;
            displayEvaluationAsFraction?: boolean | undefined;
            slider?: {
                max?: string | undefined;
                step?: string | undefined;
                min?: string | undefined;
                hardMin?: boolean | undefined;
                hardMax?: boolean | undefined;
                animationPeriod?: number | undefined;
                loopMode?: "LOOP_FORWARD_REVERSE" | "LOOP_FORWARD" | "PLAY_ONCE" | "PLAY_INDEFINITELY" | undefined;
                playDirection?: 1 | -1 | undefined;
                isPlaying?: boolean | undefined;
            } | undefined;
            polarDomain?: {
                max: string;
                min: string;
            } | undefined;
            parametricDomain?: {
                max: string;
                min: string;
            } | undefined;
            domain?: {
                max: string;
                min: string;
            } | undefined;
            cdf?: {
                max?: string | undefined;
                min?: string | undefined;
                show: boolean;
            } | undefined;
            vizProps?: {
                breadth?: string | undefined;
                axisOffset?: string | undefined;
                alignedAxis?: "x" | "y" | undefined;
                showBoxplotOutliers?: boolean | undefined;
                dotplotXMode?: "exact" | "binned" | undefined;
                binAlignment?: "center" | "left" | undefined;
                histogramMode?: "count" | "relative" | "density" | undefined;
            } | undefined;
            clickableInfo?: {
                description?: string | undefined;
                enabled?: boolean | undefined;
                latex?: string | undefined;
            } | undefined;
            points?: boolean | undefined;
            lines?: boolean | undefined;
            dragMode?: "NONE" | "X" | "Y" | "XY" | "AUTO" | undefined;
            lineStyle?: "SOLID" | "DASHED" | "DOTTED" | undefined;
            pointStyle?: "POINT" | "OPEN" | "CROSS" | undefined;
            colorLatex?: string | undefined;
            lineOpacity?: string | undefined;
            lineWidth?: string | undefined;
            pointSize?: string | undefined;
            pointOpacity?: string | undefined;
            type: "expression";
            color: string;
        }, {
            fill?: boolean | undefined;
            fillOpacity?: string | undefined;
            hidden?: boolean | undefined;
            label?: string | undefined;
            latex?: string | undefined;
            showLabel?: boolean | undefined;
            labelSize?: string | undefined;
            labelOrientation?: "default" | "center" | "left" | "right" | "center_auto" | "auto_center" | "above" | "above_left" | "above_right" | "above_auto" | "below" | "below_left" | "below_right" | "below_auto" | "auto_left" | "auto_right" | undefined;
            labelAngle?: string | undefined;
            suppressTextOutline?: boolean | undefined;
            interactiveLabel?: boolean | undefined;
            editableLabelMode?: "MATH" | "TEXT" | undefined;
            residualVariable?: string | undefined;
            regressionParameters?: Record<string, number> | undefined;
            isLogModeRegression?: boolean | undefined;
            displayEvaluationAsFraction?: boolean | undefined;
            slider?: {
                max?: string | undefined;
                step?: string | undefined;
                min?: string | undefined;
                hardMin?: boolean | undefined;
                hardMax?: boolean | undefined;
                animationPeriod?: number | undefined;
                loopMode?: "LOOP_FORWARD_REVERSE" | "LOOP_FORWARD" | "PLAY_ONCE" | "PLAY_INDEFINITELY" | undefined;
                playDirection?: 1 | -1 | undefined;
                isPlaying?: boolean | undefined;
            } | undefined;
            polarDomain?: {
                max: string;
                min: string;
            } | undefined;
            parametricDomain?: {
                max: string;
                min: string;
            } | undefined;
            domain?: {
                max: string;
                min: string;
            } | undefined;
            cdf?: {
                max?: string | undefined;
                min?: string | undefined;
                show: boolean;
            } | undefined;
            vizProps?: {
                breadth?: string | undefined;
                axisOffset?: string | undefined;
                alignedAxis?: "x" | "y" | undefined;
                showBoxplotOutliers?: boolean | undefined;
                dotplotXMode?: "exact" | "binned" | undefined;
                binAlignment?: "center" | "left" | undefined;
                histogramMode?: "count" | "relative" | "density" | undefined;
            } | undefined;
            clickableInfo?: {
                description?: string | undefined;
                enabled?: boolean | undefined;
                latex?: string | undefined;
            } | undefined;
            points?: boolean | undefined;
            lines?: boolean | undefined;
            dragMode?: "NONE" | "X" | "Y" | "XY" | "AUTO" | undefined;
            lineStyle?: "SOLID" | "DASHED" | "DOTTED" | undefined;
            pointStyle?: "POINT" | "OPEN" | "CROSS" | undefined;
            colorLatex?: string | undefined;
            lineOpacity?: string | undefined;
            lineWidth?: string | undefined;
            pointSize?: string | undefined;
            pointOpacity?: string | undefined;
            type: "expression";
            color: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"image">;
            image_url: z.ZodString;
            name: z.ZodOptional<z.ZodString>;
            width: z.ZodOptional<z.ZodString>;
            height: z.ZodOptional<z.ZodString>;
            hidden: z.ZodOptional<z.ZodBoolean>;
            center: z.ZodOptional<z.ZodString>;
            angle: z.ZodOptional<z.ZodString>;
            opacity: z.ZodOptional<z.ZodString>;
            foreground: z.ZodOptional<z.ZodBoolean>;
            draggable: z.ZodOptional<z.ZodBoolean>;
            clickableInfo: z.ZodIntersection<z.ZodObject<{
                enabled: z.ZodOptional<z.ZodBoolean>;
                description: z.ZodOptional<z.ZodString>;
                latex: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                description?: string | undefined;
                enabled?: boolean | undefined;
                latex?: string | undefined;
            }, {
                description?: string | undefined;
                enabled?: boolean | undefined;
                latex?: string | undefined;
            }>, z.ZodObject<{
                hoveredImage: z.ZodOptional<z.ZodString>;
                depressedImage: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                hoveredImage?: string | undefined;
                depressedImage?: string | undefined;
            }, {
                hoveredImage?: string | undefined;
                depressedImage?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            height?: string | undefined;
            width?: string | undefined;
            center?: string | undefined;
            name?: string | undefined;
            opacity?: string | undefined;
            hidden?: boolean | undefined;
            draggable?: boolean | undefined;
            angle?: string | undefined;
            foreground?: boolean | undefined;
            type: "image";
            clickableInfo: {
                description?: string | undefined;
                enabled?: boolean | undefined;
                latex?: string | undefined;
            } & {
                hoveredImage?: string | undefined;
                depressedImage?: string | undefined;
            };
            image_url: string;
        }, {
            height?: string | undefined;
            width?: string | undefined;
            center?: string | undefined;
            name?: string | undefined;
            opacity?: string | undefined;
            hidden?: boolean | undefined;
            draggable?: boolean | undefined;
            angle?: string | undefined;
            foreground?: boolean | undefined;
            type: "image";
            clickableInfo: {
                description?: string | undefined;
                enabled?: boolean | undefined;
                latex?: string | undefined;
            } & {
                hoveredImage?: string | undefined;
                depressedImage?: string | undefined;
            };
            image_url: string;
        }>, z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
            id: z.ZodString;
            secret: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            secret?: boolean | undefined;
            id: string;
        }, {
            secret?: boolean | undefined;
            id: string;
        }>, z.ZodObject<{
            folderId: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            folderId?: string | undefined;
        }, {
            folderId?: string | undefined;
        }>>, z.ZodObject<{
            type: z.ZodLiteral<"table">;
            columns: z.ZodArray<z.ZodIntersection<z.ZodObject<{
                id: z.ZodString;
                values: z.ZodArray<z.ZodString, "many">;
            }, "strip", z.ZodTypeAny, {
                values: string[];
                id: string;
            }, {
                values: string[];
                id: string;
            }>, z.ZodObject<{
                color: z.ZodString;
                latex: z.ZodOptional<z.ZodString>;
                hidden: z.ZodOptional<z.ZodBoolean>;
                points: z.ZodOptional<z.ZodBoolean>;
                lines: z.ZodOptional<z.ZodBoolean>;
                dragMode: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"NONE">, z.ZodLiteral<"X">, z.ZodLiteral<"Y">, z.ZodLiteral<"XY">, z.ZodLiteral<"AUTO">]>>;
                lineStyle: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"SOLID">, z.ZodLiteral<"DASHED">, z.ZodLiteral<"DOTTED">]>>;
                pointStyle: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"POINT">, z.ZodLiteral<"OPEN">, z.ZodLiteral<"CROSS">]>>;
                colorLatex: z.ZodOptional<z.ZodString>;
                lineOpacity: z.ZodOptional<z.ZodString>;
                lineWidth: z.ZodOptional<z.ZodString>;
                pointSize: z.ZodOptional<z.ZodString>;
                pointOpacity: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                hidden?: boolean | undefined;
                latex?: string | undefined;
                points?: boolean | undefined;
                lines?: boolean | undefined;
                dragMode?: "NONE" | "X" | "Y" | "XY" | "AUTO" | undefined;
                lineStyle?: "SOLID" | "DASHED" | "DOTTED" | undefined;
                pointStyle?: "POINT" | "OPEN" | "CROSS" | undefined;
                colorLatex?: string | undefined;
                lineOpacity?: string | undefined;
                lineWidth?: string | undefined;
                pointSize?: string | undefined;
                pointOpacity?: string | undefined;
                color: string;
            }, {
                hidden?: boolean | undefined;
                latex?: string | undefined;
                points?: boolean | undefined;
                lines?: boolean | undefined;
                dragMode?: "NONE" | "X" | "Y" | "XY" | "AUTO" | undefined;
                lineStyle?: "SOLID" | "DASHED" | "DOTTED" | undefined;
                pointStyle?: "POINT" | "OPEN" | "CROSS" | undefined;
                colorLatex?: string | undefined;
                lineOpacity?: string | undefined;
                lineWidth?: string | undefined;
                pointSize?: string | undefined;
                pointOpacity?: string | undefined;
                color: string;
            }>>, "many">;
        }, "strip", z.ZodTypeAny, {
            type: "table";
            columns: ({
                values: string[];
                id: string;
            } & {
                hidden?: boolean | undefined;
                latex?: string | undefined;
                points?: boolean | undefined;
                lines?: boolean | undefined;
                dragMode?: "NONE" | "X" | "Y" | "XY" | "AUTO" | undefined;
                lineStyle?: "SOLID" | "DASHED" | "DOTTED" | undefined;
                pointStyle?: "POINT" | "OPEN" | "CROSS" | undefined;
                colorLatex?: string | undefined;
                lineOpacity?: string | undefined;
                lineWidth?: string | undefined;
                pointSize?: string | undefined;
                pointOpacity?: string | undefined;
                color: string;
            })[];
        }, {
            type: "table";
            columns: ({
                values: string[];
                id: string;
            } & {
                hidden?: boolean | undefined;
                latex?: string | undefined;
                points?: boolean | undefined;
                lines?: boolean | undefined;
                dragMode?: "NONE" | "X" | "Y" | "XY" | "AUTO" | undefined;
                lineStyle?: "SOLID" | "DASHED" | "DOTTED" | undefined;
                pointStyle?: "POINT" | "OPEN" | "CROSS" | undefined;
                colorLatex?: string | undefined;
                lineOpacity?: string | undefined;
                lineWidth?: string | undefined;
                pointSize?: string | undefined;
                pointOpacity?: string | undefined;
                color: string;
            })[];
        }>>, z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
            id: z.ZodString;
            secret: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            secret?: boolean | undefined;
            id: string;
        }, {
            secret?: boolean | undefined;
            id: string;
        }>, z.ZodObject<{
            folderId: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            folderId?: string | undefined;
        }, {
            folderId?: string | undefined;
        }>>, z.ZodObject<{
            type: z.ZodLiteral<"text">;
            text: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            text?: string | undefined;
            type: "text";
        }, {
            text?: string | undefined;
            type: "text";
        }>>]>, z.ZodIntersection<z.ZodObject<{
            id: z.ZodString;
            secret: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            secret?: boolean | undefined;
            id: string;
        }, {
            secret?: boolean | undefined;
            id: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"folder">;
            hidden: z.ZodOptional<z.ZodBoolean>;
            collapsed: z.ZodOptional<z.ZodBoolean>;
            title: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            hidden?: boolean | undefined;
            title?: string | undefined;
            collapsed?: boolean | undefined;
            type: "folder";
        }, {
            hidden?: boolean | undefined;
            title?: string | undefined;
            collapsed?: boolean | undefined;
            type: "folder";
        }>>]>, "many">;
        ticker: z.ZodOptional<z.ZodObject<{
            handlerLatex: z.ZodOptional<z.ZodString>;
            minStepLatex: z.ZodOptional<z.ZodString>;
            open: z.ZodOptional<z.ZodBoolean>;
            playing: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            open?: boolean | undefined;
            playing?: boolean | undefined;
            handlerLatex?: string | undefined;
            minStepLatex?: string | undefined;
        }, {
            open?: boolean | undefined;
            playing?: boolean | undefined;
            handlerLatex?: string | undefined;
            minStepLatex?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        ticker?: {
            open?: boolean | undefined;
            playing?: boolean | undefined;
            handlerLatex?: string | undefined;
            minStepLatex?: string | undefined;
        } | undefined;
        list: ({
            fill?: boolean | undefined;
            fillOpacity?: string | undefined;
            hidden?: boolean | undefined;
            label?: string | undefined;
            latex?: string | undefined;
            showLabel?: boolean | undefined;
            labelSize?: string | undefined;
            labelOrientation?: "default" | "center" | "left" | "right" | "center_auto" | "auto_center" | "above" | "above_left" | "above_right" | "above_auto" | "below" | "below_left" | "below_right" | "below_auto" | "auto_left" | "auto_right" | undefined;
            labelAngle?: string | undefined;
            suppressTextOutline?: boolean | undefined;
            interactiveLabel?: boolean | undefined;
            editableLabelMode?: "MATH" | "TEXT" | undefined;
            residualVariable?: string | undefined;
            regressionParameters?: Record<string, number> | undefined;
            isLogModeRegression?: boolean | undefined;
            displayEvaluationAsFraction?: boolean | undefined;
            slider?: {
                max?: string | undefined;
                step?: string | undefined;
                min?: string | undefined;
                hardMin?: boolean | undefined;
                hardMax?: boolean | undefined;
                animationPeriod?: number | undefined;
                loopMode?: "LOOP_FORWARD_REVERSE" | "LOOP_FORWARD" | "PLAY_ONCE" | "PLAY_INDEFINITELY" | undefined;
                playDirection?: 1 | -1 | undefined;
                isPlaying?: boolean | undefined;
            } | undefined;
            polarDomain?: {
                max: string;
                min: string;
            } | undefined;
            parametricDomain?: {
                max: string;
                min: string;
            } | undefined;
            domain?: {
                max: string;
                min: string;
            } | undefined;
            cdf?: {
                max?: string | undefined;
                min?: string | undefined;
                show: boolean;
            } | undefined;
            vizProps?: {
                breadth?: string | undefined;
                axisOffset?: string | undefined;
                alignedAxis?: "x" | "y" | undefined;
                showBoxplotOutliers?: boolean | undefined;
                dotplotXMode?: "exact" | "binned" | undefined;
                binAlignment?: "center" | "left" | undefined;
                histogramMode?: "count" | "relative" | "density" | undefined;
            } | undefined;
            clickableInfo?: {
                description?: string | undefined;
                enabled?: boolean | undefined;
                latex?: string | undefined;
            } | undefined;
            points?: boolean | undefined;
            lines?: boolean | undefined;
            dragMode?: "NONE" | "X" | "Y" | "XY" | "AUTO" | undefined;
            lineStyle?: "SOLID" | "DASHED" | "DOTTED" | undefined;
            pointStyle?: "POINT" | "OPEN" | "CROSS" | undefined;
            colorLatex?: string | undefined;
            lineOpacity?: string | undefined;
            lineWidth?: string | undefined;
            pointSize?: string | undefined;
            pointOpacity?: string | undefined;
            type: "expression";
            color: string;
        } | {
            height?: string | undefined;
            width?: string | undefined;
            center?: string | undefined;
            name?: string | undefined;
            opacity?: string | undefined;
            hidden?: boolean | undefined;
            draggable?: boolean | undefined;
            angle?: string | undefined;
            foreground?: boolean | undefined;
            type: "image";
            clickableInfo: {
                description?: string | undefined;
                enabled?: boolean | undefined;
                latex?: string | undefined;
            } & {
                hoveredImage?: string | undefined;
                depressedImage?: string | undefined;
            };
            image_url: string;
        } | ({
            secret?: boolean | undefined;
            id: string;
        } & {
            folderId?: string | undefined;
        } & {
            type: "table";
            columns: ({
                values: string[];
                id: string;
            } & {
                hidden?: boolean | undefined;
                latex?: string | undefined;
                points?: boolean | undefined;
                lines?: boolean | undefined;
                dragMode?: "NONE" | "X" | "Y" | "XY" | "AUTO" | undefined;
                lineStyle?: "SOLID" | "DASHED" | "DOTTED" | undefined;
                pointStyle?: "POINT" | "OPEN" | "CROSS" | undefined;
                colorLatex?: string | undefined;
                lineOpacity?: string | undefined;
                lineWidth?: string | undefined;
                pointSize?: string | undefined;
                pointOpacity?: string | undefined;
                color: string;
            })[];
        }) | ({
            secret?: boolean | undefined;
            id: string;
        } & {
            folderId?: string | undefined;
        } & {
            text?: string | undefined;
            type: "text";
        }) | ({
            secret?: boolean | undefined;
            id: string;
        } & {
            hidden?: boolean | undefined;
            title?: string | undefined;
            collapsed?: boolean | undefined;
            type: "folder";
        }))[];
    }, {
        ticker?: {
            open?: boolean | undefined;
            playing?: boolean | undefined;
            handlerLatex?: string | undefined;
            minStepLatex?: string | undefined;
        } | undefined;
        list: ({
            fill?: boolean | undefined;
            fillOpacity?: string | undefined;
            hidden?: boolean | undefined;
            label?: string | undefined;
            latex?: string | undefined;
            showLabel?: boolean | undefined;
            labelSize?: string | undefined;
            labelOrientation?: "default" | "center" | "left" | "right" | "center_auto" | "auto_center" | "above" | "above_left" | "above_right" | "above_auto" | "below" | "below_left" | "below_right" | "below_auto" | "auto_left" | "auto_right" | undefined;
            labelAngle?: string | undefined;
            suppressTextOutline?: boolean | undefined;
            interactiveLabel?: boolean | undefined;
            editableLabelMode?: "MATH" | "TEXT" | undefined;
            residualVariable?: string | undefined;
            regressionParameters?: Record<string, number> | undefined;
            isLogModeRegression?: boolean | undefined;
            displayEvaluationAsFraction?: boolean | undefined;
            slider?: {
                max?: string | undefined;
                step?: string | undefined;
                min?: string | undefined;
                hardMin?: boolean | undefined;
                hardMax?: boolean | undefined;
                animationPeriod?: number | undefined;
                loopMode?: "LOOP_FORWARD_REVERSE" | "LOOP_FORWARD" | "PLAY_ONCE" | "PLAY_INDEFINITELY" | undefined;
                playDirection?: 1 | -1 | undefined;
                isPlaying?: boolean | undefined;
            } | undefined;
            polarDomain?: {
                max: string;
                min: string;
            } | undefined;
            parametricDomain?: {
                max: string;
                min: string;
            } | undefined;
            domain?: {
                max: string;
                min: string;
            } | undefined;
            cdf?: {
                max?: string | undefined;
                min?: string | undefined;
                show: boolean;
            } | undefined;
            vizProps?: {
                breadth?: string | undefined;
                axisOffset?: string | undefined;
                alignedAxis?: "x" | "y" | undefined;
                showBoxplotOutliers?: boolean | undefined;
                dotplotXMode?: "exact" | "binned" | undefined;
                binAlignment?: "center" | "left" | undefined;
                histogramMode?: "count" | "relative" | "density" | undefined;
            } | undefined;
            clickableInfo?: {
                description?: string | undefined;
                enabled?: boolean | undefined;
                latex?: string | undefined;
            } | undefined;
            points?: boolean | undefined;
            lines?: boolean | undefined;
            dragMode?: "NONE" | "X" | "Y" | "XY" | "AUTO" | undefined;
            lineStyle?: "SOLID" | "DASHED" | "DOTTED" | undefined;
            pointStyle?: "POINT" | "OPEN" | "CROSS" | undefined;
            colorLatex?: string | undefined;
            lineOpacity?: string | undefined;
            lineWidth?: string | undefined;
            pointSize?: string | undefined;
            pointOpacity?: string | undefined;
            type: "expression";
            color: string;
        } | {
            height?: string | undefined;
            width?: string | undefined;
            center?: string | undefined;
            name?: string | undefined;
            opacity?: string | undefined;
            hidden?: boolean | undefined;
            draggable?: boolean | undefined;
            angle?: string | undefined;
            foreground?: boolean | undefined;
            type: "image";
            clickableInfo: {
                description?: string | undefined;
                enabled?: boolean | undefined;
                latex?: string | undefined;
            } & {
                hoveredImage?: string | undefined;
                depressedImage?: string | undefined;
            };
            image_url: string;
        } | ({
            secret?: boolean | undefined;
            id: string;
        } & {
            folderId?: string | undefined;
        } & {
            type: "table";
            columns: ({
                values: string[];
                id: string;
            } & {
                hidden?: boolean | undefined;
                latex?: string | undefined;
                points?: boolean | undefined;
                lines?: boolean | undefined;
                dragMode?: "NONE" | "X" | "Y" | "XY" | "AUTO" | undefined;
                lineStyle?: "SOLID" | "DASHED" | "DOTTED" | undefined;
                pointStyle?: "POINT" | "OPEN" | "CROSS" | undefined;
                colorLatex?: string | undefined;
                lineOpacity?: string | undefined;
                lineWidth?: string | undefined;
                pointSize?: string | undefined;
                pointOpacity?: string | undefined;
                color: string;
            })[];
        }) | ({
            secret?: boolean | undefined;
            id: string;
        } & {
            folderId?: string | undefined;
        } & {
            text?: string | undefined;
            type: "text";
        }) | ({
            secret?: boolean | undefined;
            id: string;
        } & {
            hidden?: boolean | undefined;
            title?: string | undefined;
            collapsed?: boolean | undefined;
            type: "folder";
        }))[];
    }>;
}, "strip", z.ZodTypeAny, {
    randomSeed?: string | undefined;
    version: 9;
    graph: {
        xAxisMinorSubdivisions?: number | undefined;
        yAxisMinorSubdivisions?: number | undefined;
        degreeMode?: boolean | undefined;
        showGrid?: boolean | undefined;
        showXAxis?: boolean | undefined;
        showYAxis?: boolean | undefined;
        xAxisNumbers?: boolean | undefined;
        yAxisNumbers?: boolean | undefined;
        polarNumbers?: boolean | undefined;
        xAxisStep?: number | undefined;
        yAxisStep?: number | undefined;
        xAxisArrowMode?: "NONE" | "POSITIVE" | "BOTH" | undefined;
        yAxisArrowMode?: "NONE" | "POSITIVE" | "BOTH" | undefined;
        xAxisLabel?: string | undefined;
        yAxisLabel?: string | undefined;
        squareAxes?: boolean | undefined;
        restrictGridToFirstQuadrant?: boolean | undefined;
        polarMode?: boolean | undefined;
        userLockedViewport?: boolean | undefined;
        viewport: {
            xmin: number;
            ymin: number;
            xmax: number;
            ymax: number;
        };
    };
    expressions: {
        ticker?: {
            open?: boolean | undefined;
            playing?: boolean | undefined;
            handlerLatex?: string | undefined;
            minStepLatex?: string | undefined;
        } | undefined;
        list: ({
            fill?: boolean | undefined;
            fillOpacity?: string | undefined;
            hidden?: boolean | undefined;
            label?: string | undefined;
            latex?: string | undefined;
            showLabel?: boolean | undefined;
            labelSize?: string | undefined;
            labelOrientation?: "default" | "center" | "left" | "right" | "center_auto" | "auto_center" | "above" | "above_left" | "above_right" | "above_auto" | "below" | "below_left" | "below_right" | "below_auto" | "auto_left" | "auto_right" | undefined;
            labelAngle?: string | undefined;
            suppressTextOutline?: boolean | undefined;
            interactiveLabel?: boolean | undefined;
            editableLabelMode?: "MATH" | "TEXT" | undefined;
            residualVariable?: string | undefined;
            regressionParameters?: Record<string, number> | undefined;
            isLogModeRegression?: boolean | undefined;
            displayEvaluationAsFraction?: boolean | undefined;
            slider?: {
                max?: string | undefined;
                step?: string | undefined;
                min?: string | undefined;
                hardMin?: boolean | undefined;
                hardMax?: boolean | undefined;
                animationPeriod?: number | undefined;
                loopMode?: "LOOP_FORWARD_REVERSE" | "LOOP_FORWARD" | "PLAY_ONCE" | "PLAY_INDEFINITELY" | undefined;
                playDirection?: 1 | -1 | undefined;
                isPlaying?: boolean | undefined;
            } | undefined;
            polarDomain?: {
                max: string;
                min: string;
            } | undefined;
            parametricDomain?: {
                max: string;
                min: string;
            } | undefined;
            domain?: {
                max: string;
                min: string;
            } | undefined;
            cdf?: {
                max?: string | undefined;
                min?: string | undefined;
                show: boolean;
            } | undefined;
            vizProps?: {
                breadth?: string | undefined;
                axisOffset?: string | undefined;
                alignedAxis?: "x" | "y" | undefined;
                showBoxplotOutliers?: boolean | undefined;
                dotplotXMode?: "exact" | "binned" | undefined;
                binAlignment?: "center" | "left" | undefined;
                histogramMode?: "count" | "relative" | "density" | undefined;
            } | undefined;
            clickableInfo?: {
                description?: string | undefined;
                enabled?: boolean | undefined;
                latex?: string | undefined;
            } | undefined;
            points?: boolean | undefined;
            lines?: boolean | undefined;
            dragMode?: "NONE" | "X" | "Y" | "XY" | "AUTO" | undefined;
            lineStyle?: "SOLID" | "DASHED" | "DOTTED" | undefined;
            pointStyle?: "POINT" | "OPEN" | "CROSS" | undefined;
            colorLatex?: string | undefined;
            lineOpacity?: string | undefined;
            lineWidth?: string | undefined;
            pointSize?: string | undefined;
            pointOpacity?: string | undefined;
            type: "expression";
            color: string;
        } | {
            height?: string | undefined;
            width?: string | undefined;
            center?: string | undefined;
            name?: string | undefined;
            opacity?: string | undefined;
            hidden?: boolean | undefined;
            draggable?: boolean | undefined;
            angle?: string | undefined;
            foreground?: boolean | undefined;
            type: "image";
            clickableInfo: {
                description?: string | undefined;
                enabled?: boolean | undefined;
                latex?: string | undefined;
            } & {
                hoveredImage?: string | undefined;
                depressedImage?: string | undefined;
            };
            image_url: string;
        } | ({
            secret?: boolean | undefined;
            id: string;
        } & {
            folderId?: string | undefined;
        } & {
            type: "table";
            columns: ({
                values: string[];
                id: string;
            } & {
                hidden?: boolean | undefined;
                latex?: string | undefined;
                points?: boolean | undefined;
                lines?: boolean | undefined;
                dragMode?: "NONE" | "X" | "Y" | "XY" | "AUTO" | undefined;
                lineStyle?: "SOLID" | "DASHED" | "DOTTED" | undefined;
                pointStyle?: "POINT" | "OPEN" | "CROSS" | undefined;
                colorLatex?: string | undefined;
                lineOpacity?: string | undefined;
                lineWidth?: string | undefined;
                pointSize?: string | undefined;
                pointOpacity?: string | undefined;
                color: string;
            })[];
        }) | ({
            secret?: boolean | undefined;
            id: string;
        } & {
            folderId?: string | undefined;
        } & {
            text?: string | undefined;
            type: "text";
        }) | ({
            secret?: boolean | undefined;
            id: string;
        } & {
            hidden?: boolean | undefined;
            title?: string | undefined;
            collapsed?: boolean | undefined;
            type: "folder";
        }))[];
    };
}, {
    randomSeed?: string | undefined;
    version: 9;
    graph: {
        xAxisMinorSubdivisions?: number | undefined;
        yAxisMinorSubdivisions?: number | undefined;
        degreeMode?: boolean | undefined;
        showGrid?: boolean | undefined;
        showXAxis?: boolean | undefined;
        showYAxis?: boolean | undefined;
        xAxisNumbers?: boolean | undefined;
        yAxisNumbers?: boolean | undefined;
        polarNumbers?: boolean | undefined;
        xAxisStep?: number | undefined;
        yAxisStep?: number | undefined;
        xAxisArrowMode?: "NONE" | "POSITIVE" | "BOTH" | undefined;
        yAxisArrowMode?: "NONE" | "POSITIVE" | "BOTH" | undefined;
        xAxisLabel?: string | undefined;
        yAxisLabel?: string | undefined;
        squareAxes?: boolean | undefined;
        restrictGridToFirstQuadrant?: boolean | undefined;
        polarMode?: boolean | undefined;
        userLockedViewport?: boolean | undefined;
        viewport: {
            xmin: number;
            ymin: number;
            xmax: number;
            ymax: number;
        };
    };
    expressions: {
        ticker?: {
            open?: boolean | undefined;
            playing?: boolean | undefined;
            handlerLatex?: string | undefined;
            minStepLatex?: string | undefined;
        } | undefined;
        list: ({
            fill?: boolean | undefined;
            fillOpacity?: string | undefined;
            hidden?: boolean | undefined;
            label?: string | undefined;
            latex?: string | undefined;
            showLabel?: boolean | undefined;
            labelSize?: string | undefined;
            labelOrientation?: "default" | "center" | "left" | "right" | "center_auto" | "auto_center" | "above" | "above_left" | "above_right" | "above_auto" | "below" | "below_left" | "below_right" | "below_auto" | "auto_left" | "auto_right" | undefined;
            labelAngle?: string | undefined;
            suppressTextOutline?: boolean | undefined;
            interactiveLabel?: boolean | undefined;
            editableLabelMode?: "MATH" | "TEXT" | undefined;
            residualVariable?: string | undefined;
            regressionParameters?: Record<string, number> | undefined;
            isLogModeRegression?: boolean | undefined;
            displayEvaluationAsFraction?: boolean | undefined;
            slider?: {
                max?: string | undefined;
                step?: string | undefined;
                min?: string | undefined;
                hardMin?: boolean | undefined;
                hardMax?: boolean | undefined;
                animationPeriod?: number | undefined;
                loopMode?: "LOOP_FORWARD_REVERSE" | "LOOP_FORWARD" | "PLAY_ONCE" | "PLAY_INDEFINITELY" | undefined;
                playDirection?: 1 | -1 | undefined;
                isPlaying?: boolean | undefined;
            } | undefined;
            polarDomain?: {
                max: string;
                min: string;
            } | undefined;
            parametricDomain?: {
                max: string;
                min: string;
            } | undefined;
            domain?: {
                max: string;
                min: string;
            } | undefined;
            cdf?: {
                max?: string | undefined;
                min?: string | undefined;
                show: boolean;
            } | undefined;
            vizProps?: {
                breadth?: string | undefined;
                axisOffset?: string | undefined;
                alignedAxis?: "x" | "y" | undefined;
                showBoxplotOutliers?: boolean | undefined;
                dotplotXMode?: "exact" | "binned" | undefined;
                binAlignment?: "center" | "left" | undefined;
                histogramMode?: "count" | "relative" | "density" | undefined;
            } | undefined;
            clickableInfo?: {
                description?: string | undefined;
                enabled?: boolean | undefined;
                latex?: string | undefined;
            } | undefined;
            points?: boolean | undefined;
            lines?: boolean | undefined;
            dragMode?: "NONE" | "X" | "Y" | "XY" | "AUTO" | undefined;
            lineStyle?: "SOLID" | "DASHED" | "DOTTED" | undefined;
            pointStyle?: "POINT" | "OPEN" | "CROSS" | undefined;
            colorLatex?: string | undefined;
            lineOpacity?: string | undefined;
            lineWidth?: string | undefined;
            pointSize?: string | undefined;
            pointOpacity?: string | undefined;
            type: "expression";
            color: string;
        } | {
            height?: string | undefined;
            width?: string | undefined;
            center?: string | undefined;
            name?: string | undefined;
            opacity?: string | undefined;
            hidden?: boolean | undefined;
            draggable?: boolean | undefined;
            angle?: string | undefined;
            foreground?: boolean | undefined;
            type: "image";
            clickableInfo: {
                description?: string | undefined;
                enabled?: boolean | undefined;
                latex?: string | undefined;
            } & {
                hoveredImage?: string | undefined;
                depressedImage?: string | undefined;
            };
            image_url: string;
        } | ({
            secret?: boolean | undefined;
            id: string;
        } & {
            folderId?: string | undefined;
        } & {
            type: "table";
            columns: ({
                values: string[];
                id: string;
            } & {
                hidden?: boolean | undefined;
                latex?: string | undefined;
                points?: boolean | undefined;
                lines?: boolean | undefined;
                dragMode?: "NONE" | "X" | "Y" | "XY" | "AUTO" | undefined;
                lineStyle?: "SOLID" | "DASHED" | "DOTTED" | undefined;
                pointStyle?: "POINT" | "OPEN" | "CROSS" | undefined;
                colorLatex?: string | undefined;
                lineOpacity?: string | undefined;
                lineWidth?: string | undefined;
                pointSize?: string | undefined;
                pointOpacity?: string | undefined;
                color: string;
            })[];
        }) | ({
            secret?: boolean | undefined;
            id: string;
        } & {
            folderId?: string | undefined;
        } & {
            text?: string | undefined;
            type: "text";
        }) | ({
            secret?: boolean | undefined;
            id: string;
        } & {
            hidden?: boolean | undefined;
            title?: string | undefined;
            collapsed?: boolean | undefined;
            type: "folder";
        }))[];
    };
}>;
export {};
