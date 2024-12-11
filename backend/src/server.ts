const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Importa os controladores
import userRouter from './routes/userRouter';
import pedidoRouter from './routes/pedidoRouter';
import restauranteRouter from './routes/restauranteRouter';
import itemPedidoRouter from './routes/itemPedidoRouter';
import itemCardapioRouter from './routes/itemCardapioRouter';

app.use(cors());
app.use(express.json());

// Rotas
app.use('/user', userRouter);
app.use('/pedido', pedidoRouter);
app.use('/restaurante', restauranteRouter);
app.use('/itemPedido', itemPedidoRouter);
app.use('/itemCardapio', itemCardapioRouter);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});