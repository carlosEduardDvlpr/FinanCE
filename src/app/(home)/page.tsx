import { redirect } from 'next/navigation';
import { getAuthenticatedUser } from '../../../actions/GET/get-authenticated-user/get-authenticated-user';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default async function HomePage() {
  const { user, success } = await getAuthenticatedUser();

  if (!success) {
    redirect('/login');
  }

  // className="lg:px-28 md:px-16 sm:px-8 px-4"

  return (
    <main>
      <div className="lg:px-28 md:px-16 sm:px-8 px-4 text-white sm:bg-primary/70 bg-primary py-3 flex justify-between items-center">
        <div>
          <p>Saldo da conta:</p>
          <h1 className="text-xl font-medium">R$ 3.000,00</h1>
        </div>

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
            <div className='px-4'>
              
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </main>
  );
}
