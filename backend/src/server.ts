const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Importa os controladores
// const usuarioRouter = require('./src/routes/usuario');

// Rotas
// app.use('/usuarios', usuarioRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});