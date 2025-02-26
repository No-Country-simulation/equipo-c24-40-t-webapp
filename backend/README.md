<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar

```
pnpm install
```

3. Tener Nest CLI instalado

```
pnpm add -g @nestjs/cli
```

4. Levantar la base de datos

```
docker-compose up -d
```

## Compile and run the project with Dockerfile

```bash
# Contruir la imagen
$ docker build -t name_image .

# Ejecutar el contenedor
$ docker run -p 3000:3000 name_image
```

## Creación del modulo Servicios

```bash
# creation
$ nest g resource services --no-spec
```

Generará la siguiente estructura.

```bash
src/
├─ services/
│  ├─ dto/
│  │  ├─ create-service.dto.ts
│  │  └─ update-service.dto.ts
│  ├─ guards/
│  │  └─ ownership.guard.ts
│  ├─ services.controller.ts
│  ├─ services.service.ts
│  └─ services.module.ts
```

Eliminamos la carpeta entities/ y reemplazamos por guards/ y ownership.guard.ts

## Stack usado

- Nest
- Prisma
- MongoDB
