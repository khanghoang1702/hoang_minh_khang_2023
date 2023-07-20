import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {JwtService} from '@nestjs/jwt';
import {AuthEntity} from "../entities/auth.entity";
import {Repository} from "typeorm";
import {LoginDto} from "../dtos/login.dto";
import {jwtConstants} from "../constants/jwt";
import {UsersService} from "../../users/services/users.service";
import {AuthHelper} from "../helpers/auth.helper";
import {RegisterDto} from "../dtos/register.dto";

@Injectable()
export class AuthService {
    constructor(@InjectRepository(AuthEntity)
                private authRepository: Repository<AuthEntity>,
                private readonly jwtService: JwtService,
                private usersService: UsersService) {
    }

    async login({email, password}: LoginDto) {
        const user = await this.usersService.findUserByEmail(email);
        if (!user) {
            throw new BadRequestException('Invalid Credentials');
        }

        const payload = {email: email}

        const isPasswordValid = await AuthHelper.isValidPassword(password, user.password)

        if (!isPasswordValid) {
            throw new BadRequestException('Invalid Password');
        }

        return this.tokenGenerator(payload)
    }

    async register(dto: RegisterDto) {
        try {
            const user = await this.usersService.findUserByEmail(dto.email);
            if (user) {
                throw new BadRequestException('User already exist');
            }

            const hashedPassword = await AuthHelper.hashPassword(dto.password)
            const res = await this.usersService.createUser({...dto, password: hashedPassword})

            return res

        } catch (e) {
            throw e
        }
    }

    private async tokenGenerator(payload: any) {
        console.log('payloaadddd', payload)
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: jwtConstants.secret,
                expiresIn: '7h'
            }),
            this.jwtService.signAsync(payload, {
                secret: jwtConstants.rtSecret,
                expiresIn: '24h'
            }),
        ]);

        return {
            access_token: at,
            refresh_token: rt,
        };
    }

    async validateUser(email: string, displayName: string) {
        const user = await this.usersService.findUserByEmail(email);
        return user
            ? user
            : this.usersService.createUser({
                email: email,
                password: `${email}_${displayName}`,
                displayName: displayName,
            });
    }
}
