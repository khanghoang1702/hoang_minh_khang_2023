import {IsInt, IsOptional, IsString} from "class-validator";
import {Type} from "class-transformer";

const enum PaginationDefault {
    OFFSET = 0,
    LIMIT = 5
}

export class BlogCriteriaModel {
    @IsOptional()
    @IsString()
    keyword?: string;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    limit?: number = PaginationDefault.LIMIT;


    @IsOptional()
    @IsInt()
    @Type(() => Number)
    offset?: number = PaginationDefault.OFFSET ;
}