import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateBetDto } from './dto/create-bet.dto';
import { UpdateBetDto } from './dto/update-bet.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma, Status } from 'generated/client';
@Injectable()
export class BetService {
  constructor(private readonly databaseService: DatabaseService) {}
  async proposeBet(createBetDto: CreateBetDto) {
    try {
      const existingUser = await this.databaseService.user.findFirst({
        where: {
          address: createBetDto.player,
        },
      });
      if (!existingUser) {
        throw new ConflictException("This user doesn't exist in out Database");
      }
      const response = await this.databaseService.bet.create({
        data: {
          ...createBetDto,
          userId: existingUser.id,
        },
      });
      return response;
    } catch (err) {
      if (
        err instanceof BadRequestException ||
        err instanceof ConflictException
      ) {
        throw err;
      }

      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ConflictException('User with this email already exists');
        }
        if (err.code === 'P2000') {
          throw new BadRequestException('Value too long for a field');
        }
        if (err.code === 'P2009') {
          throw new BadRequestException('Invalid user data provided');
        }
        throw new BadRequestException('Database error occurred');
      }

      throw new InternalServerErrorException('Failed to create user account');
    }
  }

  async findAllPendingBets() {
    try {
      const pendingBets = await this.databaseService.bet.findMany({
        where: {
          status: Status.pending,
        },
      });
    } catch (err) {
      if (
        err instanceof BadRequestException ||
        err instanceof ConflictException
      ) {
        throw err;
      }
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ConflictException('Something went wrong.... Please try again later');
        }
        if (err.code === 'P2000') {
          throw new BadRequestException('Value too long for a field');
        }
        if (err.code === 'P2009') {
          throw new BadRequestException('Invalid user data provided');
        }
        throw new BadRequestException('Database error occurred');
      }

      throw new InternalServerErrorException('Failed to create user account');
    }
  }

  async update(storeHash: string, updateBetDto: UpdateBetDto) {
    try {
      const bet = await this.databaseService.bet.findFirst({
        where: {
          store_hash: storeHash,
        },
      });
      if (!bet) {
        throw new ConflictException('Invalid Bet Indentifier');
      }
      await this.databaseService.bet.update({
        where: {
          store_hash: storeHash,
        },
        data: updateBetDto,
      });
    } catch (err) {
      if (
        err instanceof BadRequestException ||
        err instanceof ConflictException
      ) {
        throw err;
      }

      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ConflictException('Something wen wrong');
        }
        if (err.code === 'P2000') {
          throw new BadRequestException('Value too long for a field');
        }
        if (err.code === 'P2009') {
          throw new BadRequestException('Invalid user data provided');
        }
        throw new BadRequestException('Database error occurred');
      }

      throw new InternalServerErrorException('Failed to create user account');
    }
  }

  remove(id: number) {
    return `This action removes a #${id} bet`;
  }
}
