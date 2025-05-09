import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, PrimaryColumn, Relation } from 'typeorm';
import { IghClassCode } from '../types/igh-class.types';
import { Building } from './building.entity';

@Entity()
export class IghClass {
  @ApiProperty({
    enum: IghClassCode,
    example: IghClassCode.GHA,
    default: IghClassCode.GHA,
    description: 'Code of the IGH class',
  })
  @PrimaryColumn({ type: 'enum', enum: IghClassCode, unique: true })
  code: IghClassCode;

  @ApiProperty({ description: 'Description of the IGH class' })
  @Column({ type: 'text' })
  description: string;

  @ManyToMany(() => Building, (building) => building.ighClasses)
  buildings: Relation<Building>[];
}
