import { gerarSenha } from './utils.js';
import { salvarVendedor } from './db.js';
import { criarVendedorWebkul } from './vendor.js';

export default async (req, res) => {
  console.log('[webhook] 🔔 Payload recebido:', req.body);

  const event = req.body?.event;
  const payment = req.body?.payment;

  const subscriptionId = payment?.subscription;
  const status = payment?.status;
  const email = payment?.email || req.body?.customer?.email;

  if (!event || !payment || !subscriptionId || !status || !email) {
    console.warn('[webhook] ⚠️ Campos ausentes no webhook');
    return res.status(400).json({ error: 'Webhook incompleto' });
  }

  if (event !== 'PAYMENT_CONFIRMED' || status !== 'CONFIRMED') {
    console.log('[webhook] ⏭️ Evento ignorado:', event, status);
    return res.status(200).json({ message: 'Evento ignorado' });
  }

  const senha = gerarSenha(process.env.VENDOR_PASSWORD_LENGTH || 10);

  const novoVendedor = {
    id: subscriptionId,
    email,
    nome: 'Novo Vendedor',
    senha
  };

  try {
    await criarVendedorWebkul(novoVendedor);
    salvarVendedor(novoVendedor);
    console.log('[webhook] ✅ Vendedor criado:', novoVendedor);
    return res.status(200).json({ message: 'Vendedor criado com sucesso' });
  } catch (err) {
    console.error('[webhook] ❌ Erro ao criar vendedor:', err.message);
    return res.status(500).json({ error: 'Erro ao criar vendedor' });
  }
};
