import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateInventoryItemDto {
  @ApiProperty({ description: 'Location of the inventory item' })
  @IsString()
  location: string;

  @ApiProperty({ description: 'Date of the request (commission)' })
  @IsDateString()
  commissioningDate: Date;

  @ApiProperty({ description: 'Extra data for the inventory item' })
  @IsObject()
  extraValues: object;

  @ApiProperty({ description: 'ID of the equipment type (optional)', required: false })
  @IsOptional()
  @IsNumber()
  equipmentTypeId?: number;

  @ApiProperty({ description: 'ID of the product (optional)', required: false })
  @IsOptional()
  @IsNumber()
  productId?: number;

  @ApiProperty({ description: 'ID of the brand (optional)', required: false })
  @IsOptional()
  @IsNumber()
  brandId?: number;
}
