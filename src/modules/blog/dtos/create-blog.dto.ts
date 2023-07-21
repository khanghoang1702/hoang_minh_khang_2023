import {ApiProperty} from "@nestjs/swagger"
import {IsNotEmpty, IsString, IsUUID} from "class-validator"

export class CreateBlogDto {
    @ApiProperty({type: String, description: 'Blog title'})
    @IsString()
    @IsNotEmpty()
    title: string

    @ApiProperty({type: String, description: 'Blog content'})
    @IsString()
    @IsNotEmpty()
    content: string

    @ApiProperty({type: String, description: 'Blog category'})
    @IsUUID()
    @IsNotEmpty()
    category: string
}