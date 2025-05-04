'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { $Enums } from '@prisma/client';
import { Trash } from 'lucide-react';
import { deleteAccount } from '../../../../../../actions/DELETE/delete-account/delete-account';
import { toast } from 'sonner';

interface ViewEntradasProps {
  amount: number;
  id: number;
  user_id: number;
  type: $Enums.transactions_type;
  description: string;
  date: Date;
  category: $Enums.transactions_category;
}

export function ViewEntradas({
  incomes,
  currentMonth,
}: {
  incomes: ViewEntradasProps[] | undefined;
  currentMonth: number;
}) {
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
      <p className="py-4 text-lg font-medium">Entradas</p>
      <div className="flex mb-24 flex-col gap-3">
        {incomes?.length
          ? incomes
              ?.sort((a, b) => b.date.getTime() - a.date.getTime())
              .map((income) => (
                <Card key={income.id} className="shadow-md border rounded-2xl">
                  <CardContent>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-base font-medium">
                          {income.description.includes(' ')
                            ? income.description
                            : income.description.length < 15
                            ? income.description
                            : income.description.substring(0, 15).concat('...')}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(income.date).toLocaleDateString('pt-BR', {
                            minute: 'numeric',
                            hour: 'numeric',
                          })}
                        </p>{' '}
                        <span className={`text-lg font-bold text-primary`}>
                          {income.amount.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </span>
                      </div>

                      <div className="flex flex-col gap-2">
                        {currentMonth === new Date().getMonth() && (
                          <Button
                            className="dark:text-white"
                            onClick={() => handleDeleteAccount(income.id)}
                          >
                            <Trash />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
          : 'Nenhuma entrada registrada...'}
      </div>
    </>
  );
}
