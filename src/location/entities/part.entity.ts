import { ApiProperty } from '@nestjs/swagger';
import { SoftDeleteEntity } from '@src/common/entities/soft-delete.entity';
import { Intervention } from '@src/intervention/entities/intervention.entity';
import { Observation } from '@src/report/entities/observation.entity';
import { Report } from '@src/report/entities/report.entity';
import { User } from '@src/users/entities/user.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, Relation } from 'typeorm';
import { PartType } from '../types/part-type.types';
import { Building } from './building.entity';
import { ErpType } from './erp-type.entity';
import { HabFamily } from './hab-family.entity';
import { PartFloor } from './part-floor.entity';

@Entity()
export class Part extends SoftDeleteEntity {
  @ApiProperty({ description: 'Name of the part', example: 'Apple Store' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Defined if building part is ICPE' })
  @Column({ default: false })
  isIcpe: boolean;

  @ApiProperty({ enum: PartType, example: PartType.PRIVATE })
  @Column({ type: 'enum', enum: PartType })
  type: PartType;

  @ManyToOne(() => Building, (building) => building.parts)
  building: Relation<Building>;

  @ManyToMany(() => ErpType, (erpType) => erpType.parts)
  @JoinTable({
    name: 'part_erp_type',
    joinColumn: {
      name: 'part_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'erp_type_code',
      referencedColumnName: 'code',
    },
  })
  erpTypes: Relation<ErpType>[];

  @ManyToOne(() => HabFamily, (habFamily) => habFamily.parts)
  @JoinColumn({ name: 'hab_family_name' })
  habFamily: Relation<HabFamily>;

  @OneToMany(() => PartFloor, (partFloor) => partFloor.part)
  partFloors: Relation<PartFloor>[];

  @ManyToMany(() => User, (user) => user.parts)
  users: Relation<User>[];

  @ManyToMany(() => Report, (report) => report.parts)
  reports: Relation<Report>[];

  @ManyToMany(() => Intervention, (intervention) => intervention.parts)
  @JoinTable()
  interventions: Relation<Intervention>[];

  @ManyToMany(() => Observation, (observation) => observation.parts)
  @JoinTable()
  observations: Relation<Observation>[];
}
