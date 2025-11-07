# Use Node.js como imagem base
FROM node:18

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código
COPY . .

# Compila o projeto Next.js
RUN npm run build

# Expõe a porta 3000
EXPOSE 3000

# Inicia a aplicação
CMD ["npm", "start"]
