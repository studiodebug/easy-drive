"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "@/components/retroui/Dialog";
import { Button } from "@/components/retroui/Button";
import { Input } from "@/components/retroui/Input";
import { Label } from "@/components/retroui/Label";
import { Text } from "@/components/retroui/Text";
import { Loader2 } from "lucide-react";
import {
  waitlistSchema,
  type WaitlistFormValues,
  useCreateWaitlist,
} from "@/mutations/waitlist/waitlist.mutation";
import { toast } from "sonner";
import { useState } from "react";

interface WaitlistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WaitlistModal({ open, onOpenChange }: WaitlistModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const { mutate, isPending } = useCreateWaitlist();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      city: "",
      state: "",
      notes: "",
    },
  });

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      reset();
      setSubmitted(false);
    }
    onOpenChange(value);
  };

  const onSubmit = (values: WaitlistFormValues) => {
    mutate(values, {
      onSuccess: () => {
        setSubmitted(true);
      },
      onError: (error) => {
        toast.error(error.message || "Não foi possível entrar na lista de espera.");
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <Dialog.Content className="sm:max-w-md">
        <Dialog.Header>
          <Text variant="h4">Lista de espera para instrutores</Text>
          <Dialog.Description>
            Seja o primeiro a ser notificado quando lançarmos em sua cidade.
          </Dialog.Description>
        </Dialog.Header>

        {submitted ? (
          <div className="py-6 text-center space-y-3">
            <Text variant="h5">Você está na lista! 🎉</Text>
            <Text variant="body" className="text-muted-foreground">
              Entraremos em contato assim que abrirmos vagas para instrutores na
              sua cidade.
            </Text>
            <Button onClick={() => handleOpenChange(false)} className="mt-4">
              Fechar
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
            <div className="space-y-1">
              <Label htmlFor="wl-name">Nome *</Label>
              <Input
                id="wl-name"
                placeholder="Seu nome completo"
                aria-invalid={!!errors.name}
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="wl-email">Email *</Label>
              <Input
                id="wl-email"
                type="email"
                placeholder="seu@email.com"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="wl-phone">Telefone</Label>
              <Input
                id="wl-phone"
                placeholder="(11) 99999-9999"
                {...register("phone")}
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2 space-y-1">
                <Label htmlFor="wl-city">Cidade *</Label>
                <Input
                  id="wl-city"
                  placeholder="Ex: São Paulo"
                  aria-invalid={!!errors.city}
                  {...register("city")}
                />
                {errors.city && (
                  <p className="text-sm text-red-500">{errors.city.message}</p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="wl-state">Estado *</Label>
                <Input
                  id="wl-state"
                  placeholder="SP"
                  maxLength={2}
                  aria-invalid={!!errors.state}
                  {...register("state")}
                />
                {errors.state && (
                  <p className="text-sm text-red-500">{errors.state.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="wl-notes">Observações</Label>
              <Input
                id="wl-notes"
                placeholder="Experiência, especialidades..."
                {...register("notes")}
              />
            </div>

            <Dialog.Footer className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                disabled={isPending}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Entrar na lista"
                )}
              </Button>
            </Dialog.Footer>
          </form>
        )}
      </Dialog.Content>
    </Dialog>
  );
}
