import { BaseEntity } from '@src/common/entities/base.entity';
import { Column, Entity, ManyToOne, Relation } from 'typeorm';
import { Report } from './report.entity';

@Entity()
export class ReportFile extends BaseEntity {
  @ManyToOne(() => Report, (report) => report.files)
  report: Relation<Report>;

  @Column()
  fileId: number;
}
