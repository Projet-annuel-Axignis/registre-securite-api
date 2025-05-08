import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SoftDeleteEntity } from '@src/common/entities/soft-delete.entity';
import { Company } from '@src/users/entities/company.entity';
import { Column, Entity, ManyToOne, Relation } from 'typeorm';

@Entity()
export class Site extends SoftDeleteEntity {
  @ApiProperty({ description: 'Name of the site', example: 'Centre commercial la Part Dieu' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Number of the street in the address', example: '17' })
  @Column()
  streetNumber: string;

  @ApiProperty({ description: 'Street in address', example: 'Rue Dr Bouchut' })
  @Column()
  street: string;

  @ApiProperty({ description: 'Postal code in address', example: '69003' })
  @Column()
  postalCode: number;

  @ApiProperty({ description: 'City in address', example: 'Lyon' })
  @Column()
  city: string;

  @ApiPropertyOptional({ description: 'Internal identity number' })
  @Column({ nullable: true })
  reference?: string;

  @ManyToOne(() => Company, (company) => company.sites)
  company: Relation<Company>;
}
