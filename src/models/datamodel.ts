import { z } from "zod";
import { datavaultDefinitionSchema } from "./datavault-definition";

export class DatamodelTypeValue {
    static readonly logical = 'logical';
    static readonly ingestion = 'ingestion';
    static readonly delivery = 'delivery';
}


export const datamodelTypeSchema = z.enum([DatamodelTypeValue.logical, DatamodelTypeValue.ingestion, DatamodelTypeValue.delivery]);

export type DatamodelType = z.infer<typeof datamodelTypeSchema>;

export const isDatamodelType = (value: unknown): value is DatamodelType => {
    return datamodelTypeSchema.safeParse(value).success;
}


export class ConfigurationItemStatusValue {
    static readonly draft = 'draft';
    static readonly published = 'published';
}

export const configurationItemStatusSchema = z.enum([ConfigurationItemStatusValue.draft, ConfigurationItemStatusValue.published]);

export type ConfigurationItemStatus = z.infer<typeof configurationItemStatusSchema>;

export const isConfigurationItemStatus = (value: unknown): value is ConfigurationItemStatus => {
    return configurationItemStatusSchema.safeParse(value).success;
}


export const baseDatamodelSchema = z.object({
    type: datamodelTypeSchema,
    name: z.string(),
    description: z.string(),
    status: configurationItemStatusSchema,
    version: z.number().int(),
    key: z.string(),
    itemType: z.literal('datamodel'),
    validationSchema: z.any(),
})

export type BaseDatamodel = z.infer<typeof baseDatamodelSchema>;

export const isBaseDatamodel = (value: unknown): value is BaseDatamodel => {
    return baseDatamodelSchema.safeParse(value).success;
}

export const logicalDatamodelSchema = baseDatamodelSchema.extend({
    type: z.literal(DatamodelTypeValue.logical),
    datavaultDefinitions: z.array(datavaultDefinitionSchema)
})

export type LogicalDatamodel = z.infer<typeof logicalDatamodelSchema>;

export const isLogicalDatamodel = (value: unknown): value is LogicalDatamodel => {
    return logicalDatamodelSchema.safeParse(value).success;
}