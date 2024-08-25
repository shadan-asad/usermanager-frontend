# Build stage
FROM node:16 as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm cache clean --force
RUN npm install
RUN npm install
COPY . .
RUN npm run build --verbose

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist/* /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf