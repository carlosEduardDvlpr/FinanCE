'use client';
import { Button } from '@/components/ui/button';
import { $Enums } from '@prisma/client';
import React from 'react';
import { organizeTransactionByMonth } from '../../../../../../helpers/organize-transactions-by-month/organize-transactions-by-month';
import { monthNames } from '../../../../../../constants/month-names/month-names';
import { formatNumberToCurrency } from '../../../../../../helpers/format-number-to-currency/format-number-to-currency';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExpensePieChart } from '../expenses-pie-chart/expenses-pie-chart';
import { Download } from 'lucide-react';
import { generatePDF } from '../../../../../../helpers/generate-pdf/generate-pdf';

export interface TransactionProps {
  amount: number;
  id: number;
  user_id: number;
  type: $Enums.transactions_type;
  description: string;
  date: Date;
  category: $Enums.transactions_category;
}

export function Resume({
  incomes,
  expenses,
  month,
  year,
}: {
  incomes: TransactionProps[];
  expenses: TransactionProps[];
  month: number;
  year: number;
}) {
  const [currentMonth, setCurrentMonth] = React.useState(month);

  const { filteredExpenses, filteredIncomes, months, currentBalance } =
    organizeTransactionByMonth([...expenses, ...incomes], currentMonth, year);

  const totalExpenses = filteredExpenses.reduce(
    (acc, curr) => acc + curr.amount,
    0,
  );
  const totalIncomes = filteredIncomes.reduce(
    (acc, curr) => acc + curr.amount,
    0,
  );
  const allTransactions = [...filteredExpenses, ...filteredIncomes];

  return (
    <>
      <div className="lg:px-28 md:px-16 sm:px-8 px-4">
        <div className="flex justify-between items-center my-10">
          <Button
            disabled={!months[currentMonth - 1]}
            onClick={() => setCurrentMonth(currentMonth - 1)}
          >
            {'<'}
          </Button>
          <div className="text-center">
            <p className="capitalize">{monthNames[currentMonth]}</p>
            <p className="text-xs">{year}</p>
          </div>
          <Button
            disabled={
              !months[currentMonth + 1] &&
              currentMonth + 1 !== new Date().getMonth()
            }
            onClick={() => setCurrentMonth(currentMonth + 1)}
          >
            {'>'}
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Receitas Totais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-center text-left font-bold text-green-600">
                {formatNumberToCurrency(totalIncomes)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Despesas Totais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-center text-left font-bold text-red-600">
                {formatNumberToCurrency(totalExpenses)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Saldo Final</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`text-xl sm:text-center text-left font-bold ${
                  currentBalance >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {formatNumberToCurrency(currentBalance)}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="lg:px-28 md:px-16 sm:px-8 px-4 flex flex-col gap-3 sm:mb-6 mb-24">
        <ExpensePieChart data={allTransactions} />
        {allTransactions.length > 0 && (
          <Button
            className="w-full sm:w-1/2 self-end"
            size="icon"
            onClick={() =>
              generatePDF({
                balance: currentBalance,
                totalExpense: totalExpenses,
                totalIncome: totalIncomes,
                transactions: [...filteredExpenses, ...filteredIncomes],
              })
            }
          >
            Download PDF <Download />
          </Button>
        )}
      </div>
    </>
  );
}
