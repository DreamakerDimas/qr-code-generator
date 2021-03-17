import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'src/functions';
import { deleteAllUserFiles, deleteFile } from 'src/gstorage';
import { Repository, DeleteResult, Like } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.entity';

const createFindData = (user) => {
  const { name, email, role } = user;

  if (name && email)
    return { name: Like(`%${name}%`), email: Like(`%${email}%`), role };

  if (name) return { name: Like(`%${name}%`), role };

  if (email) return { email: Like(`%${email}%`), role };

  return { role };
};

const isHaveMore = (count, limit, offset) => count > +limit + +offset;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    readonly userRepository: Repository<User>,
  ) {}

  async getAll(options): Promise<any> {
    const { limit, offset } = options;

    const [usersArr, count] = await this.userRepository.findAndCount({
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
    });

    const haveMore = isHaveMore(count, limit, offset);

    return { usersArr, haveMore };
  }

  async getById(id: string): Promise<User | null> {
    return await this.userRepository.findOneOrFail(id);
  }

  async getMatched(user, settings) {
    const { limit, offset } = settings;
    const { order } = user;
    const findData = createFindData(user);

    const [usersArr, count] = await this.userRepository.findAndCount({
      where: findData,
      order: { createdAt: order },
      take: limit,
      skip: offset,
    });

    const haveMore = isHaveMore(count, limit, offset);

    return { usersArr, haveMore };
  }

  async findOne(params: object, isAuth = false): Promise<User | null> {
    if (isAuth)
      return await this.userRepository
        .createQueryBuilder('user')
        .where('user.email = :email', params)
        .addSelect('user.password')
        .getOne();

    return await this.userRepository.findOne(params);
  }

  async create(userDto: CreateUserDto): Promise<User> {
    const hashPass = await hash(userDto.password);
    userDto.password = hashPass;
    return await this.userRepository.save(userDto);
  }

  async update(id: string, userDto: UpdateUserDto): Promise<User | null> {
    const user = await this.userRepository.findOneOrFail(id);

    if (!user.id) {
      console.error("User didn't exist");
    }

    if (userDto.password) userDto.password = await hash(userDto.password);
    await this.userRepository.update(id, userDto);

    return await this.userRepository.findOne(id);
  }

  async remove(id: string): Promise<DeleteResult> {
    const user = await this.userRepository.findOne({
      where: { id },
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          links: 'user.links',
        },
      },
    });

    deleteAllUserFiles(user.links);
    return await this.userRepository.delete(id);
  }
}
