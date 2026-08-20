// server.js — application web de démonstration (Hello World)
// Sert une page sur la route racine "/" pour valider le déploiement
// et le health check du script deploy-webapp.sh.

const http = require('http');

// Le port est configurable par variable d'environnement (bonne pratique
// pour la conteneurisation), avec 3000 par défaut — la valeur attendue
// par le script (CONTAINER_PORT=3000).
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // Route de santé : le script interroge "/" et attend un code 2xx.
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
    return;
  }

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end('<h1>Hello DevOps</h1><p>Déploiement automatisé réussi.</p>');
});

server.listen(PORT, () => {
  console.log(`Application démarrée sur le port ${PORT}`);
});
