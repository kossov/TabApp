const defaultThumbnailUrl = "https://spotlight.dlme.clir.org/assets/default-52adc3dc03639885e8aa93763e29868269dd3b9dad4689f140c0175b4f945922.png";

export class Item {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly thumbnailUrl: string = defaultThumbnailUrl
    ) { }
}