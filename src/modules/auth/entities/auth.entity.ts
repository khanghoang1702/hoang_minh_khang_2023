import {Column, Entity, OneToMany, OneToOne} from 'typeorm';
import {TypeOrmBaseEntity} from "../../../commons/abstract-entity/type-orm-base-entity.entity";
import {BlogEntity} from "../../blog/entities/blog.entity";
import {UsersEntity} from "../../users/entities/users.entity";

@Entity('auth')
export class AuthEntity extends TypeOrmBaseEntity {
    @Column({type: 'varchar'})
    accessToken: string;

    @Column({type: 'varchar', nullable: true})
    refreshToken: string;

    @OneToOne(() => UsersEntity, (user) => user.id)
    user: UsersEntity;
}