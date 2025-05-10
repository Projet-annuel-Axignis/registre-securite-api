import { ApiProperty } from '@nestjs/swagger';
import { SoftDeleteEntity } from '@src/common/entities/soft-delete.entity';
import { User } from '@src/users/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, Relation } from 'typeorm';
import { BuildingFloor } from './building-floor.entity';
import { ErpCategory } from './erp-category.entity';
import { IghClass } from './igh-class.entity';
import { Part } from './part.entity';
import { Site } from './site.entity';
import { Typology } from './typology.entity';

@Entity()
export class Building extends SoftDeleteEntity {
  @ApiProperty({ description: 'Name of the building', example: 'Bâtiment A' })
  @Column()
  name: string;

  @ManyToOne(() => Site, (site) => site.buildings)
  site: Relation<Site>;

  @ManyToMany(() => Typology, (typology) => typology.buildings)
  @JoinTable({
    name: 'building_typology',
    joinColumn: {
      name: 'building_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'typology_code',
      referencedColumnName: 'code',
    },
  })
  typologies: Relation<Typology>[];

  @ManyToMany(() => IghClass, (ighClass) => ighClass.buildings)
  @JoinTable({
    name: 'building_igh_class',
    joinColumn: {
      name: 'building_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'igh_class_code',
      referencedColumnName: 'code',
    },
  })
  ighClasses: Relation<IghClass>[];

  @ManyToOne(() => ErpCategory, (erpCategory) => erpCategory.buildings)
  erpCategory: Relation<ErpCategory>;

  @OneToMany(() => Part, (part) => part.building)
  parts: Relation<Part>[];

  @OneToMany(() => BuildingFloor, (buildingFloor) => buildingFloor.building)
  BuildingFloors: Relation<BuildingFloor>[];

  @ManyToMany(() => User, (user) => user.buildings)
  users: Relation<User>[];
}
