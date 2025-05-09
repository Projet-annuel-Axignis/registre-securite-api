import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, PrimaryColumn, Relation } from 'typeorm';
import { ErpTag } from '../types/erp-tag.types';
import { ErpTypeCode } from '../types/erp-type.types';
import { Part } from './part.entity';

@Entity()
export class ErpType {
  @ApiProperty({
    enum: ErpTypeCode,
    example: ErpTypeCode.L,
    description: 'Code of the ERP type',
  })
  @PrimaryColumn({ type: 'enum', enum: ErpTag, unique: true })
  code: ErpType;

  @ApiProperty({ description: 'Description of the IGH class' })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({
    enum: ErpTag,
    example: ErpTag.PARTICULAR,
    description: 'Tag of the ERP type',
  })
  @Column({ type: 'enum', enum: ErpTag })
  tag: ErpTag;

  @ManyToMany(() => Part, (part) => part.erpTypes)
  parts: Relation<Part>[];
}
