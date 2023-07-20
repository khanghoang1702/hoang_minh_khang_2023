import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthController} from './controllers/auth.controller';
import {AuthService} from './services/auth.service';
import {AuthEntity} from "./entities/auth.entity";
import {UsersModule} from "../users/users.module";

@Module({
    imports: [JwtModule.register({}),
        TypeOrmModule.forFeature([AuthEntity]),
        UsersModule],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {
}
