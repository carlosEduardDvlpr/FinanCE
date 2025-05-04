import { TransactionProps } from '@/components/layout/pages/home/transaction-tabs/transaction-tabs';
import { monthNames } from '../../constants/month-names/month-names';

type Result = {
  months: { [key: number]: string };
  filteredIncomes: TransactionProps[];
  filteredExpenses: TransactionProps[];
  currentBalance: number;
};

export function organizeTransactionByMonth(
  data: TransactionProps[],
  targetMonth: number,
  targetYear: number,
): Result {
  const months: { [key: number]: string } = {};

  const filtered = data.filter((item) => {
    const itemMonth = new Date(item.date).getMonth();
    const itemYear = new Date(item.date).getFullYear();
    return itemMonth === targetMonth && itemYear === targetYear;
  });

  for (const item of data) {
    const monthIndex = new Date(item.date).getMonth();
    months[monthIndex] = monthNames[monthIndex];
  }

  const filteredIncomes = filtered.filter((item) => item.type === 'income');
  const filteredExpenses = filtered.filter((item) => item.type === 'expense');

  const totalIncome = filteredIncomes
    .map((inc) => inc.amount)
    .reduce((prev, current) => {
      return prev + current;
    }, 0);
  const totalExpenses = filteredExpenses
    .map((inc) => inc.amount)
    .reduce((prev, current) => {
      return prev + current;
    }, 0);

  const currentBalance = totalIncome - totalExpenses;

  return {
    months,
    filteredIncomes,
    filteredExpenses,
    currentBalance,
  };
}
