import { ApiProperty } from '@nestjs/swagger';
import { Report } from '@src/report/entities/report.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn, Relation } from 'typeorm';
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
  @PrimaryColumn({ type: 'enum', enum: TypologyCode, enumName: 'typology_code_enum', unique: true })
  code: TypologyCode;

  @ApiProperty({ description: 'Description of the enum in french' })
  @Column()
  description: string;

  @ManyToMany(() => Building, (building) => building.typologies)
  buildings: Relation<Building>[];

  @OneToMany(() => Report, (report) => report.typology)
  reports: Relation<Report>[];
}
