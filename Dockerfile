# Dockerfile — conteneurisation de l'application web de démonstration.

# Image de base légère et versionnée : Node.js 20 sur Alpine (petite taille).
FROM node:20-alpine

# Répertoire de travail dans le conteneur.
WORKDIR /app

# On copie d'abord les fichiers de dépendances SEULS, puis on installe.
# Cet ordre exploite le cache de couches Docker : tant que package*.json
# ne change pas, l'étape npm ci n'est pas rejouée à chaque build du code.
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# On copie ensuite le reste du code applicatif.
COPY . .

# Sécurité : on exécute l'app avec l'utilisateur non-root "node" fourni
# par l'image officielle, plutôt qu'en root.
USER node

# Documente le port interne exposé par l'application (voir CONTAINER_PORT).
EXPOSE 3000

# Commande de démarrage du conteneur.
CMD ["node", "server.js"]
