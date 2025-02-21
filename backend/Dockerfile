FROM node:22.14.0-alpine3.20

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración
COPY package.json pnpm-lock.yaml ./

# Instalar pnpm
RUN npm install -g pnpm

# Crear el directorio de binarios globales para pnpm y configurarlo
RUN mkdir -p /root/.pnpm-global/bin && pnpm config set global-bin-dir /root/.pnpm-global/bin

# Añadir el directorio de binarios globales de pnpm al PATH
ENV PATH=/root/.pnpm-global/bin:$PATH

# Instalar dependencias globales para desarrollo
RUN pnpm install @nestjs/cli -g

# Copiar el resto de los archivos del proyecto
COPY . .

# Instalar dependencias locales
RUN pnpm install

# Exponer el puerto necesario
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["pnpm", "start:dev"]