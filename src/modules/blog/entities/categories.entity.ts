import {Column, Entity} from "typeorm";
import {TypeOrmBaseEntity} from "../../../commons/abstract-entity/type-orm-base-entity.entity";

@Entity('categories')
export class CategoriesEntity extends TypeOrmBaseEntity{
    @Column('varchar')
    category: string
}