import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne} from 'typeorm';
import {TypeOrmBaseEntity} from "../../../commons/abstract-entity/type-orm-base-entity.entity";
import {RolesEntity} from "./roles.entity";
import {BlogEntity} from "../../blog/entities/blog.entity";
import {Exclude} from "class-transformer";

@Entity('users')
export class UsersEntity extends TypeOrmBaseEntity {
    @Column({type: 'varchar'})
    email: string;

    @Column({type: 'varchar'})
    @Exclude()
    password: string;

    @Column({type: 'varchar', nullable: true})
    displayName: string;

    @Column({type: 'varchar', nullable: true})
    avatar: string;

    @ManyToOne(() => RolesEntity)
    role: RolesEntity;

    @OneToMany(()=> BlogEntity, (blog) => blog.author)
    blogs: BlogEntity

    constructor(partial: Partial<UsersEntity>) {
        super()
        Object.assign(this, partial);
    }
}