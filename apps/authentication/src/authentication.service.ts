import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { CredentialsInput } from './authentication.input';

@Injectable()
export class AuthenticationService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async register({ username, password }: CredentialsInput) {
    const payload = { username, password };
    const newUser = this.userRepo.create(payload);
    newUser.password = await bcrypt.hash(password, 10);
    await this.userRepo.save(newUser);
  }

  async login({ username, password }: CredentialsInput) {
    const user = await this.userRepo.findOne({ where: { username } });
    if (!user) throw new ForbiddenException('User not found');
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new ForbiddenException('Invalid credentials');
    return {
      accessToken: this.jwtService.sign({
        sub: user.id,
        username: user.username,
      }),
    };
  }
}
