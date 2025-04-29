import { ApiProperty } from '@nestjs/swagger';
import { ActivityLog } from '@src/activity-logger/entities/activity-logger.entity';
import { SoftDeleteEntity } from '@src/common/entities/soft-delete.entity';
import { Column, Entity, ManyToOne, OneToMany, Relation } from 'typeorm';
import { Customer } from './customer.entity';
import { Role } from './role.entity';

@Entity()
export class User extends SoftDeleteEntity {
  @ApiProperty({ description: 'First name of the user', example: 'John' })
  @Column()
  firstName: string;

  @ApiProperty({ description: 'Last name of the user', example: 'Doe' })
  @Column()
  lastName: string;

  @ApiProperty({ description: 'Email of the user', uniqueItems: true })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ description: 'Hashed password of the user' })
  @Column({ select: false })
  password: string;

  @ApiProperty({ type: () => Role })
  @ManyToOne(() => Role, (role) => role.users)
  role: Relation<Role>;

  @ApiProperty({ type: () => Customer })
  @ManyToOne(() => Customer, (customer) => customer.users)
  customer: Relation<Customer>;

  @ApiProperty({ nullable: true, type: () => ActivityLog })
  @OneToMany(() => ActivityLog, (log) => log.user)
  logs: Relation<ActivityLog[]>;
}
