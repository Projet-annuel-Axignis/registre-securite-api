import { ApiProperty } from '@nestjs/swagger';
import { SoftDeleteEntity } from '@src/common/entities/soft-delete.entity';
import { Column, Entity, OneToOne, Relation } from 'typeorm';
import { PlanType } from '../types/plan.type';
import { Customer } from './customer.entity';

@Entity()
export class Plan extends SoftDeleteEntity {
  @ApiProperty({
    enum: PlanType,
    example: PlanType.SELF_MANAGE,
    default: PlanType.SELF_MANAGE,
    description: 'Type of the plan',
  })
  @Column({ type: 'enum', enum: PlanType, default: PlanType.SELF_MANAGE })
  type: PlanType;

  @ApiProperty({ example: '2025-04-17T10:00:00.303Z' })
  @Column({ type: 'timestamptz' })
  expiredAt: Date;

  @OneToOne(() => Customer, (customer) => customer.plan)
  customer: Relation<Customer>;
}
