import { redirect } from 'next/navigation';
import { getAuthenticatedUser } from '../../../actions/GET/get-authenticated-user/get-authenticated-user';
import { getCurrentDate } from '../../../actions/GET/get-current-date/get-current-date';
import { Resume } from '@/components/layout/pages/estatisticas/resume/resume';

export default async function EstatisticasPage() {
  const { user, success } = await getAuthenticatedUser();

  if (!success || !user) {
    redirect('/login');
  }

  const { month, year } = await getCurrentDate();

  return (
    <main>
      <Resume
        incomes={user.incomes}
        month={month}
        year={year}
        expenses={user.expenses}
      />
    </main>
  );
}
