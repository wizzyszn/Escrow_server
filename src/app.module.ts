import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import { ProposalModule } from './proposal/proposal.module';
import { InvitationModule } from './invitation/invitation.module';
import { BetModule } from './bet/bet.module';
@Module({
  imports: [ AuthModule, DatabaseModule, UsersModule, ConfigModule.forRoot({
    isGlobal : true
  }), ChatModule, ProposalModule, InvitationModule, BetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
