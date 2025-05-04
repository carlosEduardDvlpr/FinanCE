import { CadastroForm } from '@/components/layout/pages/cadastro/cadastro-form/cadastro-form';
import { getAuthenticatedUser } from '../../../actions/GET/get-authenticated-user/get-authenticated-user';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FinanCE - Cadastre-se',
};

export default async function CadastroPage() {
  const { success } = await getAuthenticatedUser();

  if (success) {
    redirect('/');
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <img
          src="/assets/images/login.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-contain dark:brightness-[0.9]"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <CadastroForm />
          </div>
        </div>
      </div>
    </div>
  );
}
