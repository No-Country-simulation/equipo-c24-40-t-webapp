import { UserRole } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto extends CreateUserDto {
  @ApiProperty({ example: 'John', description: 'Nombre del usuario' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Doe', description: 'Apellido del usuario' })
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({ example: 25, description: 'Edad del usuario' })
  @IsNotEmpty()
  age: number;

  @ApiProperty({
    example: 'john.doe@email.com',
    description: 'Correo electrónico del usuario',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Pass123456',
    description:
      'Contraseña del usuario (mínimo 8 caracteres, una letra y un número)',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'La contraseña debe tener al menos 8 caracteres, una letra y un número',
  })
  password: string;

  @ApiProperty({
    example: 'professional',
    enum: UserRole,
    description: 'Rol del usuario (client o professional)',
  })
  @IsString()
  @IsNotEmpty()
  role: UserRole;
}
