import {
  Apple,
  Armchair,
  BookOpen,
  Bus,
  CreditCard,
  HelpCircleIcon,
  Home,
  UserPlus,
} from 'lucide-react';

interface DescriptionCategoryProps {
  category:
    | 'home'
    | 'food'
    | 'transport'
    | 'personal'
    | 'education'
    | 'leisure'
    | 'debt'
    | 'others'
    | 'income';
}

export function getlabelIconCategory({ category }: DescriptionCategoryProps) {
  const categoryObject = {
    home: { label: 'Casa', icon: Home },
    food: { label: 'Alimentação', icon: Apple },
    transport: { label: 'Transporte', icon: Bus },
    personal: { label: 'Pessoal', icon: UserPlus },
    education: { label: 'Estudos', icon: BookOpen },
    leisure: { label: 'Lazer', icon: Armchair },
    debt: { label: 'Dívidas', icon: CreditCard },
    others: { label: 'Outros', icon: HelpCircleIcon },
    income: { label: '', icon: HelpCircleIcon },
  };
  return categoryObject[category];
}
