import { ApiProperty } from '@nestjs/swagger';
import { ProductDocumentResponse } from './product-document-response.types';
import { DocumentStatus } from './document-status.types';

export class ProductDocumentSwaggerResponse extends ProductDocumentResponse {
  @ApiProperty({ description: 'Status of the document', example: 'PUBLISHED' })
  declare status: DocumentStatus;
}
