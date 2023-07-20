import {Module} from '@nestjs/common';
import {UsersService} from './services/users.service';
import {CloudinaryModule} from "../cloudinary/cloudinary.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersEntity} from "./entities/users.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UsersEntity]), CloudinaryModule],
    controllers: [],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {
}
