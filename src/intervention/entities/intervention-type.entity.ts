import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '@src/common/entities/base.entity';
import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { Intervention } from './intervention.entity';

@Entity()
export class InterventionType extends BaseEntity {
  @ApiProperty({
    description: 'Unique code identifier for the intervention type. Used as primary key',
    example: 'regulatory_audit',
  })
  @Column({ unique: true })
  code: string;

  @ApiProperty({
    description: 'French name/description of the intervention type',
    example: 'Vérification réglementaire',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'List of interventions of this type',
    type: () => [Intervention],
    isArray: true,
  })
  @OneToMany(() => Intervention, (intervention) => intervention.type)
  interventions: Relation<Intervention>[];
}
