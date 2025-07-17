import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from '@src/users/entities/company.entity';
import { Repository } from 'typeorm';
import { UpdatePlanDto } from '../dto/plan/update-plan.dto';
import { Plan } from '../entities/plan.entity';
import { PlanNotFoundException } from '../helpers/exceptions/plan.exception';
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
   * @param company The company associated with the plan
   * @param comment Optional comment for the plan
   * @returns The created plan
   */
  async create(type: PlanType, expiredAt: Date, company: Company, comment?: string): Promise<Plan> {
    const plan = this.planRepository.create({
      type,
      expiredAt,
      company,
      comment,
    });
    return await this.planRepository.save(plan);
  }

  /**
   * Finds a plan by ID and company ID.
   * @param id The plan ID
   * @param companyId The company ID
   * @returns The plan if found
   */
  async findOneByCompany(id: number, companyId: number): Promise<Plan> {
    const plan = await this.planRepository.findOne({
      where: { id, company: { id: companyId } },
      relations: ['company'],
    });

    if (!plan) {
      throw new PlanNotFoundException({ id, companyId });
    }

    return plan;
  }

  /**
   * Finds a plan by ID with company information.
   * @param id The plan ID
   * @returns The plan if found
   */
  async findOneWithCompany(id: number): Promise<Plan> {
    const plan = await this.planRepository.findOne({
      where: { id },
      relations: ['company'],
    });

    if (!plan) {
      throw new PlanNotFoundException({ id });
    }

    return plan;
  }

  /**
   * Updates a plan with the provided data.
   * @param id The plan ID
   * @param companyId The company ID
   * @param updatePlanDto The data to update
   * @returns The updated plan
   */
  async update(id: number, companyId: number, updatePlanDto: UpdatePlanDto): Promise<Plan> {
    const plan = await this.findOneByCompany(id, companyId);

    // Update the plan fields
    if (updatePlanDto.type !== undefined) {
      plan.type = updatePlanDto.type;
    }
    if (updatePlanDto.expiredAt !== undefined) {
      plan.expiredAt = new Date(updatePlanDto.expiredAt);
    }
    if (updatePlanDto.comment !== undefined) {
      plan.comment = updatePlanDto.comment;
    }

    return await this.planRepository.save(plan);
  }
}
