import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { ApiConfigService } from '@src/config/services/api-config.service';
import { AxiosError, AxiosResponse } from 'axios';
import { UploadProductDocumentDto } from '../dtos/product/upload-product-document.dto';
import { DocumentStatus } from '../types/product/document-status.types';
import { ChecksumValidationResponse, FileDownloadResponse } from '../types/product/file.types';
import { MulterFile } from '../types/product/multer-file.types';
import { ProductDocumentResponse, UploadDocumentResponse } from '../types/product/product-document-response.types';
import { AbstractBetService, BetApiErrorResponse } from './abstract-bet.service';

/**
 * Type guard to check if an object is a BET API error response
 */
function isBetApiErrorResponse(obj: unknown): obj is BetApiErrorResponse {
  return obj !== null && typeof obj === 'object' && 'statusCode' in obj && 'message' in obj && 'error' in obj;
}

/**
 * Type guard to check if an error is an Axios error with response data
 */
function isAxiosErrorWithResponse(error: unknown): error is AxiosError<BetApiErrorResponse> {
  return error instanceof AxiosError && error.response !== undefined && error.response.data !== undefined;
}

@Injectable()
export class ProductDocumentService extends AbstractBetService {
  constructor(
    protected readonly configService: ApiConfigService,
    protected readonly httpService: HttpService,
  ) {
    super(configService, httpService);
  }

  // Product Document Methods
  async uploadDocument(
    uploadDto: UploadProductDocumentDto,
    file: MulterFile,
    uploadedByUserId?: number,
  ): Promise<UploadDocumentResponse> {
    // Create form data for file upload
    const formData = new FormData();
    formData.append('file', new Blob([file.buffer], { type: file.mimetype }), file.originalname);

    // Add all other fields to form data with proper type handling
    Object.entries(uploadDto).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        // Handle arrays (like productIds) - keep as numbers
        value.forEach((item) => formData.append(key, item.toString()));
      } else if (value !== undefined) {
        // Convert numbers to strings for FormData, but keep the original type for validation
        if (typeof value === 'number') {
          formData.append(key, value.toString());
        } else {
          formData.append(key, value);
        }
      }
    });

    // Add user ID if provided
    if (uploadedByUserId) {
      formData.append('uploadedByUserId', uploadedByUserId.toString());
    }

    // Use base provider service directly for file upload with custom headers
    try {
      const response: AxiosResponse<ProductDocumentResponse> = await this.httpService.axiosRef.post(
        `${this.configService.get('apis.bet.base_url')}/product-documents/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-API-Key': this.configService.get('apis.bet.api_key'),
          },
        },
      );
      return response.data;
    } catch (error: unknown) {
      // If it's an Axios error with response data, handle BET API errors
      if (error instanceof AxiosError && error.response?.data) {
        const betError = error.response.data as BetApiErrorResponse;

        // If it's a BET API error response with statusCode, throw HTTP exception
        if (isBetApiErrorResponse(betError)) {
          throw new HttpException(betError, error.response.status);
        }

        // For other BET API errors, throw with the original status code
        throw new HttpException(betError, error.response.status);
      }

      // For other errors, re-throw them
      throw error;
    }
  }

  async findOneDocumentById(id: number): Promise<ProductDocumentResponse> {
    return this.makeBetRequest<ProductDocumentResponse>({
      method: 'GET',
      endpoint: `product-documents/${id}`,
    });
  }

  async findOneDocumentBySerialNumber(serialNumber: string): Promise<ProductDocumentResponse> {
    return this.makeBetRequest<ProductDocumentResponse>({
      method: 'GET',
      endpoint: `product-documents/serial/${serialNumber}`,
    });
  }

  async findDocumentsByProductId(productId: number): Promise<ProductDocumentResponse[]> {
    return this.makeBetRequest<ProductDocumentResponse[]>({
      method: 'GET',
      endpoint: `product-documents/product/${productId}`,
    });
  }

  async downloadDocumentFile(id: number): Promise<FileDownloadResponse> {
    // Use base provider service directly for file download with arraybuffer response type
    try {
      const response: AxiosResponse<Buffer> = await this.httpService.axiosRef.get(
        `${this.configService.get('apis.bet.base_url')}/product-documents/${id}/file`,
        {
          headers: {
            'X-API-Key': this.configService.get('apis.bet.api_key'),
          },
          responseType: 'arraybuffer',
        },
      );

      // Note: The actual response structure from BET API might be different
      // This is a placeholder - you may need to adjust based on actual BET API response
      return {
        buffer: response.data,
        fileName: 'document', // This should come from response headers or metadata
        mimeType: 'application/octet-stream', // This should come from response headers
      };
    } catch (error: unknown) {
      // Handle error using the same logic as makeBetRequest
      if (isAxiosErrorWithResponse(error)) {
        const betError = error.response!.data;
        if (isBetApiErrorResponse(betError)) {
          throw new Error(JSON.stringify(betError));
        }
        throw new Error(JSON.stringify(betError));
      }
      throw error;
    }
  }

  async updateDocumentStatus(id: number, status: DocumentStatus): Promise<ProductDocumentResponse> {
    return this.makeBetRequest<ProductDocumentResponse>({
      method: 'PATCH',
      endpoint: `product-documents/${id}/status`,
      payload: { status },
    });
  }

  async deleteDocument(id: number): Promise<void> {
    return this.makeBetRequest<void>({
      method: 'DELETE',
      endpoint: `product-documents/${id}`,
    });
  }

  async validateDocumentChecksum(id: number): Promise<ChecksumValidationResponse> {
    return this.makeBetRequest<ChecksumValidationResponse>({
      method: 'GET',
      endpoint: `product-documents/${id}/validate-checksum`,
    });
  }
}
