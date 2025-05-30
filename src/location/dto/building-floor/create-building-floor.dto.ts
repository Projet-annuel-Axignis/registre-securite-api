import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateBuildingFloorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  buildingId: number;
}
