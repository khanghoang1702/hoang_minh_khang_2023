import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import {Like, Repository} from 'typeorm';
import {InjectRepository} from "@nestjs/typeorm";
import {BlogEntity} from '../entities/blog.entity';
import {CreateBlogDto} from '../dtos/create-blog.dto';
import {UpdateBlogDto} from '../dtos/update-blog.dto';
import {CloudinaryService} from 'src/modules/cloudinary/cloudinary.service';
import {UpdateBlogImagesDto} from '../dtos/update-blog-images.dto';
import {UsersService} from "../../users/services/users.service";
import {CategoriesEntity} from "../entities/categories.entity";
import {BlogCriteriaModel} from "../models/blog-criteria.model";
import {UsersEntity} from "../../users/entities/users.entity";

@Injectable()
export class BlogService {

    constructor(@InjectRepository(BlogEntity)
                private blogRepository: Repository<BlogEntity>,
                @InjectRepository(CategoriesEntity)
                private categoryRepository: Repository<CategoriesEntity>,
                private usersService: UsersService,
                private cloudinary: CloudinaryService) {
    }

    async createBlog(blog: CreateBlogDto, authorEmail: string, categoryId: string): Promise<BlogEntity> {
        try {
            const author = await this.usersService.findUserByEmail(authorEmail)
            const category = await this.categoryRepository.findOne({where: {id: categoryId}})
            const newBlog = {...blog, author, category}
            const blogInstance = await this.blogRepository.create(newBlog)

            return await this.blogRepository.save(blogInstance);
        } catch (error) {
            throw error
        }

    }

    async getBlogs({keyword, page, pageSize}: BlogCriteriaModel) {
        try {
            const queryBuilder = this.blogRepository.createQueryBuilder('b')
            if (keyword) {
                queryBuilder.where('b.title ILIKE :keyword', {keyword: `%${keyword}%`})
            }
            const skip = (page - 1) * pageSize
            queryBuilder
                .take(pageSize)
                .skip(skip)
                .orderBy('b.createdAt','DESC')
                .leftJoinAndSelect('b.author', 'author')
                .leftJoinAndSelect('b.comments', 'comments');

            const [blogs, total] = await queryBuilder.getManyAndCount()
            const pagination = {page, pageSize, total}
            return {blogs, pagination}
        } catch (error) {
            throw error
        }
    }

    async getUserBlogs(userId, {keyword, page, pageSize}: BlogCriteriaModel) {
        try {
            const queryBuilder = this.blogRepository.createQueryBuilder('b')
            if (keyword) {
                queryBuilder.where('b.title ILIKE :keyword', {keyword: `%${keyword}%`})
            }
            const skip = (page - 1) * pageSize
            queryBuilder
                .take(pageSize)
                .skip(skip)
                .where('b.authorId = :userId', {userId: userId})
                .orderBy('b.createdAt','DESC')
                .leftJoinAndSelect('b.comments', 'comments');

            const [blogs, total] = await queryBuilder.getManyAndCount()
            const pagination = {page, pageSize, total}
            return {blogs, pagination}
        } catch (error) {
            throw error
        }
    }

    async getTopBlogs(limit?: number) {
        try {
            limit = limit ? limit : limit = 3
            const queryBuilder = this.blogRepository.createQueryBuilder('b')
            queryBuilder
                .limit(limit)
                .select(['b.id as id', 'b.likeCount as like', 'b.title as title', 'author.id as authorId', 'author.displayName as displayName','COUNT(comments) as comments'])
                .leftJoin('b.author', 'author')
                .leftJoin('comments','comments','b.id = comments.blogId')
                .groupBy('b.id')
                .addGroupBy('author.id')
                .orderBy('comments','DESC')
                .addOrderBy('b.likeCount', 'DESC')

            return await queryBuilder.execute()
        } catch (error) {
            throw error
        }
    }


    async getBlog(id: string) {
        try {
            const blog = await this.blogRepository.findOne({
                where: {id: id}, relations: {author: true, category: true}
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
            const updateBlog = {...oldBlog, ...blog};
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

    vote(blogId: string, type: string) {
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

    async getCategories(): Promise<CategoriesEntity[]> {
        try {
            const category = await this.categoryRepository.find();

            return category
        } catch (error) {
            throw error
        }

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
