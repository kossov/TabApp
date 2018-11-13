import { Item } from "./item.model";

export class Content {
    constructor(
        public readonly searchTerm: string,
        public readonly items: Item[]
    ) { }
}