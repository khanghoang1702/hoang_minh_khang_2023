import {Column, Entity, JoinTable, ManyToOne} from 'typeorm';
import {TypeOrmBaseEntity} from "../../../commons/abstract-entity/type-orm-base-entity.entity";
import {RolesEntity} from "./roles.entity";

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

    @ManyToOne(() => RolesEntity)
    role: RolesEntity;
}