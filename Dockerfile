FROM node:18

# Directorio de trabajo
WORKDIR /app

# Copiar dependencias primero (mejor cache)
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código
COPY . .

# Compilar TypeScript → dist/
RUN npm run build

# Exponer puerto del backend
EXPOSE 3000

# Ejecutar la app compilada
CMD ["node", "dist/server.js"]
