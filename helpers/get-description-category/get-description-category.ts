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

export function getDescriptionCategory({ category }: DescriptionCategoryProps) {
  const categoryObject = {
    home: 'Despesas fixas como condomínio, aluguel, energia elétrica, água, internet, telefone, TV, assinaturas, etc.',
    food: 'Supermercado, restaurante, lanches, delivery, etc.',
    transport:
      'Combustível, transporte público, uber / táxi, manutenção / seguro do carro, etc.',
    personal:
      'Academia, cursos, salão, barbearia, cosméticos, roupas, calçados, remédios, consultas, etc.',
    education:
      'Mensalidade escolar/faculdade, material didático, livros, cursos, etc.',
    leisure: 'Viagens, cinema, shows, eventos, hobbies, jogos, compras, etc.',
    debt: 'Cartão de crédito, empréstimos, financiamentos, investimentos, poupança, etc.',
    others: 'Presentes, doações, multas, juros, imprevistos, etc.',
    income: 'Entrada de saldo.',
  };
  return categoryObject[category];
}
