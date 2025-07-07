export interface FileDownloadResponse {
  buffer: Buffer;
  fileName: string;
  mimeType: string;
}

export interface ChecksumValidationResponse {
  isValid: boolean;
}
