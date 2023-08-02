import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UsersEntity} from "../entities/users.entity";
import {Repository} from "typeorm";
import {CreateUserDto} from "../dtos/create-user.dto";
import {UpdateUserDto} from "../dtos/update-user.dto";
import {CloudinaryService} from "../../cloudinary/cloudinary.service";
import {RolesEntity} from "../entities/roles.entity";
import {Roles} from "../enums/roles.enum";
import {BlogCriteriaModel} from "../../blog/models/blog-criteria.model";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UsersEntity)
                private usersRepository: Repository<UsersEntity>,
                @InjectRepository(RolesEntity)
                private rolesRepository: Repository<RolesEntity>,
                private cloudinaryService: CloudinaryService,
    ) {
    }

    async findUserByEmail(email: string) {
        try {
            return await this.usersRepository.findOne({
                where: {email}, relations: {
                    role: true
                }
            })
        } catch (e) {
            throw new Error(e);
        }
    }

    async findOne(id: string) {
        try {
            return  await this.usersRepository.findOne({where: {id}})
        } catch (e) {
            throw new Error(e);
        }

    }

    async createUser(dto: CreateUserDto) {
        try {
            const role = await this.rolesRepository.findOne({where: {type: Roles.User}});
            dto['role'] = role
            const createdUser = this.usersRepository.create(dto);
            return await this.usersRepository.save(createdUser);
        } catch (e) {
            throw new Error(e);
        }

    }

    async updateUser(id: string, dto: UpdateUserDto) {
        try {
            const user = await this.findOne(id);
            if (!user) {
                throw new BadRequestException('User not found');
            }
            const preloadUser = await this.usersRepository.preload({...user, ...dto})

            return await this.usersRepository.save(preloadUser)
        } catch (e) {
            throw new Error(e);
        }

    }

    async updateAvatar(email: string, files: Express.Multer.File[]) {
        const user = await this.findUserByEmail(email);
        let avatarUrl = "";

        if (!user) {
            throw new BadRequestException('User dose not exist!');
        }

        for (const file of files) {
            const uploaded: any = await this.cloudinaryService.uploadImage(file);
            avatarUrl = uploaded.url;
        }

        return avatarUrl;
    }

    async getTopBloggers(limit: number) {
        try {
            const queryBuilder = this.usersRepository.createQueryBuilder('u')
            limit = limit ? limit : limit = 3

            queryBuilder
                .limit(limit)
                .select(['u.id AS id', 'u.displayName AS displayName', 'u.email AS email', 'u.avatar AS avatar'])
                .addSelect('COUNT(blogs.id) as blogs')
                .leftJoin('u.blogs', 'blogs')
                .groupBy('u.id')
                .orderBy('blogs', 'DESC')

            return await queryBuilder.execute()
        } catch (error) {
            throw error
        }
    }


}
