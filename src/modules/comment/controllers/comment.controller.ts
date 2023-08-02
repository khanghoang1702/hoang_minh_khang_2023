import { Body, Controller, Delete, Get, Param, Post, Request } from '@nestjs/common';
import { CommentService } from '../services/comment.service';
import { CreateCommentDto } from '../dtos/create-blog.dto';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import {Public} from "../../auth/decorators/public.decorator";

@Controller('comment')
export class CommentController {
    constructor(private commentService: CommentService) { }

    @ApiOperation({ summary: 'Get blog comments' })
    @ApiParam({ name: 'blogId', type: String })
    @Public()
    @Get('/:blogId')
    getCommentsByBlog(@Param('blogId') blogId: string) {
        return this.commentService.getCommentsByBlog(blogId)
    }

    @ApiOperation({ summary: 'Create a comment' })
    @Post()
    comment(@Request() req, @Body() comment: CreateCommentDto) {
        const email = req.user?.email;
        const blogId = comment.blog
        delete comment.blog
        return this.commentService.createComment(comment, email, blogId)
    }

    @ApiOperation({ summary: 'Delete a comment' })
    @ApiParam({ name: 'commentId', type: String })
    @Delete('/:commentId')
    deleteComment(@Param('commentId') commentId: string) {

    }
}
