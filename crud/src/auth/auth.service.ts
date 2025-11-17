import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    if (!user || !user.password) {
    throw new UnauthorizedException('No User');
  }
    const hash = user.password // password stored as hash
    const isMatch = await bcrypt.compare(pass, hash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    console.log ("Username is there bro")
    const payload = { 
        sub: user.id, 
        username: user.username,
        roles: Array.isArray(user.roles) ? user.roles : [user.roles].filter(Boolean)
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
