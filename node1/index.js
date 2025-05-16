var http = require('http');
var fs = require('fs');
var path = require('path');

// Obtém o diretório passado como argumento na linha de comando
var directory = process.argv[2];

if (!directory) {
  console.error('Por favor, informe o nome do diretório como argumento.');
  process.exit(1);
}

var server = http.createServer((req, res) => {
  fs.readdir(directory, { withFileTypes: true }, (err, files) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(`Erro ao ler o diretório: ${err.message}`);
      return;
    }

    let html = `<h1>Conteúdo do diretório: ${directory}</h1><ul>`;
    files.forEach(file => {
      var type = file.isDirectory() ? '[DIR] ' : '[FILE] ';
      html += `<li>${type}${file.name}</li>`;
    });
    html += '</ul>';

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  });
});

var PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
