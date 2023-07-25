import {ApiProperty} from "@nestjs/swagger"
import {IsNotEmpty, IsOptional, IsString, IsUUID} from "class-validator"
import {BlogContentModel} from "../models/blog-content.model";

export class CreateBlogDto {
    @ApiProperty({type: String, description: 'Blog title'})
    @IsString()
    @IsOptional()
    title: string

    @ApiProperty({type: BlogContentModel, description: 'Blog content'})
    @IsString()
    @IsOptional()
    content: BlogContentModel

    @ApiProperty({type: String, description: 'Blog category'})
    @IsUUID()
    @IsOptional()
    category: string
}