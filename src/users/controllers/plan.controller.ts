import { Body, Controller, Param, ParseIntPipe, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ActivityLogger } from '@src/activity-logger/helpers/activity-logger.decorator';
import { Resources } from '@src/activity-logger/types/resource.types';
import { Roles } from '@src/auth/decorators/role.decorator';
import { GetUser } from '@src/auth/decorators/user.decorator';
import { JwtAuthGuard } from '@src/auth/guards/jwt.guard';
import { RolesGuard } from '@src/auth/guards/role.guard';
import { AuthForbiddenException } from '@src/auth/helpers/auth.exception';
import { LoggedUser } from '@src/auth/types/logged-user.type';
import { SwaggerFailureResponse } from '@src/common/helpers/common-set-decorators.helper';
import { UpdatePlanDto } from '../dto/plan/update-plan.dto';
import { Plan } from '../entities/plan.entity';
import { PlanService } from '../services/plan.service';
import { RoleType } from '../types/role.types';

@ApiTags(Resources.PLAN)
@SwaggerFailureResponse()
@UseGuards(RolesGuard, JwtAuthGuard)
@ApiBearerAuth()
@Controller({ path: 'plans', version: ['1'] })
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  /**
   * Met à jour les informations d'un plan.
   * L'utilisateur doit être administrateur ou propriétaire de la société associée au plan.
   *
   * @param {number} id - L'identifiant unique du plan.
   * @param {UpdatePlanDto} updatePlanDto - Les nouvelles données du plan.
   * @param {LoggedUser} user - L'utilisateur connecté.
   * @returns {Promise<Plan>} Le plan mis à jour.
   *
   * @throws {PlanNotFoundException} - Si le plan est introuvable.
   * @throws {AuthForbiddenException} - Si l'utilisateur n'a pas les droits.
   *
   * @example
   * PATCH /plans/2
   * Body: { type: "ADMIN_MANAGE", expiredAt: "2025-12-31T23:59:59.000Z" }
   */
  @Patch(':id')
  @Roles(RoleType.COMPANY_ADMINISTRATOR)
  @ActivityLogger({ description: "Mettre à jour les informations d'un plan" })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePlanDto: UpdatePlanDto,
    @GetUser() user: LoggedUser,
  ): Promise<Plan> {
    // Get the plan with company information
    const plan = await this.planService.findOneWithCompany(id);

    // Check if user has rights to edit this plan
    const hasRights = this.checkUserRights(user, plan);

    if (!hasRights) {
      throw new AuthForbiddenException();
    }

    return await this.planService.update(id, plan.company.id, updatePlanDto);
  }

  /**
   * Vérifie si l'utilisateur a les droits pour modifier le plan.
   * L'utilisateur doit être administrateur ou propriétaire de la société.
   *
   * @param {LoggedUser} user - L'utilisateur connecté.
   * @param {Plan} plan - Le plan à vérifier.
   * @returns {boolean} True si l'utilisateur a les droits.
   */
  private checkUserRights(user: LoggedUser, plan: Plan): boolean {
    // Administrators can edit any plan
    if (user.role.type === RoleType.ADMINISTRATOR) {
      return true;
    }

    // Company members can only edit plans from their own company
    if (user.role.type === RoleType.COMPANY_ADMINISTRATOR && user.company?.id === plan.company.id) {
      return true;
    }

    return false;
  }
}
