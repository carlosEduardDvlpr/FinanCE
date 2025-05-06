import { Metadata } from 'next';
import { getAuthenticatedUser } from '../../../actions/GET/get-authenticated-user/get-authenticated-user';
import { redirect } from 'next/navigation';
import { ThemeToggle } from '@/components/layout/pages/perfil/toggle-theme/toggle-theme';
import { Separator } from '@/components/ui/separator';
import EditUserForm from '@/components/layout/pages/perfil/edit-user-form/edit-user-form';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { DeleteAccount } from '@/components/layout/pages/perfil/delete-account/delete-account';
import { LogoutUserButton } from '@/components/layout/pages/perfil/logout-user/logout-user';

export const metadata: Metadata = {
  title: 'FinanCE - Login',
};

export default async function PerfilPage() {
  // TODO - pageuser, exibir dados do usuário, editar dados do usuário (nome, nomeuser e senha), excluir conta do usuário
  // TODO - remover imports não utilizados e consoles.log() desnecessários
  // TODO - deletar conta
  const { user, success } = await getAuthenticatedUser();

  if (!success || !user) {
    redirect('/login');
  }

  return (
    <main>
      <div className="lg:px-28 md:px-16 sm:px-8 px-4 text-white sm:bg-primary/70 bg-primary py-3 sm:hidden flex justify-between items-center h-[76px]">
        <h1 className="text-2xl font-bold text-white">FinanCE</h1>
      </div>
      <div className="flex justify-between items-center lg:px-28 md:px-16 sm:px-8 px-4 py-6">
        <h1 className="text-base sm:block hidden">Perfil / Ajustes</h1>
        <ThemeToggle />
        <LogoutUserButton />
      </div>

      <div className="lg:px-28 md:px-16 sm:px-8 px-4">
        <EditUserForm
          data={{ name: user.name, username: user.username, id: user.id }}
        />
      </div>
      <Separator className="my-6" />
      <div className="lg:px-28 md:px-16 sm:px-8 px-4">
        <DeleteAccount userId={user.id} />
      </div>
    </main>
  );
}
