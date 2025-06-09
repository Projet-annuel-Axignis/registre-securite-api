import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HabFamily } from '../entities/hab-family.entity';
import { HabFamilyNotFoundException } from '../helpers/exceptions/hab-family.exception';
import { HabFamilyName } from '../types/hab-family-name.types';

@Injectable()
export class HabFamilyService {
  constructor(
    @InjectRepository(HabFamily)
    private readonly habFamilyRepository: Repository<HabFamily>,
  ) {}

  async findOneByName(name: HabFamilyName): Promise<HabFamily> {
    const habFamily = await this.habFamilyRepository.findOneBy({ name });

    if (!habFamily) {
      throw new HabFamilyNotFoundException({ name });
    }

    return habFamily;
  }
}
