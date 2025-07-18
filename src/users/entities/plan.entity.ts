import { ApiProperty } from '@nestjs/swagger';
import { SoftDeleteEntity } from '@src/common/entities/soft-delete.entity';
import { Column, Entity, ManyToOne, Relation } from 'typeorm';
import { PlanType } from '../types/plan.type';
import { Company } from './company.entity';

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

  @ApiProperty({ nullable: true, example: 'Foo' })
  @Column({ type: 'text', nullable: true })
  comment?: string | null;

  @ManyToOne(() => Company, (company) => company.plans)
  company: Relation<Company>;
}
