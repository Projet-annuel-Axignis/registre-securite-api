import { ApiProperty } from '@nestjs/swagger';
import { SoftDeleteEntity } from '@src/common/entities/soft-delete.entity';
import { Column, Entity, ManyToOne, Relation } from 'typeorm';
import { BuildingFloor } from './building-floor.entity';
import { Building } from './building.entity';
import { PartFloor } from './part-floor.entity';

@Entity()
export class Lot extends SoftDeleteEntity {
  @ApiProperty({ description: 'Name of the lot' })
  @Column()
  name: string;

  @ManyToOne(() => Building, (building) => building.lots, { nullable: false })
  building: Relation<Building>;

  @ManyToOne(() => BuildingFloor, (buildingFloor) => buildingFloor.lots)
  buildingFloor: Relation<BuildingFloor>;

  @ManyToOne(() => PartFloor, (partFloor) => partFloor.lots)
  partFloor: Relation<PartFloor>;
}
