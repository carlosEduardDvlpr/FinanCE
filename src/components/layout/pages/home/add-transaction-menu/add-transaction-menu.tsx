'use client';
import CurrencyInput from 'react-currency-input-field';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Apple,
  Armchair,
  BookOpen,
  Bus,
  CreditCard,
  HelpCircle,
  Home,
  Loader2,
  Plus,
  UserPlus,
} from 'lucide-react';
import React from 'react';
import { getDescriptionCategory } from '../../../../../../helpers/get-description-category/get-description-category';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { createTransaction } from '../../../../../../actions/CREATE/create-transaction/create-transaction';

interface TransactionProps {
  transactionType: 'expense' | 'income';
  transactionCategory:
    | 'home'
    | 'food'
    | 'transport'
    | 'personal'
    | 'education'
    | 'leisure'
    | 'debt'
    | 'others'
    | 'income';
  transactionValue: string;
  transactionDescription: string;
}

export function AddTransactionMenu({ userID }: { userID: number }) {
  const formDataObject: TransactionProps = {
    transactionType: 'expense',
    transactionCategory: 'home',
    transactionDescription: '',
    transactionValue: '',
  };

  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] =
    React.useState<TransactionProps>(formDataObject);

  const handleSelectTransactionType = (
    value: TransactionProps['transactionType'],
  ) => {
    setFormData({
      ...formData,
      transactionCategory: value === 'income' ? 'income' : 'home',
      transactionType: value,
    });
  };
  const handleSelectTransactionCategory = (
    value: TransactionProps['transactionCategory'],
  ) => {
    setFormData({ ...formData, transactionCategory: value });
  };

  const handleValueChange = (value: string | undefined) => {
    const splittedValue = value?.split(',')[0];
    if (splittedValue?.length! > 6) {
      return;
    }

    if (value?.length! < 1) {
      return;
    }

    setFormData({ ...formData, transactionValue: value ?? '' });
  };

  const handleCreateTransaction = async () => {
    setIsLoading(true);

    if (
      !formData.transactionCategory ||
      !formData.transactionType ||
      !formData.transactionValue ||
      !formData.transactionDescription
    ) {
      toast.error('Informe todos os dados da transação!');
      setIsLoading(false);
      return;
    }

    if (Number(formData.transactionValue.replace(',', '.')) < 0.01) {
      toast.error('Informe um valor de transação maior que R$ 0!');
      setIsLoading(false);
      return;
    }

    const amount = Number(formData.transactionValue.replace(',', '.'));
    const { success, message } = await createTransaction({
      amount,
      category: formData.transactionCategory,
      description: formData.transactionDescription,
      type: formData.transactionType,
      user_id: userID,
    });

    if (success) {
      setFormData({
        ...formDataObject,
        transactionType: formData.transactionType,
      });
      setIsLoading(false);
      toast.success(message);
    } else {
      setIsLoading(false);
      toast.success(message);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-background hover:bg-foreground hover:text-background text-foreground">
          entrada/saída <Plus />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Adicione entrada/saída</SheetTitle>
          <SheetDescription>
            Preencha as informações da transação:
          </SheetDescription>
        </SheetHeader>
        <div className="px-4 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>Selecione o tipo de transação</Label>
            <Select
              value={formData.transactionType}
              onValueChange={handleSelectTransactionType}
            >
              <SelectTrigger className="sm:w-3/4 w-full">
                <SelectValue placeholder="Transação" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tipo</SelectLabel>
                  <SelectItem value="income">Entrada</SelectItem>
                  <SelectItem value="expense">Saída</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {formData.transactionType === 'expense' && (
            <div className="flex flex-col gap-2">
              <Label>Selecione o tipo de categoria</Label>
              <Select
                value={formData.transactionCategory}
                onValueChange={handleSelectTransactionCategory}
              >
                <SelectTrigger className="sm:w-3/4 w-full">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categorias</SelectLabel>
                    <SelectItem value="home">
                      <Home /> Casa
                    </SelectItem>
                    <SelectItem value="food">
                      <Apple /> Alimentação
                    </SelectItem>
                    <SelectItem value="transport">
                      <Bus /> Transporte
                    </SelectItem>
                    <SelectItem value="education">
                      <BookOpen /> Estudos
                    </SelectItem>
                    <SelectItem value="leisure">
                      <Armchair /> Lazer
                    </SelectItem>
                    <SelectItem value="debt">
                      <CreditCard /> Dívidas
                    </SelectItem>
                    <SelectItem value="personal">
                      <UserPlus /> Pessoal
                    </SelectItem>
                    <SelectItem value="others">
                      <HelpCircle /> Outros
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {getDescriptionCategory({
                  category: formData.transactionCategory,
                })}
              </p>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Label>Descrição</Label>
            <Input
              type="text"
              maxLength={40}
              value={formData.transactionDescription}
              onChange={(e) => {
                if (e.target.value.length > 40) {
                  return;
                }
                setFormData({
                  ...formData,
                  transactionDescription: e.target.value,
                });
              }}
              placeholder="Descreve a transação"
              className="sm:w-3/4"
            />
          </div>

          <Label>Valor</Label>
          <CurrencyInput
            prefix="R$ "
            value={formData.transactionValue}
            decimalSeparator=","
            groupSeparator="."
            className="py-1 px-2 border-2 rounded-md sm:w-3/4"
            decimalsLimit={2}
            maxLength={9}
            onValueChange={handleValueChange}
            placeholder="Digite o valor"
          />
          <Button
            className="dark:text-white"
            disabled={
              isLoading ||
              !formData.transactionCategory ||
              !formData.transactionType ||
              !formData.transactionValue ||
              !formData.transactionDescription
            }
            onClick={handleCreateTransaction}
          >
            {isLoading && <Loader2 className="animate-spin" />}
            Adicionar transação
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
