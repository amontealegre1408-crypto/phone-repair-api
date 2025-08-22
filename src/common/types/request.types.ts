// src/common/types/request.types.ts
import { Request } from 'express';
import { User } from '../../modules/users/user.entity';

// Interfaz que extiende Express Request con el usuario autenticado
export interface AuthenticatedRequest extends Request {
  user: User;
}

// Tipo para el payload del JWT (si lo necesitas)
export interface JwtPayload {
  sub: string; // user ID
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

// Interfaz alternativa si solo necesitas ciertos campos del usuario
export interface RequestUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
}

export interface RequestWithUser extends Request {
  user: RequestUser;
}
