import { Module } from '@nestjs/common';
import { BetService } from './bet.service';
import { BetController } from './bet.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [BetController],
  providers: [BetService],
  imports : [DatabaseModule]
})
export class BetModule {}
