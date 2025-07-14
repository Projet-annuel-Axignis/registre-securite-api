import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

@ApiTags('Location', 'PartFloor')
export class CreatePartFloorDto {
  @ApiProperty({ description: 'Name of the part floor' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Level of the floor based on part', example: 1 })
  @IsInt()
  @IsPositive()
  levelNumber: number;

  @ApiProperty({ description: 'Max number of public that can be accommodated' })
  @IsInt()
  @IsPositive()
  publicCount: number;

  @ApiProperty({ description: 'Max number of staff members that can be accommodated' })
  @IsInt()
  @IsPositive()
  staffCount: number;

  @ApiProperty({ description: 'Exploitation surface of the part floor' })
  @IsNumber()
  @IsPositive()
  exploitationSurface: number;

  @ApiProperty({ description: 'GLA surface of the part floor' })
  @IsNumber()
  @IsPositive()
  glaSurface: number;

  @ApiProperty({ description: 'Public access surface of the part floor' })
  @IsNumber()
  @IsPositive()
  publicAccessSurface: number;

  @ApiProperty({ description: 'Building floor ID' })
  @IsInt()
  @IsPositive()
  buildingFloorId: number;

  @ApiProperty({ description: 'Part ID' })
  @IsInt()
  @IsPositive()
  partId: number;
}
