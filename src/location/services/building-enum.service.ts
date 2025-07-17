import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ErpCategory } from '../entities/erp-category.entity';
import { IghClass } from '../entities/igh-class.entity';
import { Typology } from '../entities/typology.entity';
import {
  ErpCategoryNotFoundException,
  IghClassNotFoundException,
  TypologyNotFoundException,
} from '../helpers/exceptions/building-enum.exception';
import { IghClassCode } from '../types/igh-class.types';
import { TypologyCode } from './../types/typology-code.types';

@Injectable()
export class BuildingEnumService {
  constructor(
    @InjectRepository(Typology)
    private readonly typologyRepository: Repository<Typology>,
    @InjectRepository(IghClass)
    private readonly ighClassRepository: Repository<IghClass>,
    @InjectRepository(ErpCategory)
    private readonly erpCategoryRepository: Repository<ErpCategory>,
  ) {}

  async findManyTypologies(codes: TypologyCode[], throwNotFoundError = true): Promise<Typology[]> {
    const typologies = await this.typologyRepository.find({ where: { code: In(codes) } });
    if (throwNotFoundError && typologies.length !== codes.length) {
      const foundCodes = new Set(typologies.map((typology) => typology.code));
      const missingCodes = codes.filter((code) => !foundCodes.has(code));
      if (missingCodes.length > 0) throw new TypologyNotFoundException({ codes: missingCodes.join(', ') });
    }

    return typologies;
  }

  async findManyIghClasses(codes: IghClassCode[], throwNotFoundError = true): Promise<IghClass[]> {
    const ighClasses = await this.ighClassRepository.find({ where: { code: In(codes) } });
    if (throwNotFoundError && ighClasses.length !== codes.length) {
      const foundCodes = new Set(ighClasses.map((ighClass) => ighClass.code));
      const missingCodes = codes.filter((code) => !foundCodes.has(code));
      if (missingCodes.length > 0) throw new IghClassNotFoundException({ codes: missingCodes.join(', ') });
    }

    return ighClasses;
  }

  async findErpCategory(category: number): Promise<ErpCategory> {
    const erpCategory = await this.erpCategoryRepository.findOne({ where: { category } });
    if (!erpCategory) throw new ErpCategoryNotFoundException({ category });
    return erpCategory;
  }
}
