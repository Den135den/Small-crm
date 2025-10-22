import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto} from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRole } from './role/role';

@Injectable()
export class AuthService {
  constructor( 
    @InjectRepository(Auth)
    private readonly authRepo: Repository<Auth>,
    private readonly jwtService: JwtService,
  ){}

  async register(dto: RegisterDto): Promise<{ message: string; email: string }>  {
    const existing = await this.authRepo.findOne({ where: { email: dto.email } });
    if (existing) throw new ConflictException('Email already exists');

    const hashed = await bcrypt.hash(dto.password, 10)
    const auth = await this.authRepo.create({...dto, password: hashed});

    await this.authRepo.save(auth);

    return { message: 'User registered', email: auth.email };
  }


  async login(dto: LoginDto): Promise<string>{
    const user = await this.authRepo.findOne({where: {email: dto.email}})
    if (!user) throw new UnauthorizedException('User not found');

    const isMatchPassword = await bcrypt.compare(dto.password, user.password)
    if (!isMatchPassword) throw new UnauthorizedException('Invalid credentials');

    const accessToken = this.jwtService.sign({
      id: user.id,
      email: user.email,
      role: user.role
    })
    return accessToken;
  }

  async findAdmin(){
    return this.authRepo.findOne({
      where: {role: UserRole.ADMIN},
    });
  }


}
