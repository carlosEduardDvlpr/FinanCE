'use client';

import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { deleteCookies } from '../../../../../../actions/DELETE/delete-cookies/delete-cookies';

export function LogoutUserButton() {
  const handleLogout = async () => {
    await deleteCookies();
  };

  return (
    <Button onClick={handleLogout}>
      LogOut <LogOut />
    </Button>
  );
}
