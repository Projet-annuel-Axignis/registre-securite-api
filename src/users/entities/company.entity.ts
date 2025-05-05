import { ApiProperty } from '@nestjs/swagger';
import { SoftDeleteEntity } from '@src/common/entities/soft-delete.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, Relation } from 'typeorm';
import { Plan } from './plan.entity';
import { User } from './user.entity';

@Entity()
export class Company extends SoftDeleteEntity {
  @ApiProperty({ description: 'Name of the company', example: 'Société Axignis' })
  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.company)
  users: Relation<User>[];

  @OneToOne(() => Plan, (plan) => plan.company)
  @JoinColumn()
  plan: Relation<Plan>;
}
