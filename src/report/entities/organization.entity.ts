import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '@src/common/entities/base.entity';
import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { OrganizationType } from '../types/organization-type.types';
import { Report } from './report.entity';

@Entity()
export class Organization extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @ApiProperty({
    description: 'Type of the organization',
    enum: OrganizationType,
    example: OrganizationType.OA,
  })
  @Column({ type: 'enum', enum: OrganizationType, enumName: 'organization_type_enum' })
  type: OrganizationType;

  @OneToMany(() => Report, (report) => report.organization)
  reports: Relation<Report>[];
}
