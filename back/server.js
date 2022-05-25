const cors = require("cors");
const express = require("express");
const helmet = require("helmet");

const userRoutes = require('./routes/user');
const postsRoutes = require('./routes/posts');

const PORT = process.env.PORT || 8000;

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.removeHeader('Cross-Origin-Resource-Policy'); // Protège de certaines demandes d'autres origines telles que <script> ou <img>
  res.removeHeader('Cross-Origin-Embedder-Policy'); // Permet de demander que les sous ressources soient de la même origine
  next();
})

// CORS : système de sécurité qui bloque par défaut les appels http entre les servers
app.use((req, res, next) => {
  // accéder à notre API depuis n'importe où
  res.setHeader('Access-Control-Allow-Origin', '*');
  // ajouter les headers sur nos réponses
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  // nous permet d'utiliser le CRUD
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.listen(PORT, async () => {
  console.log("Listening on: http://localhost:" + PORT);
});


app.use('/api/user', userRoutes);
app.use('/api/posts', postsRoutes);