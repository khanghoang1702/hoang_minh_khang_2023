import {Controller, Get, UseGuards, Request} from '@nestjs/common';
import {UsersService} from "../services/users.service";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {
    }

    @Get('/me')
    getProfile(@Request() req) {
        const email = req.user.email
        return this.usersService.findUserByEmail(email);
    }
}
