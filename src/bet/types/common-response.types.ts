export interface SoftDeleteResponse {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface CommonCreate {
  name: string;
  serialNumber: string;
  description?: string;
}

export interface CommonUpdate {
  name?: string;
  description?: string;
  serialNumber?: string;
}

export interface CommonGet extends SoftDeleteResponse {
  name: string;
  serialNumber: string;
  description?: string;
}

export class ClassCommonGet {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  name: string;
  serialNumber: string;
  description?: string;
}
