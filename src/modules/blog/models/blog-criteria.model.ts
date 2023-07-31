import {IsInt, IsOptional, IsString} from "class-validator";
import {Type} from "class-transformer";

const enum PaginationDefault {
    PAGE = 1,
    PAGE_SIZE = 5
}

export class BlogCriteriaModel {
    @IsOptional()
    @IsString()
    keyword?: string;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    pageSize?: number = PaginationDefault.PAGE_SIZE;


    @IsOptional()
    @IsInt()
    @Type(() => Number)
    page?: number = PaginationDefault.PAGE ;
}