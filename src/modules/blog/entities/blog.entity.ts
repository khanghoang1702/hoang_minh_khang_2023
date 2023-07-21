import {TypeOrmBaseEntity} from 'src/commons/abstract-entity/type-orm-base-entity.entity';
import {CommentEntity} from 'src/modules/comment/entities/comment.entity';
import {Column, Entity, ManyToOne, OneToMany, OneToOne} from 'typeorm';
import {UsersEntity} from "../../users/entities/users.entity";
import {CategoriesEntity} from "./categories.entity";

@Entity('blogs')
export class BlogEntity extends TypeOrmBaseEntity {
    @Column()
    title: string;

    @Column()
    content: string;

    @ManyToOne(() => UsersEntity)
    author: UsersEntity;

    @OneToMany(() => CommentEntity, (comment) => comment.blog)
    comments: CommentEntity[]

    @OneToOne(() => CategoriesEntity)
    category: CategoriesEntity

    @Column({type: 'boolean', default: false})
    published: boolean;

    @Column({name: 'likeCount', default: 0})
    like: number;

    @Column({name: 'dislikeCount', default: 0})
    dislike: number;
}
