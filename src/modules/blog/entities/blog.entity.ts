import {TypeOrmBaseEntity} from 'src/commons/abstract-entity/type-orm-base-entity.entity';
import {CommentEntity} from 'src/modules/comment/entities/comment.entity';
import {Column, Entity, JoinColumn, ManyToOne, OneToMany} from 'typeorm';
import {UsersEntity} from "../../users/entities/users.entity";
import {CategoriesEntity} from "./categories.entity";
import {BlogContentModel} from "../models/blog-content.model";

@Entity('blogs')
export class BlogEntity extends TypeOrmBaseEntity {
    @Column({type: 'varchar', nullable: true})
    title: string;

    @Column({type: 'json', nullable: true})
    content: BlogContentModel | null;

    @ManyToOne(() => UsersEntity, (author) => author.blogs)
    author: UsersEntity;

    @OneToMany(() => CommentEntity, (comment) => comment.blog)
    comments: CommentEntity[]

    @ManyToOne(() => CategoriesEntity)
    category: CategoriesEntity

    @Column({type: 'boolean', default: false})
    published: boolean;

    @Column({name: 'likeCount', default: 0})
    like: number;

    @Column({name: 'dislikeCount', default: 0})
    dislike: number;
}
