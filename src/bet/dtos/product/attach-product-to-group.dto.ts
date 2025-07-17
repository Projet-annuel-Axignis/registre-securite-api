import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class AttachProductToGroupDto {
  @ApiProperty({ description: 'ID of the product to attach', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @ApiProperty({ description: 'ID of the compatibility group to attach to', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  groupId: number;
}
