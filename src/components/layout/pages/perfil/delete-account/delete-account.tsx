'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { deleteAccount } from '../../../../../../actions/DELETE/delete-account/delete-account';

export function DeleteAccount({ userId }: { userId: number }) {
  
  const handleDeleteAccount = async () => {
    await deleteAccount({ accountId: userId });
  };

  const [open, setOpen] = useState(false);

  return (
    <div className="sm:mb-6 mb-24 flex justify-between items-center">
      <h1 className="text-base font-bold">Deletar Conta</h1>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="text-sm bg-red-600 hover:bg-red-700">
            Quero deletar minha conta
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>ATENÇÃO</DialogTitle>
            <DialogDescription className="sm:text-center text-left">
              Ao excluir sua conta, você perderá todos os dados. Essa ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>Você tem certeza que deseja excluir sua conta ?</p>
          </div>
          <DialogFooter>
            <div className="flex gap-2">
              <DialogClose asChild>
                <Button className="flex-1" type="button">
                  Fechar
                </Button>
              </DialogClose>
              <Button
                className="text-sm bg-red-600 hover:bg-red-700"
                onClick={handleDeleteAccount}
              >
                Confirmar
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
