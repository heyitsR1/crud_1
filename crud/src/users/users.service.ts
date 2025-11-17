import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/User.entity'
import {CreateUserDto} from './dto/CreateUser.dto'
import { UpdateUserDto } from './dto/UpdateUser.dto';
import * as bcrypt from 'bcrypt';
import { ConfigModule, ConfigService } from '@nestjs/config';



@Injectable()
export class UsersService {
    constructor (
      private configService: ConfigService,
      @InjectRepository(User)
        private UsersRepository:Repository <User>,
    ){}
    async findOne(username: string) {
      const user = await this.UsersRepository.findOneBy({ username });
      if (!user) {
        throw new NotFoundException(`User with username ${username} not found`);
      }
      console.log(user)
      return user;
    }
  async create(createUserDto: CreateUserDto) {
    let new_user = await this.UsersRepository.create(createUserDto);
    if (await this.findOne(new_user.username)) {
      throw new HttpException (
        'User with username already exists',
        HttpStatus.BAD_REQUEST,
      )
        }
    const password = createUserDto.password;
    const saltOrRounds = Number(this.configService.get('SALT'));
    const hash = await bcrypt.hash(password, saltOrRounds);
    new_user.password = hash
    return this.UsersRepository.save(new_user)
  }

  async findAll() {
    return await this.UsersRepository.find()
  }


  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.UsersRepository.update(id,updateUserDto)
  }

  async remove(id: number) {
    return await this.UsersRepository.delete(id);
  }

  // private readonly users = [
  //   {
  //     userId: 1,
  //     username: 'ram',
  //     password: 'admin',
  //     roles: ['admin','user'],
  //   },
  //   {
  //     userId: 2,
  //     username: 'sita',
  //     password: 'user',
  //     roles: ['user'],
  //   },
  // ];

  // async findOne(username: string): Promise<User | undefined> {
  //   return this.users.find(user => user.username === username);
  // }
}



