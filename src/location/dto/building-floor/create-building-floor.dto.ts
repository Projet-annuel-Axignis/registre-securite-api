import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@ApiTags('Location', 'BuildingFloor')
export class CreateBuildingFloorDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Level of the floor based on building', default: 1 })
  @IsInt()
  @IsOptional()
  levelNumber?: number;

  @ApiProperty()
  @IsInt()
  buildingId: number;
}
