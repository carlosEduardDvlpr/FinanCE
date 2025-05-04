'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { $Enums } from '@prisma/client';
import { getlabelIconCategory } from '../../../../../../helpers/get-label-and-icon-category/get-label-and-icon-category';
import { Button } from '@/components/ui/button';
import { HelpCircle, Trash } from 'lucide-react';
import { deleteAccount } from '../../../../../../actions/DELETE/delete-account/delete-account';
import { toast } from 'sonner';
import { group } from 'console';

interface ViewSaidasProps {
  amount: number;
  id: number;
  user_id: number;
  type: $Enums.transactions_type;
  description: string;
  date: Date;
  category: $Enums.transactions_category;
}

export function ViewSaidas({
  expenses,
  currentMonth,
}: {
  expenses: ViewSaidasProps[] | undefined;
  currentMonth: number;
}) {
  if (!expenses) return;

  const grouped: { category: string; total: number }[] = Object.entries(
    expenses.reduce<Record<string, number>>((acc, { category, amount }) => {
      acc[category] = (acc[category] || 0) + amount;
      return acc;
    }, {}),
  ).map(([category, total]) => ({ category, total }));

  const handleDeleteAccount = async (id: number) => {
    const { success } = await deleteAccount({ accountId: id });

    if (success) {
      toast.success('Conta excluída com sucesso!');
      return;
    }
    toast.error('Erro ao excluir conta, tente novamente...');
  };

  return (
    <>
      {expenses.length > 0 && (
        <>
          <p className="py-4 text-lg font-medium">Despesas por categoria</p>
          <div className="flex gap-3 justify-between overflow-auto py-3">
            {grouped?.map((a) => {
              const data = getlabelIconCategory({
                category: a.category as ViewSaidasProps['category'],
              });
              return (
                <div
                  key={a.category}
                  className="shadow-md flex-1 bg-card border py-2 flex flex-col gap-1.5 items-center justify-center rounded-md w-auto min-w-28 min-h-24"
                >
                  <p className="text-center font-medium">{data.label}</p>
                  <p className="flex justify-center">
                    <data.icon size={24} className="text-primary" />
                  </p>

                  <p className="text-center sm:text-base text-sm">
                    {a.total.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </p>
                </div>
              );
            })}
          </div>
        </>
      )}

      <p className="py-4 text-lg font-medium">Saídas</p>
      <div className="flex mb-24 flex-col gap-3">
        {expenses?.length
          ? expenses
              ?.sort((a, b) => b.date.getTime() - a.date.getTime())
              .map((expense) => {
                const data = getlabelIconCategory({
                  category: expense.category,
                });

                return (
                  <Card
                    key={expense.id}
                    className="shadow-md border rounded-2xl"
                  >
                    <CardContent>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-base font-medium">
                            {expense.description.includes(' ')
                              ? expense.description
                              : expense.description.length < 15
                              ? expense.description
                              : expense.description
                                  .substring(0, 15)
                                  .concat('...')}
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            Categoria:{' '}
                            {
                              getlabelIconCategory({
                                category: expense.category,
                              }).label
                            }{' '}
                            <data.icon className="inline" size={16} />
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(expense.date).toLocaleDateString(
                              'pt-BR',
                              {
                                minute: 'numeric',
                                hour: 'numeric',
                              },
                            )}
                          </p>{' '}
                          <span className={`text-lg font-bold text-red-600`}>
                            -{' '}
                            {expense.amount.toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            })}
                          </span>
                        </div>

                        <div className="flex flex-col gap-2">
                          {currentMonth === new Date().getMonth() && (
                            <Button
                              className="dark:text-white"
                              onClick={() => handleDeleteAccount(expense.id)}
                            >
                              <Trash />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
          : 'Nenhuma saída registrada...'}
      </div>
    </>
  );
}
