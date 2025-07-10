import { SoftDeleteEntity } from '@src/common/entities/soft-delete.entity';
import { Intervention } from '@src/intervention/entities/intervention.entity';
import { Part } from '@src/location/entities/part.entity';
import { Typology } from '@src/location/entities/typology.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, Relation } from 'typeorm';
import { Observation } from './observation.entity';
import { Organization } from './organization.entity';
import { ReportFile } from './report-file.entity';
import { ReportType } from './report-type.entity';

@Entity()
export class Report extends SoftDeleteEntity {
  @Column()
  label: string;

  @ManyToOne(() => ReportType, (type) => type.reports, { nullable: false })
  type: Relation<ReportType>;

  @ManyToOne(() => Typology, (typology) => typology.reports)
  typology: Relation<Typology> | null;

  @ManyToOne(() => Organization, (organization) => organization.reports)
  organization: Relation<Organization> | null;

  @ManyToMany(() => Part, (part) => part.reports)
  @JoinTable()
  parts: Relation<Part>[];

  @ManyToOne(() => Intervention, (intervention) => intervention.reports)
  intervention: Relation<Intervention> | null;

  @OneToMany(() => Observation, (observation) => observation.report)
  observations: Relation<Observation>[];

  @OneToMany(() => ReportFile, (file) => file.report)
  files: Relation<ReportFile>[];
}
