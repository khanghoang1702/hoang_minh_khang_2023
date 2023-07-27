import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import {Observable} from "rxjs";
import {classToPlain} from "class-transformer";
@Injectable()
export class SerializerInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<any> {
        return next.handle().pipe(map(data => classToPlain(data)));
    }
}