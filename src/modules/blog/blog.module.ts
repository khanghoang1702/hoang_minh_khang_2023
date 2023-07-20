import { Module } from '@nestjs/common';
import { BlogController } from './controllers/blog.controller';
import { BlogService } from './services/blog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogEntity } from './entities/blog.entity';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import {UsersModule} from "../users/users.module";

@Module({
  imports: [TypeOrmModule.forFeature([BlogEntity]), UsersModule, CloudinaryModule],
  controllers: [BlogController],
  providers: [BlogService],
  exports: [BlogService]
})
export class BlogModule { }
