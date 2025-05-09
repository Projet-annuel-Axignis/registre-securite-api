import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, PrimaryColumn, Relation } from 'typeorm';
import { TypologyCode } from '../types/typology-code.types';
import { Building } from './building.entity';

@Entity()
export class Typology {
  @ApiProperty({
    enum: TypologyCode,
    example: TypologyCode.ERP,
    default: TypologyCode.ERP,
    description: 'Code of the typology',
  })
  @PrimaryColumn({ type: 'enum', enum: TypologyCode, unique: true })
  code: TypologyCode;

  @ApiProperty({ description: 'Description of the enum in french' })
  @Column()
  description: string;

  @ManyToMany(() => Building, (building) => building.typologies)
  buildings: Relation<Building>[];
}
