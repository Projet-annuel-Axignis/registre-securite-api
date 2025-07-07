import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Resources } from '@src/activity-logger/types/resource.types';
import { Roles } from '@src/auth/decorators/role.decorator';
import { GetUser } from '@src/auth/decorators/user.decorator';
import { JwtAuthGuard } from '@src/auth/guards/jwt.guard';
import { RolesGuard } from '@src/auth/guards/role.guard';
import { LoggedUser } from '@src/auth/types/logged-user.type';
import { SwaggerFailureResponse } from '@src/common/helpers/common-set-decorators.helper';
import { RoleType } from '@src/users/types/role.types';
import { Response } from 'express';
import { UploadProductDocumentDto } from '../dtos/product/upload-product-document.dto';
import {
  SwaggerProductDocumentDownload,
  SwaggerProductDocumentFindAllByProduct,
  SwaggerProductDocumentFindOne,
  SwaggerProductDocumentFindOneBySerialNumber,
  SwaggerProductDocumentSoftDelete,
  SwaggerProductDocumentUpdateStatus,
  SwaggerProductDocumentUpload,
  SwaggerProductDocumentValidateChecksum,
} from '../helpers/product-document-set-decorators.helper';
import { ProductDocumentService } from '../services/product-document.service';
import { DocumentStatus } from '../types/product/document-status.types';
import { ProductDocumentResponse } from '../types/product/product-document-response.types';

interface MulterFile {
  originalName: string;
  buffer: Buffer;
  mimetype: string;
}

@ApiTags(Resources.PRODUCT)
@SwaggerFailureResponse()
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller({ path: 'product-documents', version: ['1'] })
export class ProductDocumentController {
  constructor(private readonly productDocumentService: ProductDocumentService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'File to upload',
        },
        serialNumber: {
          type: 'string',
          description: 'Serial number of the document',
          example: 'DOC-2024-001',
        },
        fileName: {
          type: 'string',
          description: 'Name of the uploaded file',
          example: 'user-manual.pdf',
        },
        size: {
          type: 'number',
          description: 'Size of the file in bytes',
          example: 1024000,
        },
        mimeType: {
          type: 'string',
          description: 'MIME type of the file',
          example: 'application/pdf',
        },
        checksum: {
          type: 'string',
          description: 'File checksum for integrity verification',
          example: 'sha256:abc123...',
        },
        issueDate: {
          type: 'string',
          format: 'date-time',
          description: 'Issue date of the document',
          example: '2024-01-15T00:00:00.000Z',
        },
        expiryDate: {
          type: 'string',
          format: 'date-time',
          description: 'Expiry date of the document',
          example: '2025-01-15T00:00:00.000Z',
        },
        version: {
          type: 'number',
          description: 'Version number of the document',
          example: 1,
        },
        typeId: {
          type: 'number',
          description: 'ID of the document type',
          example: 1,
        },
        productIds: {
          type: 'array',
          items: { type: 'number' },
          description: 'Array of product IDs to associate with this document',
          example: [1, 2, 3],
        },
        reference: {
          type: 'string',
          description: 'Reference for the document',
          example: 'REF-2024-001',
        },
        status: {
          type: 'string',
          enum: Object.values(DocumentStatus),
          description: 'Status of the document',
          example: DocumentStatus.PUBLISHED,
        },
      },
      required: ['file', 'serialNumber', 'fileName', 'size', 'issueDate', 'version', 'typeId', 'productIds'],
    },
  })
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerProductDocumentUpload()
  async uploadDocument(
    @UploadedFile() file: MulterFile,
    @Body() uploadDto: UploadProductDocumentDto,
    @GetUser() user: LoggedUser,
  ): Promise<ProductDocumentResponse> {
    return await this.productDocumentService.uploadDocument(uploadDto, file, user.id);
  }

  @Get(':id')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerProductDocumentFindOne()
  async findOneDocumentById(@Param('id', ParseIntPipe) id: number): Promise<ProductDocumentResponse> {
    return await this.productDocumentService.findOneDocumentById(id);
  }

  @Get('serial/:serialNumber')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerProductDocumentFindOneBySerialNumber()
  async findOneDocumentBySerialNumber(@Param('serialNumber') serialNumber: string): Promise<ProductDocumentResponse> {
    return await this.productDocumentService.findOneDocumentBySerialNumber(serialNumber);
  }

  @Get('product/:productId')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerProductDocumentFindAllByProduct()
  async findDocumentsByProductId(
    @Param('productId', ParseIntPipe) productId: number,
  ): Promise<ProductDocumentResponse[]> {
    return await this.productDocumentService.findDocumentsByProductId(productId);
  }

  @Get(':id/file')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerProductDocumentDownload()
  async downloadDocumentFile(@Param('id', ParseIntPipe) id: number, @Res() res: Response): Promise<void> {
    const fileData = await this.productDocumentService.downloadDocumentFile(id);

    res.set({
      'Content-Type': fileData.mimeType,
      'Content-Disposition': `attachment; filename="${fileData.fileName}"`,
    });

    res.send(fileData.buffer);
  }

  @Patch(':id/status')
  @Roles(RoleType.ADMINISTRATOR)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: Object.values(DocumentStatus),
          description: 'New status for the document',
        },
      },
      required: ['status'],
    },
  })
  @SwaggerProductDocumentUpdateStatus()
  async updateDocumentStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: DocumentStatus,
  ): Promise<ProductDocumentResponse> {
    return await this.productDocumentService.updateDocumentStatus(id, status);
  }

  @Delete(':id')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerProductDocumentSoftDelete()
  async deleteDocument(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.productDocumentService.deleteDocument(id);
  }

  @Get(':id/validate-checksum')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerProductDocumentValidateChecksum()
  async validateDocumentChecksum(@Param('id', ParseIntPipe) id: number): Promise<{ isValid: boolean }> {
    return await this.productDocumentService.validateDocumentChecksum(id);
  }
}
