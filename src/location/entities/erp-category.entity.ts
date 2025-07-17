import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryColumn, Relation } from 'typeorm';
import { Building } from './building.entity';

@Entity()
export class ErpCategory {
  @ApiProperty({ type: 'integer', description: 'Number of the category', example: 1 })
  @PrimaryColumn({ type: 'integer' })
  category: number;

  @ApiProperty({ type: 'integer', description: 'Group of the category', example: 1 })
  @Column({ type: 'integer' })
  group: number;

  @ApiProperty({ description: 'Description of the ERP category' })
  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => Building, (building) => building.erpCategory)
  buildings: Relation<Building>[];
}
