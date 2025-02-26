# Usar una imagen ligera de Node.js con Alpine
FROM node:22.14.0-alpine3.20

# Configurar el directorio de trabajo
WORKDIR /app

# Copiar archivos esenciales antes de instalar dependencias
COPY package.json pnpm-lock.yaml ./

# Instalar PNPM globalmente
RUN npm install -g pnpm

# Configurar PNPM correctamente
ENV PNPM_HOME="/root/.pnpm-global"
ENV PATH="${PNPM_HOME}/bin:${PATH}"

# Crear el directorio global de PNPM y configurarlo
RUN mkdir -p "${PNPM_HOME}" && pnpm config set prefix "${PNPM_HOME}"

# Instalar NestJS CLI globalmente con PNPM
RUN pnpm install -g @nestjs/cli

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto 3000
EXPOSE 3000

# Comando por defecto para iniciar la aplicación
CMD ["pnpm", "start"]
