import { redirect } from 'next/navigation';
import { getAuthenticatedUser } from '../../../actions/GET/get-authenticated-user/get-authenticated-user';
import { TransactionTabs } from '@/components/layout/pages/home/transaction-tabs/transaction-tabs';
import { getCurrentDate } from '../../../actions/GET/get-current-date/get-current-date';

export default async function HomePage() {
  const { user, success } = await getAuthenticatedUser();

  if (!success || !user) {
    redirect('/login');
  }

  const { month, year } = await getCurrentDate();

  return (
    <main>
      <TransactionTabs
        idUser={user.id}
        incomes={user.incomes}
        month={month}
        year={year}
        expenses={user.expenses}
      />
    </main>
  );
}
