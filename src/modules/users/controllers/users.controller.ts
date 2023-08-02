import {Controller, Get, UseGuards, Request, UsePipes, ValidationPipe, Query, Patch, Body} from '@nestjs/common';
import {UsersService} from "../services/users.service";
import {Public} from "../../auth/decorators/public.decorator";
import {BlogCriteriaModel} from "../../blog/models/blog-criteria.model";
import {UpdateUserDto} from "../dtos/update-user.dto";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {
    }

    @Get('/me')
    getProfile(@Request() req) {
        const email = req.user.email
        return this.usersService.findUserByEmail(email);
    }

    @Patch('/me/update')
    updateUser(@Body() body: UpdateUserDto) {
        return this.usersService.updateUser(body.id, body);
    }

    @Public()
    @Get('/top-bloggers')
    @UsePipes(new ValidationPipe({ transform: true }))
    getTopBloggers(@Query('limit') limit: number) {
        return this.usersService.getTopBloggers(limit)
    }
}
