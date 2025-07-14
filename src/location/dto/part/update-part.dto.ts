import { ApiTags, PartialType } from '@nestjs/swagger';
import { CreatePartDto } from './create-part.dto';

@ApiTags('Location', 'Part')
export class UpdatePartDto extends PartialType(CreatePartDto) {}
