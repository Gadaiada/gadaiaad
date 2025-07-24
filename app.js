import express from 'express';
import dotenv from 'dotenv';
import webhook from './webhook.js';

dotenv.config();

const app = express();
app.use(express.json());

app.post('/webhook', webhook);

app.listen(3000, () => {
  console.log('🚀 Servidor iniciado na porta 3000');
});
