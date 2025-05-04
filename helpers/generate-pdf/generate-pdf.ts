import { TransactionProps } from '@/components/layout/pages/home/transaction-tabs/transaction-tabs';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { formatNumberToCurrency } from '../format-number-to-currency/format-number-to-currency';
import { getlabelIconCategory } from '../get-label-and-icon-category/get-label-and-icon-category';

export const generatePDF = ({
  transactions,
  totalIncome,
  totalExpense,
  balance,
}: {
  transactions: TransactionProps[];
  totalIncome: number;
  totalExpense: number;
  balance: number;
}) => {
  const doc = new jsPDF();

  // LOGO / TÍTULO
  doc.setFontSize(20);
  doc.setTextColor('#16a34a');
  doc.setFont('helvetica', 'bold');
  doc.text('FinanCE', 14, 20);

  // Subtítulo com espaçamento
  doc.setFontSize(14);
  doc.setTextColor('#000000');
  doc.setFont('helvetica', 'bold');
  doc.text('Relatório Financeiro', 14, 30);

  const sorted = [...transactions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  // TABELA
  autoTable(doc, {
    startY: 40,
    head: [['Data', 'Tipo', 'Categoria', 'Valor', 'Descrição']],
    body: sorted.map((t) => [
      new Date(t.date).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
      t.type === 'income' ? 'Entrada' : 'Despesa',
      getlabelIconCategory({ category: t.category }).label,
      formatNumberToCurrency(t.amount),
      t.description,
    ]),
    headStyles: {
      fillColor: [22, 163, 74],
      textColor: 255,
      fontStyle: 'bold',
    },
    styles: {
      font: 'helvetica',
    },
  });

  const finalY = (doc as any).lastAutoTable.finalY + 10;

  // RESUMO FINAL
  doc.setFontSize(14);
  doc.setTextColor('#000000');
  doc.setFont('helvetica', 'bold');
  doc.text('Resumo:', 14, finalY);

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(
    `Total de Entradas: ${formatNumberToCurrency(totalIncome)}`,
    14,
    finalY + 10,
  );
  doc.text(
    `Total de Despesas: ${formatNumberToCurrency(totalExpense)}`,
    14,
    finalY + 18,
  );
  doc.text(`Saldo Final: ${formatNumberToCurrency(balance)}`, 14, finalY + 26);

  doc.save('relatorio-financeiro.pdf');
};
