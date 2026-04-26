import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE } from 'src/common/constants/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<ROLE[]>('roles', context.getHandler());
    if (!roles) return true;

    const req = context.switchToHttp().getRequest();
    return roles.includes(req.user.role);
  }
}