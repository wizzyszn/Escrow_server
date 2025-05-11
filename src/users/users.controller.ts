import { Controller, Get, ParseIntPipe, Post } from '@nestjs/common';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
  constructor( private readonly usersService : UsersService) {}
  
  @Get()
  findAll() {
    this.usersService.findAll()
  }
  @Post()
  create(){
  }
}
