export function gerarSenha(tamanho = 10) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789';
  return Array.from({ length: tamanho }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}
