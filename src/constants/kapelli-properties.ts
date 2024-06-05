

// These are the object keys that need to be excluded from the hash diff calculation
export class KapelliPropertyValue {
    static readonly id = 'id';
    static readonly entityType = 'EntityType';
    static readonly loadDate = 'LoadDate';
    static readonly recordSource = 'RecordSource';
    static readonly entityStatus = 'EntityStatus';
    static readonly hashKey = 'HashKey';
    static readonly hashDiff = 'HashDiff';
}

// map all the values of kapelli property value into an array dynamically

export const kapelliPropertyValues = Object.values(KapelliPropertyValue);


// These are the properties that indicate that the process needs to traverse the object
export class KapelliTraversableProperty {
    static readonly transformer = 'transformer';
    static readonly multipleEntries = 'multipleEntries';
}

export const kapelliTraversableProperties = Object.values(KapelliTraversableProperty);