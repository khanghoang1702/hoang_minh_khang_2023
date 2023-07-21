import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from "@nestjs/typeorm";
import {BlogEntity} from '../entities/blog.entity';
import {CreateBlogDto} from '../dtos/create-blog.dto';
import {UpdateBlogDto} from '../dtos/update-blog.dto';
import {CloudinaryService} from 'src/modules/cloudinary/cloudinary.service';
import {UpdateBlogImagesDto} from '../dtos/update-blog-images.dto';
import {UsersService} from "../../users/services/users.service";

@Injectable()
export class BlogService {

    constructor(@InjectRepository(BlogEntity)
                private blogRepository: Repository<BlogEntity>,
                private usersService: UsersService,
                private cloudinary: CloudinaryService) {
    }

    async createBlog(blog: CreateBlogDto, authorEmail: string): Promise<BlogEntity> {
        try {
            const author = await this.usersService.findUserByEmail(authorEmail)
            const newBlog = await this.blogRepository.preload({...blog, author})

            return await this.blogRepository.save(newBlog);
        } catch (error) {
            throw error
        }

    }

    async getBlogs() {
        try {
            return await this.blogRepository.find({relations: {author: true}});

        } catch (error) {
            throw error
        }
    }

    async getBlog(id: string) {
        try {
            const blog = await this.blogRepository.findOne({
                where: {id: id}, relations: {author: true}
            });
            if (!blog) {
                throw new NotFoundException('Blog not found');
            }
            return blog
        } catch (error) {
            throw error
        }

    }

    async updateBlog(id: string, blog: UpdateBlogDto) {
        try {
            const oldBlog = await this.getBlog(id);
            const updateBlog = {...oldBlog, blog};
            const preloadBlog = await this.blogRepository.preload(updateBlog);
            return await this.blogRepository.save(preloadBlog);
        } catch (error) {
            throw error
        }

    }

    async remove(id: string) {
        try {
            const deleteResult = await this.blogRepository.delete({id: id});
            return deleteResult.affected === 1;
        } catch (error) {
            throw error;
        }

    }

    vote(type: string, blogId: string) {
        if (type === 'up') {
            return this.upvote(blogId);
        }
        return this.downvote(blogId)
    }

    private async upvote(blogId: string) {
        const blog = await this.getBlog(blogId);
        const blogInstance = await this.blogRepository.preload({
            ...blog,
            like: blog.like + 1,
            dislike: blog.like
        })
        return await this.blogRepository.save(blogInstance);
    }

    private async downvote(blogId: string) {
        const blog = await this.getBlog(blogId);
        const blogInstance = await this.blogRepository.preload({
            ...blog,
            like: blog.like - 1,
            dislike: blog.like
        })
        return await this.blogRepository.save(blogInstance);
    }

    async publishBlog(blogId: string) {
        const blog = await this.getBlog(blogId);
        const blogInstance = await this.blogRepository.preload({
            ...blog,
            published: true
        })
        return await this.blogRepository.save(blogInstance);
    }

    // async uploadPostImages(blogId: string, images: Express.Multer.File[]): Promise<any> {
    //     try {
    //         const imgArr = [];
    //         for (const img of images) {
    //             const uploaded: any = await this.cloudinary.uploadImage(img);
    //             imgArr.push(uploaded.url);
    //         }
    //         const payload = new UpdateBlogDto();
    //         return this.updateBlog(blogId, {...payload, images: imgArr});
    //     } catch (error) {
    //         throw error;
    //     }
    //
    // }

}
