const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');

// Ler o conteúdo de db.json
const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json')));

// Configurar o roteamento
const router = jsonServer.router(db); // Passar os dados lidos para o router

// Usar o middleware padrão
const middlewares = jsonServer.defaults();

// Criar o servidor
const server = jsonServer.create();

// Adicionar o middleware
server.use(middlewares);

// Redirecionar requisições GET para /videos
server.use(jsonServer.rewriter({
  "/": "/videos"
}));

// Usar o roteador
server.use(router);

// Iniciar o servidor na porta 3000
server.listen(3000, () => {
  console.log('JSON Server is running');
});

// Exportar o servidor API
module.exports = server;
