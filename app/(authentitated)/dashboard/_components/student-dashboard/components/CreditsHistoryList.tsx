"use client";

import { Badge } from "@/components/retroui/Badge";
import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { Dialog } from "@/components/retroui/Dialog";
import { Text } from "@/components/retroui/Text";
import { useGetCreditsHistory } from "@/queries/dashboard/credits-history.query";
import { Transaction } from "@/server/contracts/dashboard/credits-types";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowDownLeft, ArrowUpRight, Eye } from "lucide-react";
import { useState } from "react";

interface TransactionDetailsModalProps {
  transaction: Transaction | null;
  isOpen: boolean;
  onClose: () => void;
}

function TransactionDetailsModal({
  transaction,
  isOpen,
  onClose,
}: TransactionDetailsModalProps) {
  if (!transaction) return null;

  const isCredit = transaction.type === "credit";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Dialog.Content className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <Dialog.Header>
          <Text className="font-bold text-lg">Detalhes da Transação</Text>
          <Dialog.Description>ID: {transaction.id}</Dialog.Description>
        </Dialog.Header>
        <div className="space-y-4 py-4">
          <div className="flex justify-between items-center p-4 bg-muted/20 rounded-lg border border-border">
            <Text className="text-muted-foreground">Valor</Text>
            <Text
              className={`text-xl font-bold ${
                isCredit ? "text-green-600" : "text-black"
              }`}
            >
              {isCredit ? "+" : "-"} {transaction.amount} créditos
            </Text>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <div>
                <Text className="text-sm font-semibold text-muted-foreground">Data</Text>
                <Text>{format(new Date(transaction.date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}</Text>
             </div>
             <div>
                <Text className="text-sm font-semibold text-muted-foreground">Status</Text>
                <Badge 
                    variant={transaction.status === 'completed' ? 'outline' : 'solid'} 
                    className={`mt-1 ${transaction.status !== 'completed' ? 'bg-red-500 hover:bg-red-600 text-white border-red-500' : ''}`}
                >
                    {transaction.status === 'completed' ? 'Concluído' : transaction.status === 'pending' ? 'Pendente' : 'Falhou'}
                </Badge>
             </div>
          </div>

          <div>
             <Text className="text-sm font-semibold text-muted-foreground">Descrição</Text>
             <Text className="mt-1">{transaction.description}</Text>
          </div>

          {transaction.paymentMethod && (
             <div>
                <Text className="text-sm font-semibold text-muted-foreground">Método de Pagamento</Text>
                <Text className="mt-1">{transaction.paymentMethod}</Text>
             </div>
          )}
        </div>
      </Dialog.Content>
    </Dialog>
  );
}

export function CreditsHistoryList() {
  const { data: transactions } = useGetCreditsHistory();
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  if (transactions.length === 0) {
    return (
        <Card className="p-8 flex flex-col items-center justify-center text-center border-2 border-dashed border-border bg-transparent">
            <Text className="text-muted-foreground">Nenhuma transação encontrada.</Text>
        </Card>
    )
  }

  return (
    <div className="space-y-4">
        <div className="space-y-2">
            {transactions.map((tx) => (
                <div 
                    key={tx.id}
                    className="flex items-center justify-between p-4 bg-white border-2 border-border rounded-lg hover:border-black transition-colors cursor-pointer group"
                    onClick={() => setSelectedTransaction(tx)}
                >
                    <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-full border-2 border-black ${tx.type === 'credit' ? 'bg-green-100' : 'bg-gray-100'}`}>
                            {tx.type === 'credit' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                        </div>
                        <div>
                            <Text className="font-bold">{tx.description}</Text>
                            <Text className="text-sm text-muted-foreground">
                                {format(new Date(tx.date), "d 'de' MMMM, yyyy", { locale: ptBR })}
                            </Text>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Text className={`font-bold ${tx.type === 'credit' ? 'text-green-600' : ''}`}>
                            {tx.type === 'credit' ? '+' : '-'}{tx.amount}
                        </Text>
                        <Button size="icon" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <Eye className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>

        <TransactionDetailsModal 
            isOpen={!!selectedTransaction}
            onClose={() => setSelectedTransaction(null)}
            transaction={selectedTransaction}
        />
    </div>
  );
}
