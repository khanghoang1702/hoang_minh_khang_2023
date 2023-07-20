import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UsersEntity} from "../entities/users.entity";
import {Repository} from "typeorm";
import {CreateUserDto} from "../dtos/create-user.dto";
import {UpdateUserDto} from "../dtos/update-user.dto";
import {CloudinaryService} from "../../cloudinary/cloudinary.service";
import {RolesEntity} from "../entities/roles.entity";
import {Roles} from "../enums/roles.enum";

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
            const res = await this.usersRepository.findOne({where: {email}})
            return res
        } catch (e) {
            throw new Error(e);
        }
    }

    async findOne(id: string) {
        try {
            const res = await this.usersRepository.findOne({where: {id}})
            return res
        } catch (e) {
            throw new Error(e);
        }

    }

    async createUser(dto: CreateUserDto) {
        try {
            const role = await this.rolesRepository.findOne({where: {type: Roles.User}});
            const createdUser = await this.usersRepository.create({...dto, ...role});
            const res = await this.usersRepository.save(createdUser);

            return res
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

}
