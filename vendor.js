import axios from 'axios';

export async function criarVendedorWebkul({ email, nome, senha }) {
  const url = `${process.env.WEBSKULL_API_BASE}${process.env.WEBSKULL_API_CREATE_SELLER_PATH}`;
  console.log('[webkul] 📤 Enviando dados para criação:', { email, nome });

  const response = await axios.post(
    url,
    {
      seller: {
        email,
        first_name: nome,
        password: senha
      }
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.WEBSKULL_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  );

  console.log('[webkul] ✅ Vendedor criado:', response.data);
  return response.data;
}
