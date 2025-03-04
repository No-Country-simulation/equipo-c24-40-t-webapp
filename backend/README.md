<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# 📌 Proyecto de Servicios Profesionales con NestJS, Prisma y MongoDB

Este proyecto permite que profesionales ofrezcan sus servicios y que los clientes puedan reservarlos. Está desarrollado con **NestJS**, utilizando **Prisma** como ORM y **MongoDB** como base de datos.

---

## 🚀 Tecnologías y Herramientas Utilizadas

- **Node.js** - Entorno de ejecución para JavaScript.
- **NestJS** - Framework para backend en Node.js basado en TypeScript.
- **Prisma** - ORM para la interacción con la base de datos MongoDB.
- **MongoDB** - Base de datos NoSQL para almacenar la información.
- **Zod** - Validación de datos en DTOs.
- **Postman** - Para probar las API REST.
- **Docker** (Opcional) - Para el despliegue de la base de datos en contenedores.

---

## 📂 Estructura del Proyecto

```plaintext
backend/
│── src/
│   ├── auth/           # Módulo de autenticación con JWT y OAuth (Google)
│   ├── bookings/       # Módulo para gestionar reservas
│   ├── prisma/         # Configuración de Prisma y base de datos
│   ├── services/       # Módulo de gestión de servicios
│   ├── users/          # Módulo de usuarios y profesionales
│   ├── main.ts         # Punto de entrada de la aplicación
│── prisma/
│   ├── schema.prisma   # Definición del esquema de la base de datos
│── .env                # Variables de entorno
│── README.md           # Documentación del proyecto
```

---

## 📌 Instalación y Configuración

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/No-Country-simulation/equipo-c24-40-t-webapp.git
   cd /backend
   ```

2. **Instalar dependencias:**

   ```bash
   pnpm install
   ```

  Instalar Nest CLI
   ```bash
   pnpm add -g @nestjs/cli
   ```

3. **Configurar variables de entorno (.env):**

   ```env
   DATABASE_URL="mongodb+srv://usuario:contraseña@cluster.mongodb.net/nombreBD"
   DATABASE_URL_LOCAL="mongodb://localhost:27017/backend-db-1"
   PRISMA_LOG_LEVEL="variable_prisma_log"
   JWT_SECRET="secreto_para_tokens"
   PORT="puerto_ejecución"
   ```

5. **Levantar la base de datos**

   ```
   docker compose up -d
   ```

6. **Compilar y correr el proyecto con Dockerfile:**

   ```bash
   # Contruir la imagen
   $ docker build -t name_image .

   # Ejecutar el contenedor
   $ docker run -p 3000:3000 name_image
   ```

También puedes correr el servidor con pnpm.
7. **Iniciar el servidor:**

   ```bash
   pnpm run start:dev
   ```

---

## 🛠️ Implementación del CRUD de Servicios, Reservas, Profesionales, Usuarios, Reseñas

### 📌 1. Crear los Módulos "services, reviews, professionals, bookings, users, auth"

fundamentales en NestJS que ayudan a organizar y estructurar la aplicación.

  ```note
  Vamos a utilizar el comando de creación a continuación para cada módulo, en este ejemplo estaremos usando el módulo "services" a lo largo de la documentación.
  ```

  ```bash
  nest g resource services --no-spec
  ```

Nos generará la siguiente estructura.

  ```plaintext
  src/
  ├─ services/
  │  ├─ dto/
  │  │  ├─ create-service.dto.ts
  │  │  └─ update-service.dto.ts
  │  ├─ entities/
  │  │  └─ service.entity.ts.ts
  │  ├─ services.controller.ts
  │  ├─ services.service.ts
  │  └─ services.module.ts
  ```

### 📌 2. Definir los Modelos de cada servicio en Prisma (`schema.prisma`)

  ```prisma
  model Service {
    id             String       @id @default(auto()) @map("_id") @db.ObjectId
    title          String
    description    String
    price          Float
    category       String
    featured       Boolean      @default(false)
    availability   Boolean      @default(true)
    professionalId String       @db.ObjectId
    createdAt      DateTime     @default(now())
    updatedAt      DateTime     @updatedAt
    Booking        Booking[]
    Professional   Professional @relation(fields: [professionalId], references: [id])

    @@map("services")
  }
  ```

Otro ejemplo de modelo para booking

  ```prisma
  model Booking {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  userId    String   @db.ObjectId
  serviceId String   @db.ObjectId
  status    BookingStatus @default(PENDING)
  date      DateTime
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relaciones
  service Service @relation(fields: [serviceId], references: [id])
  User    User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  Review  Review?

  @@map("bookings")
  }
  ```

4. **Generar cliente de Prisma(schema.prisma):**

  ```bash
  npx prisma db push
  ```
  ```bash
  npx prisma generate
  ```

✅ Esto actualizará la base de datos y generará el cliente de Prisma para que podamos usarlo en NestJS.

### 📌 3. Crear los DTOs para Validaciones

En NestJS, los DTOs se utilizan principalmente para definir la estructura de los datos que se envían y reciben en las solicitudes HTTP.

#### 📌 `create-service.dto.ts`

```typescript
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateServiceDto {
  @IsString() @IsNotEmpty() title: string;
  @IsString() @IsNotEmpty() description: string;
  @IsBoolean() @IsNotEmpty() featured: boolean;
  @IsNumber() @IsNotEmpty() price: number;
  @IsString() @IsNotEmpty() category: string;
  @IsString() @IsNotEmpty() professionalId: string;
  @IsBoolean() @IsOptional() availability?: boolean;
}
```

### 📌 4. Implementar el Servicio (`services.service.ts`)

Los servicios en NestJS son una parte fundamental de la arquitectura que maneja la lógica de negocio.

```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateServiceDto) {
    return this.prisma.service.create({ data: dto });
  }

  async findAll() {
    return this.prisma.service.findMany();
  }

  async findOne(id: string) {
    const service = await this.prisma.service.findUnique({ where: { id } });
    if (!service)
      throw new NotFoundException(`Servicio con ID ${id} no encontrado.`);
    return service;
  }

  async update(id: string, dto: UpdateServiceDto) {
    return this.prisma.service.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    return this.prisma.service.delete({ where: { id } });
  }
}
```

### 📌 5. Implementar el Controlador (`services.controller.ts`)

Los controladores son una parte fundamental de NestJS que manejan las solicitudes HTTP entrantes y devuelven las respuestas al cliente. 

Maneja 
```typescript
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  create(@Body() dto: CreateServiceDto) {
    return this.servicesService.create(dto);
  }

  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateServiceDto) {
    return this.servicesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesService.remove(id);
  }
}
```