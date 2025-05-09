import { ApiProperty } from '@nestjs/swagger';
import { SoftDeleteEntity } from '@src/common/entities/soft-delete.entity';
import { Column, Entity, ManyToOne, OneToMany, Relation } from 'typeorm';
import { Building } from './building.entity';
import { Lot } from './lot.entity';
import { PartFloor } from './part-floor.entity';

@Entity()
export class BuildingFloor extends SoftDeleteEntity {
  @ApiProperty({ description: 'Name of the building floor' })
  @Column()
  name: string;

  @ManyToOne(() => Building, (building) => building.BuildingFloors)
  building: Relation<Building>;

  @OneToMany(() => Lot, (lot) => lot.buildingFloor)
  lots: Relation<Lot>[];

  @OneToMany(() => PartFloor, (partFloor) => partFloor.buildingFloor)
  partFloors: Relation<PartFloor>[];
}
