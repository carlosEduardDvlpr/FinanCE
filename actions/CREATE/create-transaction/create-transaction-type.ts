import { transactions } from '@prisma/client';

export interface CreateTransactionProps {
  amount: number;
  description: string;
  type: transactions['type'];
  category: transactions['category'];
  user_id: number;
}
