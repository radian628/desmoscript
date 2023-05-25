import { z } from "zod";
export const baseItemStateParser = z.object({
    id: z.string(),
    secret: z.boolean().optional(),
});
export const baseNonFolderStateParser = z.intersection(baseItemStateParser, z.object({
    folderId: z.string().optional(),
}));
export const lineStyleParser = z.union([z.literal("SOLID"), z.literal("DASHED"), z.literal("DOTTED")], {});
export const pointStyleParser = z.union([z.literal("POINT"), z.literal("OPEN"), z.literal("CROSS")], {});
export const dragModeParser = z.union([
    z.literal("NONE"),
    z.literal("X"),
    z.literal("Y"),
    z.literal("XY"),
    z.literal("AUTO"),
], {});
export const labelSizeParser = z.union([z.literal("SMALL"), z.literal("MEDIUM"), z.literal("LARGE"), z.string()], {});
export const labelOrientationParser = z.union([
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
], {});
export const domainParser = z.object({
    min: z.string(),
    max: z.string(),
});
export const baseClickableParser = z.object({
    enabled: z.boolean().optional(),
    description: z.string().optional(),
    latex: z.string().optional(),
});
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
    clickableInfo: baseClickableParser.optional(),
});
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
export const expressionStateParser = expressionStateWithoutColumnParser.merge(columnExpressionSharedParser);
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
    clickableInfo: z.intersection(baseClickableParser, z.object({
        hoveredImage: z.string().optional(),
        depressedImage: z.string().optional(),
    })),
});
export const tableColumnParser = z.intersection(z.object({
    id: z.string(),
    values: z.array(z.string()),
}), columnExpressionSharedParser);
export const tableStateParser = z.intersection(baseNonFolderStateParser, z.object({
    type: z.literal("table"),
    columns: z.array(tableColumnParser),
}));
export const folderStateParser = z.intersection(baseItemStateParser, z.object({
    type: z.literal("folder"),
    hidden: z.boolean().optional(),
    collapsed: z.boolean().optional(),
    title: z.string().optional(),
}));
export const textStateParser = z.intersection(baseNonFolderStateParser, z.object({
    type: z.literal("text"),
    text: z.string().optional(),
}));
export const arrowModeParser = z.union([z.literal("NONE"), z.literal("POSITIVE"), z.literal("BOTH")], {});
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
export const nonFolderStateParser = z.union([
    expressionStateParser,
    imageStateParser,
    tableStateParser,
    textStateParser,
]);
export const tickerParser = z.object({
    handlerLatex: z.string().optional(),
    minStepLatex: z.string().optional(),
    open: z.boolean().optional(),
    playing: z.boolean().optional(),
});
export const itemStateParser = z.union([nonFolderStateParser, folderStateParser], {});
export const GraphStateParser = z.object({
    version: z.literal(9),
    randomSeed: z.string().optional(),
    graph: GrapherStateParser,
    expressions: z.object({
        list: z.array(itemStateParser),
        ticker: z.optional(tickerParser),
    }),
});
