#!/bin/bash

# =============================
# 🎨 CORES
# =============================
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
CYAN="\033[0;36m"
RED="\033[0;31m"
NC="\033[0m" # Reset

# =============================
# 🏁 Início
# =============================
echo -e "${CYAN}==============================="
echo -e "   🚀 Iniciando o ambiente     "
echo -e "===============================${NC}"

# Pergunta o ambiente
echo -e "Escolha o ambiente (${GREEN}dev${NC}/${YELLOW}prod${NC}): "
read -r ENVIRONMENT

# Validação
if [[ "$ENVIRONMENT" != "dev" && "$ENVIRONMENT" != "prod" ]]; then
  echo -e "${RED}❌ Ambiente inválido. Use 'dev' ou 'prod'.${NC}"
  exit 1
fi

# Define o Dockerfile correto
if [ "$ENVIRONMENT" == "dev" ]; then
  export DOCKERFILE="Dockerfile.dev"
  ENV_FILE=".env.local"
else
  export DOCKERFILE="Dockerfile.prod"
  ENV_FILE=".env"
fi

# Pergunta sobre volumes
echo -e "Deseja destruir os volumes antes de subir? (y/n): "
read -r DESTROY_VOLUMES

if [ "$DESTROY_VOLUMES" == "y" ]; then
  echo -e "${RED}🧨 Removendo containers e volumes antigos...${NC}"
  docker compose down -v --remove-orphans
  docker system prune -a --volumes -f
else
  echo -e "${YELLOW}➡️ Mantendo volumes existentes...${NC}"
  docker compose down --remove-orphans
fi

# Sobe containers
echo -e "${GREEN}🔧 Subindo containers (${ENVIRONMENT})...${NC}"
docker compose --env-file "$ENV_FILE" up -d --build

# Aguarda container principal
echo -e "${CYAN}⏳ Aguardando container nextjs_app ficar pronto...${NC}"
sleep 10

if docker ps --format '{{.Names}}' | grep -q "nextjs_app"; then
  echo -e "${GREEN}✅ Container nextjs_app está rodando!${NC}"
else
  echo -e "${RED}❌ O container nextjs_app não iniciou corretamente.${NC}"
  exit 1
fi

# Executa migrações Prisma
if [ "$ENVIRONMENT" == "dev" ]; then
  echo -e "${CYAN}🧩 Verificando migrações Prisma...${NC}"
  docker exec -it nextjs_app npx prisma migrate dev
fi

echo -e "${GREEN}✅ Ambiente ${ENVIRONMENT} iniciado com sucesso!${NC}"

# Mostra status final
docker ps
