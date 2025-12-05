# --- STAGE 1: CONSTRUÇÃO (BUILDER) ---
FROM node:20-alpine AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia package.json e lockfile
# O lockfile é essencial para o npm ci, mas vamos usar 'install' para contornar o erro
COPY package*.json ./

# Instala dependências e Contorna o erro de 'formidable'
# Usamos 'npm install' em vez de 'npm ci' para maior tolerância à versão
RUN npm install

# Copia os arquivos da aplicação
COPY . .

# Variável de Ambiente: Configura o destino do build
ENV NEXT_TELEMETRY_DISABLED 1

# Constrói a aplicação Next.js para produção
# Este comando gera o código final otimizado
RUN npm run build

# --- STAGE 2: PRODUÇÃO (FINAL) ---
# Usamos uma imagem base minúscula, pois ela só precisa rodar o Node e os arquivos estáticos
FROM node:20-alpine AS runner

# Configuração da Porta
ENV PORT 3000
EXPOSE 3000

# Define o usuário de segurança não-root (boa prática)
# RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser
# USER appuser

# Define o diretório de trabalho e copia os arquivos necessários
WORKDIR /app

# Copia os arquivos de produção e cache
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Copia a pasta .next (onde está o build final)
COPY --from=builder /app/.next ./.next

# Instala apenas as dependências de produção (mais rápido)
RUN npm install --omit=dev

# Comando de execução da aplicação
CMD ["npm", "start"]
