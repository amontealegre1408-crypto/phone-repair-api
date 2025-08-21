import { Request } from 'express';
import { UserRole } from '../../modules/auth/enum/role.enum';

export interface AuthenticatedUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole; // Tipado específico del enum
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface RequestWithUser extends Request {
  user: AuthenticatedUser;
}
