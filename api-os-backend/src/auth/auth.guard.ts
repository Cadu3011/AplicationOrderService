import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';  // Importe o tipo Role do Prisma
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = this.extractTokenFromHeader(request);

    if (!authorization) throw new UnauthorizedException('Token is required');

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true; // Se não houver roles necessárias, qualquer usuário pode acessar
    }

    // Verificar o payload do token JWT
    const payload = this.jwtService.verify(authorization, { secret: process.env.SECRET_KEY });
    request['sub'] = payload; // Adiciona o payload à requisição

    const userRole: Role = payload.roles || []; // Assumindo que o payload tem o campo `role`
    
    // Verifica se o usuário tem um dos papéis requeridos
    const hasRole = requiredRoles.includes(userRole);

    if (!hasRole) {
      throw new UnauthorizedException('Insufficient permissions');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
