'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { updateUser } from '../../../../../../actions/UPDATE/update-user/update-user';

interface EditUserFormProps {
  data: {
    name: string;
    username: string;
    id: number;
  };
}

export default function EditUserForm({ data }: EditUserFormProps) {
  const [formData, setFormData] = useState({
    name: data.name || '',
    username: data.username || '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [inputType, setInputType] = useState<'password' | 'text'>('password');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    (document.activeElement as HTMLElement)?.blur();

    if (!formData.name || !formData.username) {
      toast.error('Preencha todos os campos!');
      setLoading(false);
      return;
    }

    if (formData.name.length < 3) {
      toast.error('Nome deve ter no mínimo 3 caracteres!');
      setLoading(false);
      return;
    }

    if (formData.username.length < 8) {
      toast.error('Nome de usuário deve ter no mínimo 8 caracteres!');
      setLoading(false);
      return;
    }

    if (formData.password && formData.password.length < 8) {
      toast.error('Senha deve ter no mínimo 8 caracteres!');
      setLoading(false);
      return;
    }

    const { message, success } = await updateUser({ ...formData, id: data.id });

    if (success) {
      toast.success(message);
      setLoading(false);
      return;
    }
    toast.error(message);
    setLoading(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Editar Perfil</CardTitle>
        <CardDescription>
          Atualize suas informações pessoais abaixo
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              name="name"
              maxLength={100}
              value={formData.name}
              onChange={(e) => {
                if (e.target.value.length > 100) return;
                handleChange(e);
              }}
              placeholder="Seu nome completo"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Nome de usuário</Label>
            <Input
              id="username"
              name="username"
              maxLength={50}
              value={formData.username}
              onChange={(e) => {
                if (e.target.value.length > 50) return;
                handleChange(e);
              }}
              placeholder="Seu nome de usuário"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="block">
              Nova senha
              <span className="text-sm mt-1 block">
                ( deixe em branco para manter a atual )
              </span>
            </Label>
            <div className="flex gap-2">
              <Input
                id="password"
                name="password"
                type={inputType}
                value={formData.password}
                maxLength={15}
                minLength={8}
                onChange={(e) => {
                  if (e.target.value.length > 15) return;
                  handleChange(e);
                }}
                placeholder="Nova senha"
              />
              <Button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setInputType(inputType === 'password' ? 'text' : 'password');
                }}
              >
                {inputType === 'password' ? <EyeOff /> : <Eye />}
              </Button>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex mt-5 gap-2">
          <Button
            type="submit"
            disabled={
              !formData.name ||
              !formData.username ||
              loading ||
              (formData.password === '' &&
                formData.name === data.name &&
                formData.username === data.username)
            }
            className="sm:flex-0 flex-1"
          >
            {loading && <Loader2 className="animate-spin" />}
            Salvar alterações
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
