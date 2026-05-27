FROM node:18

WORKDIR /app

COPY BACK/package*.json ./
RUN npm install --legacy-peer-deps

COPY BACK ./

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/server.js"]
