#STAGE 1 build Angular
FROM node:18.19.0-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

#STAGE 2 deploy nginx
FROM nginx:1.23.3-alpine
COPY --from=builder /app/dist/angular/browser /usr/share/nginx/html/