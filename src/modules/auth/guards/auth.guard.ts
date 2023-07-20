import {CanActivate, ExecutionContext, Injectable, UnauthorizedException, Request} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {IS_PUBLIC_KEY} from '../decorators/public.decorator';
// import {Role} from '../enums/role.enum';
// import {ROLES_KEY} from '../decorators/role.decorator';
import {JwtService} from "@nestjs/jwt";
import {jwtConstants} from "../constants/jwt";

type AuthorizedRequest = Express.Request & { headers: { authorization: string } };

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {

    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: jwtConstants.secret,
            });

            request['user'] = payload;
        } catch (e) {
            console.log(e)
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: AuthorizedRequest): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
