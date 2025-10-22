import { Controller, Get, Post, Body, UseGuards, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RolesGuard } from './guard/role.guard';
import { Roles } from './decorator/roles.decorator';
import { JwtAuthGuard } from './guard/auth.guard';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { postAuthLoginBodySwagger, postAuthLoginResponseSwagger, postAuthRegisterBodySwagger, postAuthRegisterResponseSwagger } from './swagger/auth.swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody(postAuthRegisterBodySwagger)
  @ApiOperation({ summary: 'REGISTER NEW USER' })
  @ApiResponse(postAuthRegisterResponseSwagger)
  @Post('register')
  register(@Body() createAuthDto: RegisterDto) {
    return this.authService.register(createAuthDto);
  }

  @ApiBody(postAuthLoginBodySwagger)
  @ApiOperation({ summary: 'LOGIN IN SYSTEM' })
  @ApiResponse(postAuthLoginResponseSwagger)
  @Post('login')
  async login(@Body() createAuthDto: LoginDto) {
      const token = await this.authService.login(createAuthDto);
      return { access_token: token };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('admin')
  admins() {
    return this.authService.findAdmin();
  }

}
