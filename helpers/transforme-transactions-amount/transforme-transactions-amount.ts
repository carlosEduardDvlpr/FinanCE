import { transactions } from '@prisma/client';

interface TransformeTransactionsAmountProps {
  transactions: transactions[];
  type: transactions['type'];
}

export function transformeTransactionsAmount({
  transactions,
  type,
}: TransformeTransactionsAmountProps) {
  const transformedTransactionsAmount = transactions
    .map((transaction) => {
      const numberValue = transaction.amount.toNumber();
      return { ...transaction, amount: numberValue };
    })
    .filter((t) => t.type === type);

  return transformedTransactionsAmount;
}
