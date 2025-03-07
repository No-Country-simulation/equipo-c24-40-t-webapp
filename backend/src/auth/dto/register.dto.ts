import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class RegisterDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'La contraseña debe tener al menos 8 caracteres, una letra y un número',
  })
  passwordConfirm: string;
}
