import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({ example: 'miContraseñaActual123' })
  @IsString()
  oldPassword: string;

  @ApiProperty({ example: 'miNuevaContraseña456' })
  @IsString()
  @MinLength(6)
  newPassword: string;
}
