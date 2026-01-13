"use client";

import { CreditDisplay } from "@/components/blocks/CreditDisplay/CreditDisplay";
import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { Text } from "@/components/retroui/Text";
import { useGetCredits } from "@/queries/dashboard/credits.query";
import { Plus } from "lucide-react";
import { Suspense, useState } from "react";
import { AddCreditsModal } from "./AddCreditsModal";
import { CreditsHistoryList } from "./CreditsHistoryList";

export function CreditsTab() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="space-y-8 w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Text variant="h3" className="font-bold mb-1">
            Carteira de Créditos
          </Text>
          <Text className="text-muted-foreground">
            Gerencie seus créditos e visualize seu histórico de transações.
          </Text>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Créditos
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Balance Card */}
        <Card className="md:col-span-1 p-6 bg-black text-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(100,100,100,0.5)]">
            <Text className="text-gray-300 text-sm font-medium mb-2">Saldo Atual</Text>
            <Suspense fallback={<div className="h-10 w-20 bg-gray-800 animate-pulse rounded"/>}>
                <BalanceDisplay />
            </Suspense>
            <div className="mt-4 pt-4 border-t border-gray-800">
                <Text className="text-xs text-gray-400">
                    Use seus créditos para agendar novas aulas com nossos instrutores.
                </Text>
            </div>
        </Card>

        {/* History Section */}
        <div className="md:col-span-2 space-y-4">
             <Text variant="h5" className="font-bold flex items-center gap-2">
                Histórico de Transações
            </Text>
            <Suspense fallback={<HistorySkeleton />}>
                <CreditsHistoryList />
            </Suspense>
        </div>
      </div>

      <AddCreditsModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
    </div>
  );
}

function BalanceDisplay() {
    const { data } = useGetCredits();
    return (
        <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold">{data.availableCredits}</span>
            <span className="text-lg text-gray-400">créditos</span>
        </div>
    )
}

function HistorySkeleton() {
    return (
        <div className="space-y-4">
            {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 w-full bg-muted rounded-lg animate-pulse border-2 border-transparent" />
            ))}
        </div>
    )
}
