import {Column, Entity, JoinTable, OneToMany} from 'typeorm';
import {TypeOrmBaseEntity} from "../../../commons/abstract-entity/type-orm-base-entity.entity";
import {BlogEntity} from "../../blog/entities/blog.entity";

@Entity('users')
export class UsersEntity extends TypeOrmBaseEntity {
    @Column({type: 'varchar'})
    email: string;

    @Column({type: 'varchar'})
    password: string;

    @Column({type: 'varchar', nullable: true})
    displayName: string;

    @Column({type: 'varchar', nullable: true})
    avatar: string;

    @OneToMany(() => BlogEntity, (blog) => blog.id)
    blogs: BlogEntity[];
}