# Etapa 1: Construcción
FROM node:18-alpine AS builder

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instalamos las dependencias
RUN npm install --legacy-peer-deps

COPY tsconfig.json ./

# Copiamos el resto del código fuente al directorio de trabajo
COPY . .

# Construimos el proyecto (esto compilará el código TypeScript a JavaScript)
RUN npm run build

# Etapa 2: Imagen final para producción
FROM node:18-alpine AS runner

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos solo los archivos necesarios de la etapa anterior (build)
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

COPY --from=builder /app/tsconfig.json ./

# Instalamos solo las dependencias de producción
RUN npm install 

# Copy the .env file
COPY .env /app/.env

# Definimos el puerto en el que la aplicación se ejecutará
EXPOSE 3100

# Comando para iniciar la aplicación
CMD ["npm", "run", "start:dev2"]