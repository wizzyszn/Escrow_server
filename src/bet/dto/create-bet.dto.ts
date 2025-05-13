import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBetDto {
  @IsString()
  @IsNotEmpty()
  store_hash: string;

  @IsString()
  @IsNotEmpty()
  match_id: string;

  @IsString()
  @IsNotEmpty()
  match_date: string;

  @IsString()
  @IsNotEmpty()
  match_time: string;

  @IsString()
  @IsNotEmpty()
  choice_a: string;

  @IsString()
  @IsNotEmpty()
  choice_b: string;

  @IsString()
  @IsNotEmpty()
  player: string;

  @IsString()
  @IsNotEmpty()
  challenger: string;
}