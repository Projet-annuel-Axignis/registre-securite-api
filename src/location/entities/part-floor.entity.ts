import { ApiProperty } from '@nestjs/swagger';
import { SoftDeleteEntity } from '@src/common/entities/soft-delete.entity';
import { Column, Entity, ManyToOne, OneToMany, Relation } from 'typeorm';
import { BuildingFloor } from './building-floor.entity';
import { Lot } from './lot.entity';
import { Part } from './part.entity';

@Entity()
export class PartFloor extends SoftDeleteEntity {
  @ApiProperty({ description: 'Name of the part floor' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Level of the floor based on part' })
  @Column({ type: 'smallint', default: 1 })
  levelNumber: number;

  @ApiProperty({ description: 'Max number of public that can be accommodated' })
  @Column({ type: 'integer' })
  publicCount: number;

  @ApiProperty({ description: 'Max number of staff members that can be accommodated' })
  @Column({ type: 'integer' })
  staffCount: number;

  @ApiProperty({ description: 'Exploitation surface of the part floor' })
  @Column({ type: 'float' })
  exploitationSurface: number;

  @ApiProperty({ description: 'GLA surface of the part floor' })
  @Column({ type: 'float' })
  glaSurface: number;

  @ApiProperty({ description: 'Public access surface of the part floor' })
  @Column({ type: 'float' })
  publicAccessSurface: number;

  @ManyToOne(() => Part, (part) => part.partFloors)
  part: Relation<Part>;

  @Column()
  partId: number;

  @OneToMany(() => Lot, (lot) => lot.partFloor)
  lots: Relation<Lot>[];

  @ManyToOne(() => BuildingFloor, (buildingFloor) => buildingFloor.partFloors)
  buildingFloor: Relation<BuildingFloor>;
}
