'use client';
import { ViewEntradas } from '@/components/layout/pages/home/view-entradas/view-entradas';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ViewSaidas } from '@/components/layout/pages/home/view-saidas/view-saidas';
import { Button } from '@/components/ui/button';
import { $Enums } from '@prisma/client';
import React from 'react';
import { AddTransactionMenu } from '../add-transaction-menu/add-transaction-menu';
import { organizeTransactionByMonth } from '../../../../../../helpers/organize-transactions-by-month/organize-transactions-by-month';
import { monthNames } from '../../../../../../constants/month-names/month-names';
import { formatNumberToCurrency } from '../../../../../../helpers/format-number-to-currency/format-number-to-currency';

export interface TransactionProps {
  amount: number;
  id: number;
  user_id: number;
  type: $Enums.transactions_type;
  description: string;
  date: Date;
  category: $Enums.transactions_category;
}

export function TransactionTabs({
  incomes,
  expenses,
  month,
  year,
  idUser,
}: {
  incomes: TransactionProps[];
  expenses: TransactionProps[];
  month: number;
  year: number;
  idUser: number;
}) {
  const [currentMonth, setCurrentMonth] = React.useState(month);

  const { filteredExpenses, filteredIncomes, months, currentBalance } =
    organizeTransactionByMonth([...expenses, ...incomes], currentMonth, year);

  return (
    <>
      <div className="lg:px-28 md:px-16 sm:px-8 px-4 text-white sm:bg-primary/70 bg-primary py-3 flex justify-between items-center">
        <div>
          {currentMonth === new Date().getMonth() ? (
            <p>Saldo - mês atual:</p>
          ) : (
            <p>Saldo final - {months[currentMonth]}</p>
          )}
          <h1 className="text-xl font-medium">
            {formatNumberToCurrency(currentBalance)}
          </h1>
        </div>

        {currentMonth === new Date().getMonth() && (
          <AddTransactionMenu userID={idUser} />
        )}
      </div>

      <div className="lg:px-28 md:px-16 sm:px-8 px-4">
        <div className="flex justify-between items-center my-10">
          <Button
          className='dark:text-white'
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
          className='dark:text-white'
            disabled={
              !months[currentMonth + 1] &&
              currentMonth + 1 !== new Date().getMonth()
            }
            onClick={() => setCurrentMonth(currentMonth + 1)}
          >
            {'>'}
          </Button>
        </div>

        <Tabs defaultValue="entradas">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger className="cursor-pointer " value="entradas">
              Entradas
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="saidas">
              Saídas
            </TabsTrigger>
          </TabsList>
          <TabsContent value="entradas">
            <div>
              <ViewEntradas
                currentMonth={currentMonth}
                incomes={filteredIncomes}
              />
            </div>
          </TabsContent>
          <TabsContent value="saidas">
            <div>
              <ViewSaidas
                currentMonth={currentMonth}
                expenses={filteredExpenses}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
