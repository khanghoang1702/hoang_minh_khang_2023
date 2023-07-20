import {IsNotEmpty, IsOptional, IsString, IsUUID} from "class-validator";

export class UpdateUserDto {
    @IsUUID()
    @IsNotEmpty()
    id: string

    @IsString()
    @IsOptional()
    displayName?: string

    @IsString()
    @IsOptional()
    avatar?: string
}