import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateBuildingFloorDto } from './create-building-floor.dto';

export class UpdateBuildingFloorDto extends PartialType(OmitType(CreateBuildingFloorDto, ['buildingId'])) {}
