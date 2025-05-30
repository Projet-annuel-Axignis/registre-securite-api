import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from '../entities/plan.entity';
import { PlanType } from '../types/plan.type';

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
  ) {}

  /**
   * Creates a new plan with the specified type and expiration date.
   * @param type The type of plan to create
   * @param expiredAt The expiration date of the plan
   * @returns The created plan
   */
  async create(type: PlanType, expiredAt: Date): Promise<Plan> {
    const plan = this.planRepository.create({
      type,
      expiredAt,
    });
    return await this.planRepository.save(plan);
  }
}
