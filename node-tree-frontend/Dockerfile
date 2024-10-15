# 1. Etapa de construcción
FROM node:18-alpine AS builder

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia solo los archivos de dependencias para aprovechar el cache de Docker
COPY package*.json ./

# Instala dependencias
RUN npm install 

# Copia el resto de los archivos de la aplicación
COPY . .

# Realiza el build de la aplicación Next.js
RUN npm run build

# 2. Etapa de producción
FROM node:18-alpine AS runner

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia las dependencias necesarias para producción desde la etapa de construcción
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# Copia los archivos de compilación de la aplicación
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Define la variable de entorno para producción
ENV NODE_ENV=development

# Expone el puerto de la aplicación (Next.js usa el puerto 3000 por defecto)
EXPOSE 3000

# Comando por defecto para correr la aplicación
CMD ["npm", "start"]