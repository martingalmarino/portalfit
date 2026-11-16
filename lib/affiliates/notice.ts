export function blockHasAffiliate(products: Array<{ afiliado: boolean }>): boolean {
  return products.some((item) => item.afiliado);
}
