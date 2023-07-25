class Block {
    key: string;
    text: string;
    type:string;
    depth: number;
    inlineStyleRanges: [InlineStyleRange];
    entityRanges: any;
    data: any;
}

class InlineStyleRange {
    offset: number;
    length: number;
    style: string;
}

export class BlogContentModel {
    blocks: [Block]
}