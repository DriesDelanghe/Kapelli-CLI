import { z } from "zod";

export class DatavaultDefinitionKindValue {
    static readonly hub = 'hub';
    static readonly satellite = 'satellite';
    static readonly link = 'link';
}

export const datavaultDefinitionKindSchema = z.enum([DatavaultDefinitionKindValue.hub, DatavaultDefinitionKindValue.satellite, DatavaultDefinitionKindValue.link]);

export type DatavaultDefinitionKind = z.infer<typeof datavaultDefinitionKindSchema>;

export const isDatavalutDefinitionKind = (value: unknown): value is DatavaultDefinitionKind => {
    return datavaultDefinitionKindSchema.safeParse(value).success;
}

export const datavaultDefinitionSchema = z.object({
    name: z.string(),
    description: z.string(),
    kind: datavaultDefinitionKindSchema,
    entityType: z.string(),
    multipleEntries: z.object({
        hasMultipleEntries: z.boolean(),
    }).optional(),
    transformations: z.array(z.object({
        transformer: z.any()
    }))
})

export type DatavaultDefinition = z.infer<typeof datavaultDefinitionSchema>;

export const isDatavaultDefinition = (value: unknown): value is DatavaultDefinition => {
    return datavaultDefinitionSchema.safeParse(value).success;
}