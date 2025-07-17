import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '@src/common/entities/base.entity';
import { Periodicity } from '@src/intervention/types/periodicity.types';
import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { Report } from './report.entity';

@Entity()
export class ReportType extends BaseEntity {
  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @ApiProperty({
    description: 'Frequency of the intervention',
    enum: Periodicity,
    example: Periodicity.ANNUAL,
  })
  @Column({ type: 'enum', enum: Periodicity, enumName: 'intervention_periodicity_enum' })
  periodicity: Periodicity;

  @OneToMany(() => Report, (report) => report.type)
  reports: Relation<Report>[];
}
