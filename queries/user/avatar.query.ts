import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadAvatar, type UploadAvatarRequest } from "@/server/contracts/user/avatar";
import { toast } from "sonner";

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UploadAvatarRequest) => uploadAvatar(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Foto de perfil atualizada com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao fazer upload da foto");
    },
  });
};
