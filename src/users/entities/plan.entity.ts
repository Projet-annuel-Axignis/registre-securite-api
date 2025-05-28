import { ApiProperty } from '@nestjs/swagger';
import { SoftDeleteEntity } from '@src/common/entities/soft-delete.entity';
import { Column, Entity, OneToOne, Relation } from 'typeorm';
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

  @ApiProperty({ description: 'Siret of the company', example: '12345678901234' })
  @Column()
  siretNumber: string;

  @ApiProperty({ example: '2025-04-17T10:00:00.303Z' })
  @Column({ type: 'timestamptz' })
  expiredAt: Date;

  @ApiProperty({ nullable: true, example: 'Foo' })
  @Column({ type: 'text', nullable: true })
  comment?: string | null;

  @OneToOne(() => Company, (company) => company.plan)
  company: Relation<Company>;
}
