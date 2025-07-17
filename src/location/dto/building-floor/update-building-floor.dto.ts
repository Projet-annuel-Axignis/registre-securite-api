import { ApiTags, OmitType, PartialType } from '@nestjs/swagger';
import { CreateBuildingFloorDto } from './create-building-floor.dto';

@ApiTags('Location', 'BuildingFloor')
export class UpdateBuildingFloorDto extends PartialType(OmitType(CreateBuildingFloorDto, ['buildingId'])) {}
