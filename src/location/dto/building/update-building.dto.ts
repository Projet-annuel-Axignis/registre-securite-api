import { ApiTags, OmitType, PartialType } from '@nestjs/swagger';
import { CreateBuildingDto } from './create-building.dto';

@ApiTags('Location', 'Building')
export class UpdateBuildingDto extends PartialType(OmitType(CreateBuildingDto, ['siteId'])) {}
