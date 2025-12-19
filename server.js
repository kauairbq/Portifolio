const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Mock data for the e-commerce demo so it works offline
const products = [
  {
    id: 1,
    name: 'Notebook Pro 15"',
    description: 'Tela Retina 15", 16GB RAM, SSD 512GB, ideal para devs e criadores.',
    price: 7999.9,
    image: '/assets/img/projects/ecommerce.svg'
  },
  {
    id: 2,
    name: 'Headset ANC',
    description: 'Fone bluetooth com cancelamento ativo de ruído e 30h de bateria.',
    price: 899.9,
    image: '/assets/img/projects/landing-page.svg'
  },
  {
    id: 3,
    name: 'Teclado Mecânico',
    description: 'Switches silenciosos, RGB, layout ABNT2, conexão USB-C.',
    price: 629.9,
    image: '/assets/img/projects/todo-app.svg'
  }
];
let cart = [];
// Mock data for the todo-app demo
let tasks = [
  { id: '1', title: 'Planejar sprint', done: false },
  { id: '2', title: 'Revisar PRs', done: true },
  { id: '3', title: 'Deploy estático do portfólio', done: false }
];
let nextTaskId = tasks.length + 1;

function sendJson(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body || '{}'));
      } catch (e) {
        resolve({});
      }
    });
  });
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let pathname = decodeURIComponent(parsedUrl.pathname);
  if (pathname === '/') {
    pathname = '/index.html';
  }

  // API mock for ecommerce
  if (pathname === '/api/products' && req.method === 'GET') {
    return sendJson(res, 200, products);
  }

  if (pathname === '/api/cart' && req.method === 'GET') {
    return sendJson(res, 200, cart);
  }

  if (pathname === '/api/cart' && req.method === 'POST') {
    parseBody(req).then(body => {
      const productId = Number(body.productId);
      const quantity = Number(body.quantity) || 1;
      if (!products.find(p => p.id === productId)) {
        return sendJson(res, 400, { error: 'Produto não encontrado.' });
      }
      const existing = cart.find(item => item.productId === productId);
      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.push({ productId, quantity: Math.max(1, quantity) });
      }
      return sendJson(res, 200, cart);
    });
    return;
  }

  if (pathname.startsWith('/api/cart/') && (req.method === 'PUT' || req.method === 'DELETE')) {
    const productId = Number(pathname.replace('/api/cart/', ''));
    if (Number.isNaN(productId)) {
      return sendJson(res, 400, { error: 'ID inválido.' });
    }

    if (req.method === 'DELETE') {
      cart = cart.filter(item => item.productId !== productId);
      return sendJson(res, 200, cart);
    }

    // PUT
    parseBody(req).then(body => {
      const quantity = Number(body.quantity);
      const item = cart.find(ci => ci.productId === productId);
      if (!item) {
        return sendJson(res, 404, { error: 'Item não encontrado.' });
      }
      if (quantity <= 0 || Number.isNaN(quantity)) {
        cart = cart.filter(ci => ci.productId !== productId);
      } else {
        item.quantity = quantity;
      }
      return sendJson(res, 200, cart);
    });
    return;
  }

  // API mock for todo-app
  if (pathname === '/api/tasks' && req.method === 'GET') {
    return sendJson(res, 200, tasks);
  }

  if (pathname === '/api/tasks' && req.method === 'POST') {
    parseBody(req).then(body => {
      const title = String(body.title || '').trim();
      if (!title) {
      return sendJson(res, 400, { error: 'Título obrigatório.' });
      }
      const newTask = { id: String(nextTaskId++), title, done: false };
      tasks.push(newTask);
      return sendJson(res, 201, newTask);
    });
    return;
  }

  if (pathname.startsWith('/api/tasks/') && req.method === 'PUT') {
    const taskId = pathname.replace('/api/tasks/', '');
    parseBody(req).then(body => {
      const task = tasks.find(t => t.id === taskId);
      if (!task) {
        return sendJson(res, 404, { error: 'Tarefa não encontrada.' });
      }
      if (typeof body.title === 'string') {
        const title = body.title.trim();
        if (title) task.title = title;
      }
      if (typeof body.done === 'boolean') {
        task.done = body.done;
      }
      return sendJson(res, 200, task);
    });
    return;
  }

  if (pathname.startsWith('/api/tasks/') && req.method === 'DELETE') {
    const taskId = pathname.replace('/api/tasks/', '');
    tasks = tasks.filter(t => t.id !== taskId);
    return sendJson(res, 200, { success: true });
  }

  // Static serving
  // Remover a barra inicial para garantir que path.join use o diretório atual
  const safePath = pathname.replace(/^\/+/, '');
  let filePath = path.join(__dirname, safePath);

  // If the request is for a directory (e.g. "/Site para Advogados/"), serve its index.html
  if (!path.extname(filePath)) {
    try {
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      }
    } catch (e) {
      // ignore and let 404 handling continue
    }
  }

  const ext = path.extname(filePath);
  let contentType = 'text/html';

  switch (ext) {
    case '.css':
      contentType = 'text/css';
      break;
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
    case '.webp':
      contentType = 'image/webp';
      break;
    case '.svg':
      contentType = 'image/svg+xml';
      break;
    case '.mp4':
      contentType = 'video/mp4';
      break;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

// Allow overriding port via env; default stays 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
