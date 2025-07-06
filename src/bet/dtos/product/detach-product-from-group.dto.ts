import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class DetachProductFromGroupDto {
  @ApiProperty({ description: 'ID of the product to detach', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @ApiProperty({ description: 'ID of the compatibility group to detach from', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  groupId: number;
}
