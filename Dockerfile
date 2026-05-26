FROM node:18

WORKDIR /app

COPY BACK/package*.json ./
RUN npm install

COPY BACK/tsconfig.json ./
COPY BACK ./

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/server.js"]
