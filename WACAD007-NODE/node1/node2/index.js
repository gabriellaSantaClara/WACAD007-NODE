import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createLink } from './util.js';
import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const folder = process.argv[2] || '.';
const PORT = process.env.PORT || 3333;

const server = http.createServer((req, res) => {
const url = req.url;
const filepath = folder + url;

  if (url === '/') {
    fs.readdir(folder, (err, files) => {
      
      res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
      files.forEach(file => res.write(createLink(file)));
      res.end();
    });
  } else {
      fs.readFile(filepath, 'utf-8', (err, data) => {
      res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
      res.write(`<a href="/">Voltar</a><br><br>`);
      res.write(`<pre>${data}</pre>`);
      res.end();
    });
  }
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
