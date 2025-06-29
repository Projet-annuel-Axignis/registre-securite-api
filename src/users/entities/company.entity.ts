import { ApiProperty } from '@nestjs/swagger';
import { SoftDeleteEntity } from '@src/common/entities/soft-delete.entity';
import { Site } from '@src/location/entities/site.entity';
import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { Plan } from './plan.entity';
import { User } from './user.entity';

@Entity()
export class Company extends SoftDeleteEntity {
  @ApiProperty({ description: 'Name of the company', example: 'Société Axignis' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Siret of the company', example: '12345678901234' })
  @Column({ unique: true })
  siretNumber: string;

  @OneToMany(() => User, (user) => user.company)
  users: Relation<User>[];

  @OneToMany(() => Plan, (plan) => plan.company)
  plans: Relation<Plan>[];

  @OneToMany(() => Site, (site) => site.company)
  sites: Relation<Site>[];
}
