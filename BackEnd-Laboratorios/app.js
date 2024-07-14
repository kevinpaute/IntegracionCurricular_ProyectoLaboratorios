const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const hostname = '127.0.0.1';
const port = 3000;

app.use(cors());
app.use(express.json());

// Configurar el middleware para que el objeto socketio esté disponible en req.app
app.set('socketio', io);

// Rutas dinámicas
const routesDirectory = path.join(__dirname, 'src', 'routes');
const routeFiles = fs.readdirSync(routesDirectory);

routeFiles.forEach((routeFile) => {
  const routePath = path.join(routesDirectory, routeFile);
  const routeModule = require(routePath);
  if (typeof routeModule === 'function') {
    app.use('/api/', routeModule);
  }
});

// Ruta de autenticación
const authRoutes = require('./src/routes/auth');
app.use('/api/auth', authRoutes);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('reservaCambiada', (data) => {
    io.emit('reservaCambiada', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});



// const express = require('express');
// const app = express();
// const cors = require('cors');
// const fs = require('fs');
// const path = require('path');
// const http = require('http').Server(app);

// const hostname = '127.0.0.1';
// const port = 3000;

// // Middleware para habilitar CORS
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   next();
// });

// app.use(express.json());
// // Configurar CORS
// app.use(cors());

// // Rutas dinámicas
// const routesDirectory = path.join(__dirname, 'src', 'routes');
// const routeFiles = fs.readdirSync(routesDirectory);

// routeFiles.forEach((routeFile) => {
//   const routePath = path.join(routesDirectory, routeFile);
//   const routeModule = require(routePath);

//   if (typeof routeModule === 'function') {
//     app.use('/api', routeModule);
//   }
// });

// http.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

// const express = require('express');
// const app = express();
// const cors = require('cors');
// const fs = require('fs');
// const path = require('path');
// const http = require('http').Server(app);

// const hostname = '127.0.0.1';
// const port = 3000;

// // Middleware para habilitar CORS
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   next();
// });

// app.use(express.json());
// // Configurar CORS
// app.use(cors());

// // Rutas dinámicas
// const routesDirectory = path.join(__dirname, 'src', 'routes');
// const routeFiles = fs.readdirSync(routesDirectory);

// routeFiles.forEach((routeFile) => {
//   const routePath = path.join(routesDirectory, routeFile);
//   const routeModule = require(routePath);

//   if (typeof routeModule === 'function') {
//     app.use('/api/',routeModule);
//   }
// });

// http.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });