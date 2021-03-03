import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    readonly userRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getById(id: string): Promise<User | null> {
    return await this.userRepository.findOneOrFail(id);
  }

  async findOne(params: object): Promise<User | null> {
    return await this.userRepository.findOne(params);
  }

  async create(userDto: CreateUserDto): Promise<User> {
    return await this.userRepository.save(userDto);
  }

  async update(id: string, userDto: UpdateUserDto): Promise<User | null> {
    const user = await this.userRepository.findOneOrFail(id);
    if (!user.id) {
      console.error("User didn't exist");
    }
    await this.userRepository.update(id, userDto);
    return await this.userRepository.findOne(id);
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}
