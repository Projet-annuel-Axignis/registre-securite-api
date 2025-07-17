import { ApiProperty } from '@nestjs/swagger';
import { ActivityLog } from '@src/activity-logger/entities/activity-logger.entity';
import { SoftDeleteEntity } from '@src/common/entities/soft-delete.entity';
import { Intervention } from '@src/intervention/entities/intervention.entity';
import { Building } from '@src/location/entities/building.entity';
import { Part } from '@src/location/entities/part.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, Relation } from 'typeorm';
import { Company } from './company.entity';
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

  @ApiProperty({ description: 'Phone number of the user' })
  @Column({ type: 'character varying', nullable: true })
  phoneNumber?: string | null;

  @ApiProperty({ type: () => Role })
  @ManyToOne(() => Role, (role) => role.users)
  role: Relation<Role>;

  @ApiProperty({ type: () => Company })
  @ManyToOne(() => Company, (company) => company.users)
  company: Relation<Company>;

  @ApiProperty({ nullable: true, type: () => ActivityLog })
  @OneToMany(() => ActivityLog, (log) => log.user)
  logs: Relation<ActivityLog[]>;

  @ManyToMany(() => Part, (part) => part.users)
  @JoinTable()
  parts: Relation<Part>[];

  @ManyToMany(() => Building, (building) => building.users)
  @JoinTable()
  buildings: Relation<Building>[];

  @OneToMany(() => Intervention, (intervention) => intervention.terminatedBy)
  interventions: Relation<Intervention>[];
}
