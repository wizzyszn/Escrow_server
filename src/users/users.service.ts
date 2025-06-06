import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/client';
import { DatabaseService } from 'src/database/database.service';
@Injectable()
export class UsersService {
  constructor (private readonly databaseService : DatabaseService) {}
  
  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
