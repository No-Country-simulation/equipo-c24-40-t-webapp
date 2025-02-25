<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Compile and run the project with Docker

```bash
# Contruir la imagen
$ docker build -t name_image

# Ejecutar el contenedor
$ docker run -p 3000:3000 name_image
```

## Project setup without Docker

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
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
