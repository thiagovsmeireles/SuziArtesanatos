FROM node:20-alpine

WORKDIR /app

# Copia package.json + lockfile
COPY package*.json ./

# Instala dependências
RUN npm ci

# Copia todos os arquivos
COPY . .

# Build
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
