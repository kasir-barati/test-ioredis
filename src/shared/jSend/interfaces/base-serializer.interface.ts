export interface BaseSerializer<T, K> {
    serialize(inData: T): K;
    serializeList(inData: T[]): { items: K[] };
}
