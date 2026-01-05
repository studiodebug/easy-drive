"use client";

import { Badge } from "@/components/retroui/Badge";
import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { Input } from "@/components/retroui/Input";
import { Text } from "@/components/retroui/Text";
import { cn } from "@/lib/utils";

export type HomePageProps = {
  className?: string;
};

export default function HomePage({ className }: HomePageProps) {
  return (
    <div className={cn("min-h-screen", className)}>
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg">
              <Text as="h6" className="font-bold text-white">
                ED
              </Text>
            </div>
            <div>
              <Text as="h4" className="font-bold">
                EasyDrive
              </Text>
              <Text as="p" className="text-sm text-muted-foreground">
                Instrutores ↔ alunos
              </Text>
            </div>
          </div>

          <nav className="hidden md:flex gap-6">
            <Text as="a" href="#how" className="hover:underline">
              Como funciona
            </Text>
            <Text as="a" href="#teachers" className="hover:underline">
              Para instrutores
            </Text>
            <Text as="a" href="#safety" className="hover:underline">
              Segurança
            </Text>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left */}
            <div className="space-y-6">
              <div className="flex gap-2">
                <Badge variant="solid" size="sm">
                  Novo
                </Badge>
                <Badge variant="surface" size="sm">
                  Feito para instrutores locais
                </Badge>
              </div>

              <Text as="h1" className="text-5xl font-bold leading-tight">
                Encontre o instrutor de direção ideal. Aprenda com confiança.
              </Text>

              <Text as="p" className="text-lg text-muted-foreground">
                O EasyDrive conecta instrutores de direção certificados com
                pessoas que querem aprender a dirigir — combinando por
                localização, agenda, tipo de carro e objetivos de aprendizado.
              </Text>

              <Button asChild size="lg">
                <a href="#buscar">Começar agora</a>
              </Button>

              <Card id="buscar" className="mt-8">
                <Card.Header>
                  <Card.Title>Comece pela sua cidade</Card.Title>
                  <Card.Description>
                    Vamos mostrar instrutores próximos e os próximos horários
                    disponíveis para aula.
                  </Card.Description>
                </Card.Header>
                <Card.Content className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Digite sua cidade (ex.: São Paulo)"
                      aria-label="Cidade"
                      className="flex-1"
                    />
                    <Button type="button">Encontrar instrutores</Button>
                  </div>
                  <Text as="p" className="text-sm text-muted-foreground">
                    Quer ensinar?{" "}
                    <Text as="a" href="#teachers" className="underline">
                      Candidate-se como instrutor
                    </Text>
                    .
                  </Text>
                </Card.Content>
              </Card>
            </div>

            {/* Right */}
            <div className="space-y-4">
              <Card>
                <Card.Header>
                  <Card.Title>Para alunos</Card.Title>
                  <Card.Description>
                    Agende aulas no seu ritmo e no seu horário.
                  </Card.Description>
                </Card.Header>
                <Card.Content>
                  <ul className="space-y-2 text-sm">
                    <li>
                      - Compare instrutores, disponibilidade e formatos de aula
                    </li>
                    <li>
                      - Aprenda no manual ou automático (quando disponível)
                    </li>
                    <li>
                      - Acompanhe seu progresso: baliza, rodovia, direção
                      noturna
                    </li>
                  </ul>
                </Card.Content>
              </Card>

              <Card>
                <Card.Header>
                  <Card.Title>Para instrutores</Card.Title>
                  <Card.Description>
                    Seja encontrado por novos alunos na sua região.
                  </Card.Description>
                </Card.Header>
                <Card.Content>
                  <ul className="space-y-2 text-sm">
                    <li>- Defina suas áreas, preços e disponibilidade</li>
                    <li>- Gerencie agendamentos em um só lugar</li>
                    <li>
                      - Construa confiança com perfis verificados e avaliações
                    </li>
                  </ul>
                </Card.Content>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how" className="bg-muted/30 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Text as="h2" className="text-3xl font-bold mb-4">
                Como funciona
              </Text>
              <Text as="p" className="text-muted-foreground">
                Um fluxo simples para alunos e instrutores.
              </Text>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <Card.Header>
                  <Badge variant="solid" size="sm" className="w-fit">
                    Etapa 1
                  </Badge>
                  <Card.Title className="mt-2">Buscar</Card.Title>
                  <Card.Description>
                    Encontre instrutores perto de você com o tipo de carro que
                    você prefere.
                  </Card.Description>
                </Card.Header>
              </Card>
              <Card>
                <Card.Header>
                  <Badge variant="solid" size="sm" className="w-fit">
                    Etapa 2
                  </Badge>
                  <Card.Title className="mt-2">Agendar</Card.Title>
                  <Card.Description>
                    Escolha um horário, defina os objetivos da aula e confirme.
                  </Card.Description>
                </Card.Header>
              </Card>
              <Card>
                <Card.Header>
                  <Badge variant="solid" size="sm" className="w-fit">
                    Etapa 3
                  </Badge>
                  <Card.Title className="mt-2">Dirigir</Card.Title>
                  <Card.Description>
                    Aprenda com segurança, acompanhe seu progresso e ganhe
                    confiança.
                  </Card.Description>
                </Card.Header>
              </Card>
            </div>
          </div>
        </section>

        {/* For Teachers */}
        <section id="teachers" className="py-20">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-6">
            <Card>
              <Card.Header>
                <Card.Title>Seja instrutor no EasyDrive</Card.Title>
                <Card.Description>
                  Crie um perfil, defina disponibilidade e comece a receber
                  pedidos de aula.
                </Card.Description>
              </Card.Header>
              <Card.Content className="space-y-4">
                <Text as="p">
                  Estamos lançando cidade por cidade. Entre na lista de espera
                  para ser o primeiro.
                </Text>
                <Button variant="secondary" type="button" className="w-full">
                  Entrar na lista de espera
                </Button>
              </Card.Content>
            </Card>

            <Card>
              <Card.Header>
                <Card.Title>O que verificamos</Card.Title>
                <Card.Description>
                  Vamos manter isso rigoroso — qualidade e segurança em primeiro
                  lugar.
                </Card.Description>
              </Card.Header>
              <Card.Content>
                <ul className="space-y-2">
                  <li>- Identidade e contato</li>
                  <li>- Credenciais de instrutor (quando aplicável)</li>
                  <li>- Detalhes do veículo e áreas de atendimento</li>
                </ul>
              </Card.Content>
            </Card>
          </div>
        </section>

        {/* Safety */}
        <section id="safety" className="bg-muted/30 py-20">
          <div className="container mx-auto px-4">
            <Card>
              <Card.Header>
                <Card.Title>Segurança e confiança</Card.Title>
                <Card.Description>
                  A plataforma é projetada para reduzir a incerteza para ambos
                  os lados.
                </Card.Description>
              </Card.Header>
              <Card.Content className="grid md:grid-cols-3 gap-6">
                <div>
                  <Text as="h4" className="font-semibold mb-2">
                    Perfis verificados
                  </Text>
                  <Text as="p" className="text-sm text-muted-foreground">
                    Instrutores e alunos constroem credibilidade com verificação
                    e histórico.
                  </Text>
                </div>
                <div>
                  <Text as="h4" className="font-semibold mb-2">
                    Objetivos claros da aula
                  </Text>
                  <Text as="p" className="text-sm text-muted-foreground">
                    Cada aula pode focar em habilidades específicas como baliza,
                    conversões ou preparação para prova.
                  </Text>
                </div>
                <div>
                  <Text as="h4" className="font-semibold mb-2">
                    Preços transparentes
                  </Text>
                  <Text as="p" className="text-sm text-muted-foreground">
                    Sem surpresas — veja preços e políticas antes de agendar.
                  </Text>
                </div>
              </Card.Content>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <Text as="p" className="text-sm text-muted-foreground">
                © 2026 EasyDrive. Todos os direitos
                reservados.
              </Text>
              <div className="flex gap-6">
                <Text as="a" href="#" className="text-sm hover:underline">
                  Privacidade
                </Text>
                <Text as="a" href="#" className="text-sm hover:underline">
                  Termos
                </Text>
                <Text as="a" href="#" className="text-sm hover:underline">
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
