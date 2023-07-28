import {IsInt, IsOptional, IsString} from "class-validator";
import {Type} from "class-transformer";

export class BlogCriteriaModel {
    @IsOptional()
    @IsString()
    keyword?: string;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    limit?: number ;


    @IsOptional()
    @IsInt()
    @Type(() => Number)
    offset?: number ;
}