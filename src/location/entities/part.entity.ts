import { ApiProperty } from '@nestjs/swagger';
import { SoftDeleteEntity } from '@src/common/entities/soft-delete.entity';
import { User } from '@src/users/entities/user.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, Relation } from 'typeorm';
import { HabFamilyName } from '../types/hab-family-name.types';
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
  @Column({
    type: 'enum',
    enum: HabFamilyName,
    enumName: 'hab_family_name_enum',
  })
  habFamily: Relation<HabFamily>;

  @ManyToOne(() => PartFloor, (partFloor) => partFloor.parts)
  partFloor: Relation<PartFloor>;

  @Column()
  partFloorId: number;

  @ManyToMany(() => User, (user) => user.parts)
  users: Relation<User>[];
}
