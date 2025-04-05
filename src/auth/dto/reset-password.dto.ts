import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({ example: 'token_de_recuperacion.jwt' })
  @IsString()
  token: string;

  @ApiProperty({ example: 'nuevacontraseña123' })
  @IsString()
  @MinLength(6)
  password: string;
}
