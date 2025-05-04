'use client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { getUserLogin } from '../../../../../../actions/GET/get-user-login/get-user-login';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'form'>) {
  const formDataObject = {
    username: '',
    password: '',
  };
  const [formData, setFormData] = React.useState(formDataObject);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [typeInput, setTypeInput] = React.useState<'password' | 'text'>(
    'password',
  );

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    (document.activeElement as HTMLElement)?.blur();

    const validations = [
      {
        condition: !formData.username || !formData.password,
        message: 'Preencha todos os dados!',
      },
      {
        condition: formData.username.length < 8,
        message: 'Nome de usuário - mínimo 8 caracteres!',
      },
      {
        condition: formData.password.length < 8,
        message: 'Senha - mínimo 8 caracteres!',
      },
    ];

    for (let validation of validations) {
      if (validation.condition) {
        setErrorMessage(validation.message);
        setIsLoading(false);
        return;
      }
    }

    try {
      const { message, success } = await getUserLogin(formData);

      if (!success) {
        setErrorMessage(message);
        setIsLoading(false);
        return;
      }

      toast.success(message, {
        description: (
          <p className="text-black">Você será redirecionado para home...</p>
        ),
      });

      setTimeout(() => redirect('/'), 1000);
    } catch (error) {
      setErrorMessage('Erro ao cadastrar, tente novamente mais tarde...');
      setIsLoading(false);
    }
  };

  return (
    <form
      className={cn('flex flex-col gap-6', className)}
      {...props}
      onSubmit={handleLoginSubmit}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Informe suas credenciais:
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="username">Usuário</Label>
          <Input
            className={
              errorMessage === 'Nome de usuário - mínimo 8 caracteres!'
                ? 'border-red-600'
                : ''
            }
            id="username"
            type="text"
            maxLength={20}
            minLength={8}
            autoCapitalize="off"
            value={formData.username}
            onChange={(e) => {
              if (e.currentTarget.value.length > 20) return;
              setFormData({ ...formData, username: e.currentTarget.value });
            }}
            placeholder="Seu nome de usuário"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Senha</Label>
          <div className="flex gap-2">
            <Input
              id="password"
              maxLength={15}
              className={
                errorMessage === 'Senha - mínimo 8 caracteres!'
                  ? 'border-red-600'
                  : ''
              }
              minLength={8}
              value={formData.password}
              onChange={(e) => {
                if (e.currentTarget.value.length > 15) return;
                setFormData({ ...formData, password: e.currentTarget.value });
              }}
              placeholder="Sua senha"
              type={typeInput}
              required
            />
            <Button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setTypeInput(typeInput === 'password' ? 'text' : 'password');
              }}
            >
              {typeInput === 'password' ? <EyeOff /> : <Eye />}
            </Button>
          </div>
          {errorMessage && (
            <p
              className="
          text-red-600 text-sm font-medium"
            >
              {errorMessage}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="animate-spin" />}
          Entrar
        </Button>
      </div>
      <div className="text-center text-sm">
        Não tem uma conta?{' '}
        <a href="/cadastro" className="underline underline-offset-4">
          Cadastre-se
        </a>
      </div>
    </form>
  );
}
