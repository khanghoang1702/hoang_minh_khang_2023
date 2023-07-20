import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "../services/auth.service";
import {RegisterDto} from "../dtos/register.dto";
import {LoginDto} from "../dtos/login.dto";
import {ApiCreatedResponse, ApiForbiddenResponse, ApiOperation, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {Public} from "../decorators/public.decorator";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @ApiOperation({summary: 'Create new user'})
    @ApiCreatedResponse({
        description: 'Create a use',
    })
    @ApiUnauthorizedResponse({description: 'Invalid credentials'})
    @ApiForbiddenResponse({
        description: `Forbidden. Cannot create new user`,
    })
    @Post('/sign-up')
    @Public()
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto)
    }

    @ApiOperation({summary: 'Login'})
    @ApiCreatedResponse({
        description: 'Login successful',
    })
    @ApiForbiddenResponse({
        description: `Forbidden. Cannot login`,
    })
    @Post('/sign-in')
    @Public()
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto)
    }
}
