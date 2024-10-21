# Etapa 1: builder
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY tsconfig.json ./
COPY . .
RUN npm run build

RUN ls -al /app

# Etapa 2: Imagen final para producción
FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY .env /app/.env
EXPOSE 3100
CMD ["npm", "run", "start:dev2"]