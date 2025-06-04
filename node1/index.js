const http = require('http');
const fs = require('fs');
const path = require('path');
const { createLink } = require('./util');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });  //variavel ambiente NODE_ENV exercicio 4

const folder = process.argv[2] || '.';
const PORT = process.env.PORT || 3333;

const server = http.createServer((req, res) => {
const url = req.url;
const filepath = folder + url;

  if (url === '/') {
    fs.readdir(folder, (err, files) => {   //readdir do fs exercicio 1

      //res.write("Instituto de Computação");
      res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
      files.forEach(file => res.write(createLink(file)));
      res.end();
    });
  } else {
    fs.readFile(filepath, 'utf-8', (err, data) => {
      res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' }); //ler arquivo fs
      res.write(`<a href="/">Voltar</a><br><br>`);
      res.write(`<pre>${data}</pre>`);
      res.end();
    });
  }
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});


/*var http = require('http');
var fs = require('fs');
var path = require('path');

// Obtém o diretório passado como argumento na linha de comando
var directory = process.argv[2];

const dotenv = require("dotenv")
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });


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
});*/
