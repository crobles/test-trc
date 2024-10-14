# 1.- Build/compile code
FROM node:22-alpine3.20 as builder
WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install -g npm@10.8.1
RUN apk update && apk upgrade --no-cache libcrypto3 libssl3
RUN apk update && apk upgrade && apk add --no-cache busybox=1.36.1-r29

# Install dependencies
RUN npm install
RUN npm install @nestjs/cli@10.0.0

# Compile files in the dist folder
RUN npm run build

#####################################
# 2.- Create image with compiled code
FROM node:22-alpine3.20

# Change the work directory app
WORKDIR /app

COPY --from=builder ./app/dist ./dist
COPY package* ./

RUN npm install -g npm@10.8.1
RUN apk update && apk upgrade --no-cache libcrypto3 libssl3
RUN apk update && apk upgrade && apk add --no-cache busybox=1.36.1-r29

# Install dependencies (without devDependencies)
RUN npm install --omit=dev

# Expose the port 3000
EXPOSE 3000

# Run the server
CMD ["npm","run","start"]