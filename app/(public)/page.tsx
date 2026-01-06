"use client";

import { Badge } from "@/components/retroui/Badge";
import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { Input } from "@/components/retroui/Input";
import { Text } from "@/components/retroui/Text";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export type HomePageProps = {
  className?: string;
};

export default function HomePage({ className }: HomePageProps) {
  return (
    <div className={cn("min-h-screen bg-white", className)}>
      <main>
        {/* Hero Section */}
        <section className="bg-white py-20 lg:py-32">
          <div className="max-w-6xl mx-auto px-4 lg:px-8">
            {/* Header with badges */}
            <div className="text-center mb-12">
              <div className="flex gap-2 flex-wrap justify-center mb-8">
                <span className="font-semibold bg-black text-white px-2.5 py-1.5 text-sm inline-block border-2 border-black">
                  Novo
                </span>
                <span className="font-semibold bg-primary text-black px-2.5 py-1.5 text-sm inline-block border-2 border-black">
                  Feito para instrutores locais
                </span>
              </div>

              <Text as="h1" className="mb-4">
                Encontre o instrutor de direção ideal.<br />
                <span className="relative mt-2 mx-2 px-3 py-1 bg-primary text-black border-2 border-black transform -skew-x-12 inline-block">
                  Aprenda com confiança.
                </span>
              </Text>

              <Text className="text-muted-foreground max-w-xl text-lg mx-auto">
                O EasyDrive conecta instrutores de direção certificados com
                pessoas que querem aprender a dirigir — combinando por
                localização, agenda, tipo de carro e objetivos de aprendizado.
              </Text>
            </div>

            {/* Search Card */}
            <div className="max-w-2xl mx-auto mb-12">
              <Card id="buscar" className="border-4 border-black shadow-lg">
                <Card.Header className="p-6">
                  <Card.Title className="text-2xl mb-2">Comece pela sua cidade</Card.Title>
                  <Card.Description className="text-base mb-4">
                    Vamos mostrar instrutores próximos e os próximos horários
                    disponíveis para aula.
                  </Card.Description>
                </Card.Header>
                <Card.Content className="p-6 pt-0 space-y-4">
                  <form className="flex flex-col lg:flex-row gap-4">
                    <Input
                      placeholder="Digite sua cidade (ex.: São Paulo)"
                      aria-label="Cidade"
                      type="text"
                      className="flex-1 border-black"
                    />
                    <Button type="submit" className="ml-auto md:ml-0  w-60 justify-center self-stretch">
                      Encontrar instrutores
                    </Button>
                  </form>
                  <Text as="p" className="text-sm text-muted-foreground text-center">
                    Quer ensinar?{" "}
                    <Text as="a" href="#teachers" className="underline font-semibold">
                      Candidate-se como instrutor
                    </Text>
                    .
                  </Text>
                </Card.Content>
              </Card>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card className="border-4 border-black shadow-lg hover:shadow-md transition-all hover:translate-y-1 hover:translate-x-1 group">
                <div className="h-40 border-b-4 border-black relative overflow-hidden bg-primary/10">
                  <div className="absolute top-3 left-3 flex gap-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full border border-black"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full border border-black"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full border border-black"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl">🎓</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Text className="font-bold text-xl">
                      Para alunos
                    </Text>
                    <Badge size="sm" variant="outline" className="rounded">
                      Estudantes
                    </Badge>
                  </div>
                  <Text className="text-muted-foreground text-sm mb-4">
                    Agende aulas no seu ritmo e no seu horário.
                  </Text>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="font-bold mr-2">→</span>
                      <span>Compare instrutores e disponibilidade</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">→</span>
                      <span>Aprenda no manual ou automático</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">→</span>
                      <span>Acompanhe seu progresso</span>
                    </li>
                  </ul>
                </div>
              </Card>

              <Card className="border-4 border-black shadow-lg hover:shadow-md transition-all hover:translate-y-1 hover:translate-x-1 group">
                <div className="h-40 border-b-4 border-black relative overflow-hidden bg-secondary/10">
                  <div className="absolute top-3 left-3 flex gap-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full border border-black"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full border border-black"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full border border-black"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl">🚗</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Text className="font-bold text-xl">
                      Para instrutores
                    </Text>
                    <Badge size="sm" variant="outline" className="rounded">
                      Professores
                    </Badge>
                  </div>
                  <Text className="text-muted-foreground text-sm mb-4">
                    Seja encontrado por novos alunos na sua região.
                  </Text>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="font-bold mr-2">→</span>
                      <span>Defina áreas, preços e disponibilidade</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">→</span>
                      <span>Gerencie agendamentos em um só lugar</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">→</span>
                      <span>Construa confiança com perfis verificados</span>
                    </li>
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how" className="py-24 bg-muted/20">
          <div className="max-w-6xl mx-auto max-lg:px-4 px-4">
            <div className="text-center mb-16">
              <Text as="h2" className="mb-4">Como funciona?</Text>
              <Text className="text-muted-foreground max-w-xl text-lg mx-auto">
                Um fluxo simples para alunos e instrutores. Três passos para começar a dirigir com confiança.
              </Text>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="relative flex flex-col">
                <div className="border-4 border-black shadow-md bg-background p-8 rounded-md flex flex-col flex-1 h-full">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary border-4 border-black shadow-md mb-6 rounded">
                    <span className="text-2xl font-bold text-black">1</span>
                  </div>
                  <Text as="h3" className="mb-4 text-2xl">Buscar</Text>
                  <Text className="text-base text-muted-foreground flex-1">
                    Encontre instrutores perto de você com o tipo de carro que você prefere.
                  </Text>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <div className="w-8 h-8 bg-background border-4 border-black rotate-45 flex items-center justify-center">
                    <ArrowRight className="h-4 w-4 -rotate-45" />
                  </div>
                </div>
              </div>
              <div className="relative flex flex-col">
                <div className="border-4 border-black shadow-md bg-background p-8 rounded-md flex flex-col flex-1 h-full">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary border-4 border-black shadow-md mb-6 rounded">
                    <span className="text-2xl font-bold text-black">2</span>
                  </div>
                  <Text as="h3" className="mb-4 text-2xl">Agendar</Text>
                  <Text className="text-base text-muted-foreground flex-1">
                    Escolha um horário, defina os objetivos da aula e confirme.
                  </Text>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <div className="w-8 h-8 bg-background border-4 border-black rotate-45 flex items-center justify-center">
                    <ArrowRight className="h-4 w-4 -rotate-45" />
                  </div>
                </div>
              </div>
              <div className="relative flex flex-col">
                <div className="border-4 border-black shadow-md bg-background p-8 rounded-md flex flex-col flex-1 h-full">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary border-4 border-black shadow-md mb-6 rounded">
                    <span className="text-2xl font-bold text-black">3</span>
                  </div>
                  <Text as="h3" className="mb-4 text-2xl">Dirigir</Text>
                  <Text className="text-base text-muted-foreground flex-1">
                    Aprenda com segurança, acompanhe seu progresso e ganhe confiança.
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* For Teachers */}
        <section id="teachers" className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
              <Card className="border-4 border-black shadow-lg">
                <Card.Header className="p-8">
                  <Card.Title className="text-3xl mb-4">Seja instrutor no EasyDrive</Card.Title>
                  <Card.Description className="text-base mb-6">
                    Crie um perfil, defina disponibilidade e comece a receber
                    pedidos de aula.
                  </Card.Description>
                </Card.Header>
                <Card.Content className="p-8 pt-0 space-y-6">
                  <Text as="p" className="text-lg">
                    Estamos lançando cidade por cidade. Entre na lista de espera
                    para ser o primeiro.
                  </Text>
                  <Button variant="secondary" type="button" className="w-full" size="lg">
                    Entrar na lista de espera
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Card.Content>
              </Card>

              <Card className="border-4 border-black shadow-lg">
                <Card.Header className="p-8">
                  <Card.Title className="text-3xl mb-4">O que verificamos</Card.Title>
                  <Card.Description className="text-base mb-6">
                    Vamos manter isso rigoroso — qualidade e segurança em primeiro
                    lugar.
                  </Card.Description>
                </Card.Header>
                <Card.Content className="p-8 pt-0">
                  <ul className="space-y-4 text-lg">
                    <li className="flex items-start">
                      <span className="font-bold mr-3 text-primary">✓</span>
                      <span>Identidade e contato</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-3 text-primary">✓</span>
                      <span>Credenciais de instrutor (quando aplicável)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-3 text-primary">✓</span>
                      <span>Detalhes do veículo e áreas de atendimento</span>
                    </li>
                  </ul>
                </Card.Content>
              </Card>
            </div>
          </div>
        </section>

        {/* Safety */}
        <section id="safety" className="py-24 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <Text as="h2" className="mb-4">Segurança e confiança</Text>
                <Text className="text-muted-foreground max-w-2xl text-lg mx-auto">
                  A plataforma é projetada para reduzir a incerteza para ambos os lados.
                </Text>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-4 border-black shadow-lg p-6 hover:shadow-md transition-all hover:translate-y-1 hover:translate-x-1">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary border-4 border-black shadow-md mb-4 rounded">
                    <span className="text-xl">🛡️</span>
                  </div>
                  <Text as="h4" className="font-semibold mb-2 text-xl">
                    Perfis verificados
                  </Text>
                  <Text as="p" className="text-sm text-muted-foreground">
                    Instrutores e alunos constroem credibilidade com verificação
                    e histórico.
                  </Text>
                </Card>
                <Card className="border-4 border-black shadow-lg p-6 hover:shadow-md transition-all hover:translate-y-1 hover:translate-x-1">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary border-4 border-black shadow-md mb-4 rounded">
                    <span className="text-xl">🎯</span>
                  </div>
                  <Text as="h4" className="font-semibold mb-2 text-xl">
                    Objetivos claros da aula
                  </Text>
                  <Text as="p" className="text-sm text-muted-foreground">
                    Cada aula pode focar em habilidades específicas como baliza,
                    conversões ou preparação para prova.
                  </Text>
                </Card>
                <Card className="border-4 border-black shadow-lg p-6 hover:shadow-md transition-all hover:translate-y-1 hover:translate-x-1">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary border-4 border-black shadow-md mb-4 rounded">
                    <span className="text-xl">💰</span>
                  </div>
                  <Text as="h4" className="font-semibold mb-2 text-xl">
                    Preços transparentes
                  </Text>
                  <Text as="p" className="text-sm text-muted-foreground">
                    Sem surpresas — veja preços e políticas antes de agendar.
                  </Text>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="flex items-center justify-center max-lg:px-4 py-24">
          <div className="max-w-4xl w-full mx-auto relative">
            <div className="bg-white border-4 border-black p-8 lg:p-16 shadow-lg rounded-lg relative">
              <div 
                className="absolute inset-0 z-0 rounded-lg" 
                style={{
                  backgroundImage: "linear-gradient(to right, rgb(226, 232, 240) 1px, transparent 1px), linear-gradient(rgb(226, 232, 240) 1px, transparent 1px)",
                  backgroundSize: "20px 30px",
                  maskImage: "radial-gradient(70% 60% at 50% 100%, rgb(0, 0, 0) 60%, transparent 100%)"
                }}
              />
              <Text as="h2" className="text-3xl lg:text-4xl font-semibold text-center mb-6 leading-tight relative z-10">
                Pronto para começar a dirigir?<br />
                <span className="bg-primary px-2 border-4 border-black">Encontre seu instrutor hoje!</span>
              </Text>
              <Text className="text-lg text-gray-700 text-center mb-10 max-w-2xl mx-auto leading-relaxed relative z-10">
                Junte-se a centenas de alunos que já estão aprendendo a dirigir com confiança através do EasyDrive.
              </Text>
              <div className="flex justify-center relative z-10">
                <Button asChild size="lg" variant="secondary">
                  <a href="#buscar">
                    Buscar instrutores
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t-4 border-black py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <Text as="p" className="text-sm text-muted-foreground font-semibold">
                © 2026 EasyDrive. Todos os direitos reservados.
              </Text>
              <div className="flex gap-6">
                <Text as="a" href="#" className="text-sm hover:underline font-semibold border-b-2 border-transparent hover:border-black transition-colors">
                  Privacidade
                </Text>
                <Text as="a" href="#" className="text-sm hover:underline font-semibold border-b-2 border-transparent hover:border-black transition-colors">
                  Termos
                </Text>
                <Text as="a" href="#" className="text-sm hover:underline font-semibold border-b-2 border-transparent hover:border-black transition-colors">
                  Contato
                </Text>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
