import {Column, Entity} from "typeorm";
import {TypeOrmBaseEntity} from "../../../commons/abstract-entity/type-orm-base-entity.entity";
import {Roles} from "../enums/roles.enum";

@Entity('roles')
export class RolesEntity extends TypeOrmBaseEntity {
    @Column({type: 'enum', enum: Roles})
    type: Roles
}