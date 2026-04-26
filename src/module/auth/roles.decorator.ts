import { SetMetadata } from '@nestjs/common';
import { ROLE } from 'src/common/constants/role.enum';

export const Roles = (...roles: ROLE[]) => SetMetadata('roles', roles);