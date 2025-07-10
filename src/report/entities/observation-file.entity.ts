import { BaseEntity } from '@src/common/entities/base.entity';
import { Column, Entity, ManyToOne, Relation } from 'typeorm';
import { Observation } from './observation.entity';

@Entity()
export class ObservationFile extends BaseEntity {
  @ManyToOne(() => Observation, (observation) => observation.files)
  observation: Relation<Observation>;

  @Column()
  fileId: number;
}
