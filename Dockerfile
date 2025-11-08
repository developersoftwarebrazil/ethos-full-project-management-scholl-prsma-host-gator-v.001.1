# -------------------------
# Etapa base de build
# -------------------------
FROM node:18 AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# -------------------------
# Etapa de produção
# -------------------------
FROM base AS prod
RUN npm run build
CMD ["npm", "start"]

# -------------------------
# Etapa de desenvolvimento
# -------------------------
FROM base AS dev
CMD ["npm", "run", "dev"]
