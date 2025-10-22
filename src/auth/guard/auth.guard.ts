import { UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser>(err: any, user: any): TUser {
    if (err || !user) {
      throw err || new UnauthorizedException('Invalid or missing token');
    }
    return user as TUser;
  }
}
