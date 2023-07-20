import {TypeOrmBaseEntity} from 'src/commons/abstract-entity/type-orm-base-entity.entity';
import {CommentEntity} from 'src/modules/comment/entities/comment.entity';
import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    VersionColumn,
    OneToMany
} from 'typeorm';

@Entity('blogs')
export class BlogEntity extends TypeOrmBaseEntity {
    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    author: string;

    @Column('json', {default: []})
    images: Array<string>;

    @OneToMany(() => CommentEntity, (comment) => comment.blog)
    comments: CommentEntity[]

    @Column({name: 'likeCount', default: 0})
    like: number;

    @Column({name: 'dislikeCount', default: 0})
    dislike: number;
}
