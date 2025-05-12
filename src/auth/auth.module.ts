import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [AuthController],
  providers : [AuthService],
  imports : [DatabaseModule]
})
export class AuthModule {}
