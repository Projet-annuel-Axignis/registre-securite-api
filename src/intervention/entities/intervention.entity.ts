import { ApiProperty } from '@nestjs/swagger';
import { SoftDeleteEntity } from '@src/common/entities/soft-delete.entity';
import { User } from '@src/users/entities/user.entity';
import { Column, Entity, ManyToOne, Relation } from 'typeorm';
import { InterventionStatus } from '../types/intervention-status.types';
import { Periodicity } from '../types/periodicity.types';
import { InterventionType } from './intervention-type.entity';

@Entity()
export class Intervention extends SoftDeleteEntity {
  @ApiProperty({
    description: 'Label or title of the intervention',
    example: 'Vérification sécurité incendie',
  })
  @Column()
  label: string;

  @ApiProperty({
    description: 'Name of the company where the intervention takes place',
    example: 'Entreprise ABC',
  })
  @Column()
  companyName: string;

  @ApiProperty({
    description: 'Name of the employee responsible for the intervention',
    example: 'Jean Dupont',
  })
  @Column()
  employeeName: string;

  @ApiProperty({
    description: 'Current status of the intervention',
    enum: InterventionStatus,
    example: InterventionStatus.PLANNED,
  })
  @Column({ type: 'enum', enum: InterventionStatus, enumName: 'intervention_status_enum' })
  status: InterventionStatus;

  @ApiProperty({
    description: 'Frequency of the intervention',
    enum: Periodicity,
    example: Periodicity.ANNUAL,
  })
  @Column({ type: 'enum', enum: Periodicity, enumName: 'intervention_periodicity_enum' })
  periodicity: Periodicity;

  @ApiProperty({
    description: 'Planned date and time for the intervention',
    example: '2024-06-15T09:00:00.000Z',
  })
  @Column({ type: 'timestamptz', nullable: true })
  plannedAt: Date | null;

  @ApiProperty({
    description: 'Actual start date and time of the intervention',
    example: '2024-06-15T09:30:00.000Z',
  })
  @Column({ type: 'timestamptz', nullable: true })
  startedAt: Date | null;

  @ApiProperty({
    description: 'Actual end date and time of the intervention',
    example: '2024-06-15T11:00:00.000Z',
  })
  @Column({ type: 'timestamptz', nullable: true })
  endedAt: Date | null;

  @ApiProperty({
    description: 'Type of intervention',
    type: () => InterventionType,
  })
  @ManyToOne(() => InterventionType, (type) => type.interventions, { nullable: false })
  type: Relation<InterventionType>;

  @ApiProperty({
    description: 'User who terminated the intervention',
    type: () => User,
    required: false,
    nullable: true,
  })
  @ManyToOne(() => User, (user) => user.interventions)
  terminatedBy: Relation<User> | null;
}
