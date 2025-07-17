import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ErpType } from '../entities/erp-type.entity';
import { ErpTypeNotFoundException } from '../helpers/exceptions/erp-type.exception';
import { ErpTypeCode } from '../types/erp-type.types';

@Injectable()
export class ErpTypeService {
  constructor(
    @InjectRepository(ErpType)
    private readonly erpCategoryRepository: Repository<ErpType>,
  ) {}

  async findAllByCode(codes: ErpTypeCode[]): Promise<ErpType[]> {
    const erpTypes = await this.erpCategoryRepository.find({ where: { code: In(codes) } });

    if (erpTypes.length === 0) {
      throw new ErpTypeNotFoundException({ codes: codes.join(', ') });
    }

    return erpTypes;
  }
}
