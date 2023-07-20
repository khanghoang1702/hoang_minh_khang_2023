import { Module } from '@nestjs/common';
import { CommentController } from './controllers/comment.controller';
import { CommentService } from './services/comment.service';
import { CommentEntity } from './entities/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogModule } from '../blog/blog.module';
import {UsersModule} from "../users/users.module";

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity]), UsersModule, BlogModule],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule { }
