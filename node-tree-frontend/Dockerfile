# Etapa 1: Construcción de la aplicación
FROM node:18-alpine AS builder

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos package.json y package-lock.json o yarn.lock
COPY package*.json ./

# Instalar las dependencias necesarias para la construcción
RUN npm install

# Copiar el resto de la aplicación
COPY . .

# Construir la aplicación Next.js
RUN npm run build

# Etapa 2: Ejecutar la aplicación en producción
FROM node:18-alpine AS runner

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos estáticos generados en la etapa de construcción
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

# Instalar solo las dependencias de producción
RUN npm install --only=production

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación Next.js
CMD ["npm", "run", "dev"]