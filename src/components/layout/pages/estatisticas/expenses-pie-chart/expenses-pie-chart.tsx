'use client';

import { useState } from 'react';
import { Cell, Pie, PieChart, Sector } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import { getlabelIconCategory } from '../../../../../../helpers/get-label-and-icon-category/get-label-and-icon-category';
import { formatNumberToCurrency } from '../../../../../../helpers/format-number-to-currency/format-number-to-currency';
import { TransactionProps } from '../resume/resume';

// Tipos para o componente
export interface ExpensePieData {
  name: string;
  value: number;
}

export function ExpensePieChart({ data }: { data: TransactionProps[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const formatCategoryName = (category: string): string => {
    const categoryMap: Record<string, string> = {
      food: getlabelIconCategory({ category: 'food' }).label,
      debt: getlabelIconCategory({ category: 'debt' }).label,
      education: getlabelIconCategory({ category: 'education' }).label,
      home: getlabelIconCategory({ category: 'home' }).label,
      income: getlabelIconCategory({ category: 'income' }).label,
      leisure: getlabelIconCategory({ category: 'leisure' }).label,
      others: getlabelIconCategory({ category: 'others' }).label,
      personal: getlabelIconCategory({ category: 'personal' }).label,
      transport: getlabelIconCategory({ category: 'transport' }).label,
    };

    return categoryMap[category] || category;
  };

  const processExpenseData = (
    transactions: TransactionProps[],
  ): ExpensePieData[] => {
    const expensesByCategory = transactions
      .filter((item) => item.type === 'expense')
      .reduce<Record<string, number>>((acc, item) => {
        const category = item.category;
        if (!acc[category]) {
          acc[category] = 0;
        }
        acc[category] += item.amount;
        return acc;
      }, {});

    return Object.entries(expensesByCategory).map(([name, value]) => ({
      name: formatCategoryName(name),
      value,
    }));
  };
  const transactions = processExpenseData(data);

  const getCategoryColor = (categoryName: string): string => {
    if (LABEL_COLORS[categoryName]) {
      return LABEL_COLORS[categoryName];
    }
    const categoryKey = Object.keys(CATEGORY_COLORS).find(
      (key) => formatCategoryName(key) === categoryName,
    );

    return categoryKey ? CATEGORY_COLORS[categoryKey] : '#64748b';
  };

  // Mapeamento de categorias para cores
  const CATEGORY_COLORS: Record<string, string> = {
    food: '#22c55e', // Verde
    debt: '#ef4444', // Vermelho
    education: '#3b82f6', // Azul
    home: '#8b5cf6', // Roxo
    income: '#15803d', // Verde escuro
    leisure: '#f59e0b', // Amarelo
    others: '#64748b', // Cinza
    personal: '#ec4899', // Rosa
    transport: '#0ea5e9', // Azul claro
  };

  // Mapeamento de labels para cores
  const LABEL_COLORS: Record<string, string> = {
    Alimentação: '#22c55e',
    Dívidas: '#ef4444',
    Educação: '#3b82f6',
    Casa: '#8b5cf6',
    Receitas: '#15803d',
    Lazer: '#f59e0b',
    Outros: '#64748b',
    Pessoal: '#ec4899',
    Transporte: '#0ea5e9',
  };

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const renderActiveShape = (props: any) => {
    const {
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;

    return (
      <g>
        <text x={cx} y={cy} dy={-20} textAnchor="middle" fill="#888888">
          {payload.name}
        </text>
        <text
          x={cx}
          y={cy}
          dy={10}
          textAnchor="middle"
          fill="#000000"
          className="text-base dark:fill-white font-semibold"
        >
          {formatNumberToCurrency(value)}
        </text>
        <text x={cx} y={cy} dy={30} textAnchor="middle" fill="#888888">
          {`${(percent * 100).toFixed(1)}%`}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };

  const generateChartConfig = () => {
    const config: Record<string, { label: string; color: string }> = {};
    Object.entries(LABEL_COLORS).forEach(([key, color]) => {
      config[key] = {
        label: key,
        color: color,
      };
    });

    return config;
  };

  if (!transactions.length) {
    return null;
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between rounded-lg border-2">
      <h1 className="font-medium sm:pl-6 sm:pt-0 pt-6">
        Despesas por categoria
      </h1>

      <ChartContainer className="h-60 w-2/3" config={generateChartConfig()}>
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={transactions}
            innerRadius={60}
            outerRadius={80}
            dataKey="value"
            onMouseEnter={onPieEnter}
          >
            {transactions.map((entry, index) => {
              const color = getCategoryColor(entry.name);
              return <Cell key={`cell-${index}`} fill={color} />;
            })}
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
}
