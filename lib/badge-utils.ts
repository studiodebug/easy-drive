/**
 * Get status badge configuration based on class status
 */
export function getStatusBadge(status: string) {
  const badges = {
    confirmada: {
      text: "Confirmada",
      className:
        "bg-green-400 text-black border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
    },
    pendente: {
      text: "Pendente",
      className:
        "bg-yellow-400 text-black border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
    },
    cancelada: {
      text: "Cancelada",
      className:
        "bg-red-400 text-black border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
    },
    completed: {
      text: "Concluída",
      className:
        "bg-green-400 text-black border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
    },
    cancelled: {
      text: "Cancelada",
      className:
        "text-xs font-bold text-red-500 bg-red-100 px-2 py-1 border-2 border-red-500 rounded-sm",
    },
  };
  return badges[status as keyof typeof badges];
}

/**
 * Get availability badge configuration based on instructor availability
 */
export function getAvailabilityBadge(availability: string) {
  const badges = {
    disponivel: {
      text: "Disponível",
      className:
        "bg-green-400 text-black border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
    },
    ocupado: {
      text: "Ocupado",
      className:
        "bg-yellow-400 text-black border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
    },
    indisponivel: {
      text: "Indisponível",
      className:
        "bg-gray-400 text-black border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
    },
  };
  return badges[availability as keyof typeof badges];
}

