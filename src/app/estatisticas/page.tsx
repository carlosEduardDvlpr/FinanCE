import { redirect } from 'next/navigation';
import { getAuthenticatedUser } from '../../../actions/GET/get-authenticated-user/get-authenticated-user';
import { getCurrentDate } from '../../../actions/GET/get-current-date/get-current-date';
import { Resume } from '@/components/layout/pages/estatisticas/resume/resume';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FinanCE - Estatísticas',
};

export default async function EstatisticasPage() {
  const { user, success } = await getAuthenticatedUser();

  if (!success || !user) {
    redirect('/login');
  }

  const { month, year } = await getCurrentDate();

  return (
    <main>
      <div className="lg:px-28 md:px-16 sm:px-8 px-4 text-white sm:bg-primary/70 bg-primary py-3 sm:hidden flex justify-between items-center h-[76px]">
        <h1 className="text-2xl font-bold text-white">FinanCE</h1>
      </div>
      <Resume
        incomes={user.incomes}
        month={month}
        year={year}
        expenses={user.expenses}
      />
    </main>
  );
}
