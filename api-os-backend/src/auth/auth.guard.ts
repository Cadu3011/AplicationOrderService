import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {

  @Inject()
  private readonly jtwService:JwtService

    async canActivate(context: ExecutionContext):Promise<boolean |any>{
      var payl = ''
      const request = context.switchToHttp().getRequest()
      const authorization = this.extractTokenFromHeader(request)
      if(!authorization) throw new UnauthorizedException('Token is required')
      try {
        const payload = this.jtwService.verify(authorization, {secret: process.env.SECRET_KEY})
        request['sub'] = payload
        payl = payload
      } catch (error) {
        throw new UnauthorizedException('invalid token')
      }
    return true && payl;
  }
  private extractTokenFromHeader(request:Request):string | undefined{
    const [type,token] = request.headers['authorization']?.split(' ')?? []
    return type === 'Bearer' ? token : undefined
  }
}
