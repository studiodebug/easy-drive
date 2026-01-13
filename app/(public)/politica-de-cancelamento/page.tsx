import { Badge } from "@/components/retroui/Badge";
import { Button } from "@/components/retroui/Button";
import Header from "@/components/blocks/Header/Header";
import Footer from "@/components/blocks/Footer/Footer";
import { Text } from "@/components/retroui/Text";
import { AlertTriangle, ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";

export default function CancellationPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center space-y-4">
          <Badge variant="outline" className="mb-4">
            Transparência Total
          </Badge>
          <Text as="h1" className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
            Política de Cancelamento
          </Text>
          <Text className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Entenda como funcionam os reembolsos de créditos quando você precisa cancelar uma aula agendada.
          </Text>
        </div>

        {/* Policy Grid */}
        <div className="border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white overflow-hidden mb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 border-b-2 border-black bg-muted/20">
            <div className="p-4 md:col-span-3 font-bold border-b-2 md:border-b-0 border-black md:border-r-2 uppercase tracking-wide">
              Antecedência
            </div>
            <div className="p-4 md:col-span-2 font-bold border-b-2 md:border-b-0 border-black md:border-r-2 uppercase tracking-wide">
              Reembolso
            </div>
            <div className="p-4 md:col-span-7 font-bold uppercase tracking-wide">
              O que acontece
            </div>
          </div>

          {/* Rows */}
          <PolicyRow
            time="Mais de 24h"
            refund="100%"
            description="Cancelamento gratuito. Seus créditos voltam integralmente para sua conta."
            variant="success"
          />
          <PolicyRow
            time="4h a 24h"
            refund="90%"
            description="Pequena taxa de compensação. Você recebe quase todos os créditos de volta."
            variant="warning"
          />
          <PolicyRow
            time="2h a 4h"
            refund="70%"
            description="Taxa moderada. A proximidade do horário dificulta reagendamento do instrutor."
            variant="warning"
          />
          <PolicyRow
            time="1h a 2h"
            refund="50%"
            description="Taxa alta. Metade dos créditos são retidos para compensar o instrutor."
            variant="danger"
          />
          <PolicyRow
            time="Menos de 1h"
            refund="0%"
            description="Sem reembolso. O horário reservado foi perdido e o instrutor será pago integralmente."
            variant="danger"
            last
          />
        </div>

        {/* Important Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 border-2 border-black bg-primary/10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-6 h-6" />
              <Text className="text-lg font-bold uppercase">Como funciona</Text>
            </div>
            <Text className="text-muted-foreground">
              O cálculo é feito automaticamente com base no horário de início da aula. 
              Ao clicar em cancelar, você verá exatamente quanto receberá de volta antes de confirmar.
            </Text>
          </div>

          <div className="p-6 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="w-6 h-6 text-orange-500" />
              <Text className="text-lg font-bold uppercase">Importante</Text>
            </div>
            <Text className="text-muted-foreground">
              O reembolso é feito sempre em <strong>créditos</strong> na sua carteira, 
              disponíveis imediatamente para agendar uma nova aula.
            </Text>
          </div>
        </div>

        {/* Back Action */}
        <div className="flex justify-center">
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar para a página inicial
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function PolicyRow({ 
  time, 
  refund, 
  description, 
  variant,
  last = false 
}: { 
  time: string; 
  refund: string; 
  description: string; 
  variant: "success" | "warning" | "danger";
  last?: boolean;
}) {
  const colors = {
    success: "bg-green-100 text-green-800 border-green-200",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
    danger: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-12 ${!last ? "border-b-2 border-black/10" : ""}`}>
      <div className="p-4 md:col-span-3 flex items-center font-bold border-b border-black/10 md:border-b-0 md:border-r-2 md:border-black/10">
        {time}
      </div>
      <div className="p-4 md:col-span-2 flex items-center border-b border-black/10 md:border-b-0 md:border-r-2 md:border-black/10">
        <Badge className={`border-2 ${colors[variant]} rounded-none font-bold shadow-none`}>
          {refund}
        </Badge>
      </div>
      <div className="p-4 md:col-span-7 flex items-center text-muted-foreground">
        {description}
      </div>
    </div>
  );
}
