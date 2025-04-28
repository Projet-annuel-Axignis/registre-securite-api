import { ApiProperty } from '@nestjs/swagger';
import { ActivityLog } from '@src/activity-logger/entities/activity-logger.entity';
import { SoftDeleteEntity } from '@src/common/entities/soft-delete.entity';
import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { Role } from '../types/role.types';

@Entity()
export class User extends SoftDeleteEntity {
  @ApiProperty({ description: 'Name of the user', example: 'Registre de sécurité' })
  @Column({ unique: true })
  name: string;

  @ApiProperty({ description: 'Secret used to log in' })
  @Column({ unique: true, select: false })
  apiKey: string;

  @ApiProperty({ description: 'Role of the user', enum: Role, example: Role.ADMINISTRATOR })
  @Column({ type: 'enum', enum: Role })
  role: Role;

  @ApiProperty({ nullable: true, type: () => ActivityLog })
  @OneToMany(() => ActivityLog, (log) => log.user)
  logs: Relation<ActivityLog[]>;
}
