import { ApiTags, PartialType } from '@nestjs/swagger';
import { CreatePartFloorDto } from './create-part-floor.dto';

@ApiTags('Location', 'PartFloor')
export class UpdatePartFloorDto extends PartialType(CreatePartFloorDto) {}
