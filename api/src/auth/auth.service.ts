import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';
import { LoginDto } from './dto/login.dto';
import { AbilityFactory } from '../casl/ability.factory';
import { packRules } from '@casl/ability/extra';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
    private abilityFactory: AbilityFactory,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.userRepo.findOne({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    const ability = this.abilityFactory.defineAbilityFor(user);
    const rules = packRules(ability.rules);

    return {
      access_token: token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      rules,
    };
  }

  async me(userId: string) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      select: ['id', 'email', 'name', 'role'],
    });
    if (!user) return null;

    const ability = this.abilityFactory.defineAbilityFor(user);
    const rules = packRules(ability.rules);

    return { id: user.id, email: user.email, name: user.name, role: user.role, rules };
  }
}
