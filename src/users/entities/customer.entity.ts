import { ApiProperty } from '@nestjs/swagger';
import { SoftDeleteEntity } from '@src/common/entities/soft-delete.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, Relation } from 'typeorm';
import { Plan } from './plan.entity';
import { User } from './user.entity';

@Entity()
export class Customer extends SoftDeleteEntity {
  @ApiProperty({ description: 'Name of the customer', example: 'Société Axignis' })
  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.customer)
  users: Relation<User>[];

  @OneToOne(() => Plan, (plan) => plan.customer)
  @JoinColumn()
  plan: Relation<Plan>;
}
