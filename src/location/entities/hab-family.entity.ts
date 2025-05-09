import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryColumn, Relation } from 'typeorm';
import { HabFamilyName } from '../types/hab-family-name.types';
import { Part } from './part.entity';

@Entity()
export class HabFamily {
  @ApiProperty({
    enum: HabFamilyName,
    example: HabFamilyName.FIRST_FAMILY_SINGLE,
    description: 'Name of the HAB family',
  })
  @PrimaryColumn({ type: 'enum', enum: HabFamilyName, unique: true })
  name: HabFamilyName;

  @ApiProperty({ description: 'Description of the HAB family' })
  @Column()
  description: string;

  @OneToMany(() => Part, (part) => part.habFamily)
  parts: Relation<Part>[];
}
