import { BaseEntity } from '@src/common/entities/base.entity';
import { Column, Entity, ManyToOne, Relation } from 'typeorm';
import { Report } from './report.entity';

@Entity()
export class ReportEquipment extends BaseEntity {
  @ManyToOne(() => Report, (report) => report.equipments)
  report: Relation<Report>;

  @Column()
  equipmentId: number;
}
