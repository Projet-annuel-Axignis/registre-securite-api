import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, PrimaryColumn, Relation } from 'typeorm';
import { ErpTypeTag } from '../types/erp-tag.types';
import { ErpTypeCode } from '../types/erp-type.types';
import { Part } from './part.entity';

@Entity()
export class ErpType {
  @ApiProperty({
    enum: ErpTypeCode,
    example: ErpTypeCode.L,
    description: 'Code of the ERP type',
  })
  @PrimaryColumn({ type: 'enum', enum: ErpTypeCode, enumName: 'erp_type_code_enum', unique: true })
  code: ErpTypeCode;

  @ApiProperty({ description: 'Description of the IGH class' })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({
    enum: ErpTypeTag,
    example: ErpTypeTag.PARTICULAR,
    description: 'Tag of the ERP type',
  })
  @Column({ type: 'enum', enum: ErpTypeTag })
  tag: ErpTypeTag;

  @ManyToMany(() => Part, (part) => part.erpTypes)
  parts: Relation<Part>[];
}
