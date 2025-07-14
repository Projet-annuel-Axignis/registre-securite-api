import { ApiTags, OmitType, PartialType } from '@nestjs/swagger';
import { CreateSiteDto } from './create-site.dto';

@ApiTags('Location', 'Site')
export class UpdateSiteDto extends PartialType(OmitType(CreateSiteDto, ['companyId'])) {}
