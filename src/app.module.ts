import {ClassSerializerInterceptor, Module} from '@nestjs/common';
import {BlogModule} from './modules/blog/blog.module';
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DataSource} from "typeorm";
import {APP_INTERCEPTOR} from "@nestjs/core";
import {ResponseTransformInterceptor} from "./interceptors/response.interceptor";
import {migrations} from './database';
import {CommentModule} from './modules/comment/comment.module';
import {CloudinaryModule} from './modules/cloudinary/cloudinary.module';
import {AuthModule} from "./modules/auth/auth.module";
import {UsersModule} from "./modules/users/users.module";


@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `${process.cwd()}/.env`,
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: String(process.env.DB_PASSWORD),
            database: process.env.DB_DATABASE_NAME,
            migrations: migrations,
            autoLoadEntities: true,
            entities: ["dist/src/modules/**/entities/**/*{.js,.ts}"],
            migrationsTableName: process.env.MIGRATIONS_TABLE_NAME,
            logging: true,
            migrationsRun: Boolean(process.env.DB_MIGRATION_RUN),
        }),
        BlogModule,
        CommentModule,
        CloudinaryModule,
        AuthModule,
        UsersModule
    ],
    controllers: [],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseTransformInterceptor,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: ClassSerializerInterceptor,
        },
    ],
})
export class AppModule {
    constructor(private dataSource: DataSource) {
    }
}
