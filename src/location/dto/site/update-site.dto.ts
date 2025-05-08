import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateSiteDto } from './create-site.dto';

export class UpdateSiteDto extends PartialType(OmitType(CreateSiteDto, ['companyId'])) {}
