import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleType } from '@src/users/types/role.types';
import { Request } from 'express';
import { AuthForbiddenException } from '../helpers/auth.exception';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const allowedRoles = this.reflector.getAllAndOverride<RoleType[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!allowedRoles) return true;

    const { user } = context.switchToHttp().getRequest<Request>();

    if (this.matchRoles(allowedRoles, user!.role.type)) return true;

    throw new AuthForbiddenException({ role: user!.role.type, requiredRoles: allowedRoles.join(', ') });
  }

  private matchRoles(allowedRoles: RoleType[], userRole: RoleType): boolean {
    console.log(userRole);
    if (userRole === RoleType.ADMINISTRATOR) return true;

    const rolesHierarchy = {
      [RoleType.VISITOR]: [RoleType.VISITOR],
      [RoleType.CUSTOMER]: [RoleType.CUSTOMER, RoleType.VISITOR],
      [RoleType.CUSTOMER_MANAGER]: [RoleType.CUSTOMER_MANAGER, RoleType.CUSTOMER, RoleType.VISITOR],
      [RoleType.CUSTOMER_ADMINISTRATOR]: [
        RoleType.CUSTOMER_ADMINISTRATOR,
        RoleType.CUSTOMER_MANAGER,
        RoleType.CUSTOMER,
        RoleType.VISITOR,
      ],
    };

    return allowedRoles.some((allowedRole) => Object.values(rolesHierarchy[userRole]).includes(allowedRole));
  }
}
