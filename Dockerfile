# Escolhe imagem Node.js
FROM node:20-alpine

# Define diretório de trabalho
WORKDIR /app

# Copia arquivos de package
COPY package*.json ./
COPY tsconfig.json ./

# Instala dependências
RUN npm install

# Copia todo o código
COPY . .

# Build do Next.js
RUN npm run build

# Expõe a porta que o Fly.io vai usar
EXPOSE 3000

# Comando para iniciar o servidor Next.js
CMD ["npm", "start"]
