import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BetService } from './bet.service';
import { CreateBetDto } from './dto/create-bet.dto';
import { UpdateBetDto } from './dto/update-bet.dto';

@Controller('bet')
export class BetController {
  constructor(private readonly betService: BetService) {}

  @Post()
  async create(@Body() createBetDto: CreateBetDto) {
    return await this.betService.proposeBet(createBetDto);
  }

  @Get('pending')
  async findAll() {
    return await this.betService.findAllPendingBets();
  }

  @Patch(':store_hash/status')
  async updateBetStatus(
    @Param('store_hash') storeHash: string,
    @Body() updateBetDto: UpdateBetDto,
  ) {
    return await this.betService.update(storeHash, updateBetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.betService.remove(+id);
  }
}
