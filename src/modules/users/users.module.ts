import {Module} from '@nestjs/common';
import {UsersService} from './services/users.service';
import {CloudinaryModule} from "../cloudinary/cloudinary.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersEntity} from "./entities/users.entity";
import {UsersController} from "./controllers/users.controller";

@Module({
    imports: [TypeOrmModule.forFeature([UsersEntity]), CloudinaryModule],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {
}
