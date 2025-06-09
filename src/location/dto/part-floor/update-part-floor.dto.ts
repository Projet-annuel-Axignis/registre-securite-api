import { PartialType } from '@nestjs/swagger';
import { CreatePartFloorDto } from './create-part-floor.dto';

export class UpdatePartFloorDto extends PartialType(CreatePartFloorDto) {}
