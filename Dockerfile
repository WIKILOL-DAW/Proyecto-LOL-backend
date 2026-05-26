FROM node:18

WORKDIR /app

COPY package*.json ./

# IMPORTANTE: instalar TODAS las dependencias (incluye devDependencies)
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/server.js"]
