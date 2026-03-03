import { useMutation } from "@tanstack/react-query";
import { createInstructorWaitlist, type WaitlistResponse } from "@/server/contracts/waitlist/waitlist";
import { z } from "zod";

export const waitlistSchema = z.object({
  name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  city: z.string().min(2, "Cidade deve ter no mínimo 2 caracteres"),
  state: z.string().length(2, "Estado deve ter 2 caracteres"),
  notes: z.string().optional(),
});

export type WaitlistFormValues = z.infer<typeof waitlistSchema>;

export const useCreateWaitlist = () => {
  return useMutation<WaitlistResponse, Error, WaitlistFormValues>({
    mutationFn: createInstructorWaitlist,
  });
};
