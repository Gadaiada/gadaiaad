export const vendedores = [];

export function salvarVendedor(vendedor) {
  const duplicado = vendedores.find(v => v.id === vendedor.id);
  if (duplicado) {
    console.log('[db] ⚠️ Vendedor já registrado:', vendedor.id);
    return;
  }
  vendedores.push(vendedor);
  console.log('[db] 💾 Vendedor salvo:', vendedor);
}
