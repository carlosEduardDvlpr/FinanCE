import { ChartLine, Layers, Sheet, User } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="lg:px-28 md:px-16 sm:px-8 px-4 flex items-center justify-between bg-primary sm:h-[70px] sm:relative fixed bottom-0 w-full">
      <h1 className="text-2xl sm:block hidden font-bold text-white">Finance</h1>
      <nav className="text-white sm:w-auto w-full flex gap-4 text-base">
        <Link
          className="hover:underline items-center sm:py-0 py-4 justify-center flex gap-2 flex-1 text-center sm:border-0 border-r"
          href="/"
        >
          Contas
          <Layers size={16} />
        </Link>
        <Link
          className="hover:underline items-center sm:py-0 py-4 justify-center flex gap-2 flex-1 text-center sm:border-0 border-r"
          href="/estatisticas"
        >
          Resumo
          <ChartLine size={16} />
        </Link>
        <Link
          className="hover:underline items-center sm:py-0 py-4 justify-center flex gap-2 flex-1 text-center"
          href="/perfil"
        >
          Perfil
          <User size={16} />
        </Link>
      </nav>
    </header>
  );
}
