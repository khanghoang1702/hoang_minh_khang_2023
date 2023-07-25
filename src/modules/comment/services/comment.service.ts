import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from '../dtos/create-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from '../entities/comment.entity';
import { Repository } from 'typeorm';
import { BlogService } from 'src/modules/blog/services/blog.service';
import {UsersService} from "../../users/services/users.service";

@Injectable()
export class CommentService {
    constructor(@InjectRepository(CommentEntity)
                private commentRepository: Repository<CommentEntity>,
                private usersService: UsersService,
                private blogService: BlogService) { }
    async createComment(comment: CreateCommentDto, email: string, blogId: string) {
        try {
            const author = await this.usersService.findUserByEmail(email);
            const blog = await this.blogService.getBlog(blogId);
            const newComment = await this.commentRepository.create({...comment, blog, author})

            return await this.commentRepository.save(newComment);
        } catch (error) {
            throw error;
        }

    }

    async getCommentsByBlog(blogId: string) {
        try {
            return (await this.commentRepository.find({ where: { blog: { id: blogId } }, order: { createdAt: 'DESC' } }))

        } catch (error) {
            throw error;
        }
    }

    async removeComment(commentId: string) {
        try {
            const deleteResult = await this.commentRepository.delete({ id: commentId })
            return deleteResult.affected === 1;
        } catch (error) {
            throw error;
        }
    }
}
