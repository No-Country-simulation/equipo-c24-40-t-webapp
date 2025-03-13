# Usar una imagen ligera de Node.js con Alpine
FROM node:22.14.0-alpine3.20

# Configurar el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Instalar NestJS CLI globalmente
RUN npm install -g @nestjs/cli

# Copiar el resto del código fuente
COPY . .

# Generar el cliente de Prisma
RUN npx prisma generate

# Construir la aplicación
RUN npm run build

# Exponer el puerto 3000
EXPOSE 3000

# Comando por defecto para iniciar la aplicación
CMD ["npm", "start"]
