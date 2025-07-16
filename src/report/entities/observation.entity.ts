import { ApiProperty } from '@nestjs/swagger';
import { SoftDeleteEntity } from '@src/common/entities/soft-delete.entity';
import { Part } from '@src/location/entities/part.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, Relation } from 'typeorm';
import { ObservationStatus } from '../types/observation-status.types';
import { ObservationFile } from './observation-file.entity';
import { Report } from './report.entity';

@Entity()
export class Observation extends SoftDeleteEntity {
  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  comment: string | null;

  @Column()
  reference: string;

  @Column({ type: 'character varying', nullable: true })
  location: string | null;

  @Column({ type: 'smallint', nullable: true })
  priority: number | null;

  @ApiProperty({
    description: 'Status of the observation',
    enum: ObservationStatus,
    example: ObservationStatus.FINISHED,
  })
  @Column({ type: 'enum', enum: ObservationStatus, enumName: 'report_status_enum' })
  status: ObservationStatus;

  @Column({ type: 'timestamptz', nullable: true })
  startedAt: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  endedAt: Date | null;

  @ManyToOne(() => Report, (report) => report.observations, { nullable: false })
  report: Relation<Report>;

  @ManyToMany(() => Part, (part) => part.observations)
  parts: Relation<Part>[];

  @OneToMany(() => ObservationFile, (file) => file.observation)
  files: Relation<ObservationFile>[];
}
