import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator"
import {BlogContentModel} from "../models/blog-content.model";

export class UpdateBlogDto {
    @ApiProperty({ type: String, description: 'Blog title' })
    @IsString()
    @IsOptional()
    title?: string

    @ApiProperty({ type: BlogContentModel, description: 'Blog content' })
    @IsString()
    @IsOptional()
    content?: BlogContentModel
}