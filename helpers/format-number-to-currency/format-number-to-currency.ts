export function formatNumberToCurrency(number: number) {
  const formattedNumber = number.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  return formattedNumber;
}
