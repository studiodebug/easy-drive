import { Badge } from "@/components/retroui/Badge";
import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { Input } from "@/components/retroui/Input";
import { Text } from "@/components/retroui/Text";
import { cn } from "@/lib/utils";

import { styles as s } from "./Home.styles";
import type { HomeProps } from "./Home.types";

export default function Home({ className }: HomeProps) {
  return (
    <div className={cn(s().container(), className)}>
      <header className={s().header()}>
        <div className={s().headerInner()}>
          <div className={s().brandWrap()}>
            <div className={s().brandMark()}>
              <Text as="h6" className="font-bold">
                ED
              </Text>
            </div>
            <div className={s().brandTextWrap()}>
              <Text as="h4">EasyDrive</Text>
              <Text as="p" className={s().navLink()}>
                Instrutores ↔ alunos
              </Text>
            </div>
          </div>

          <nav className={s().nav()}>
            <Text as="a" href="#how" className={s().navLink()}>
              Como funciona
            </Text>
            <Text as="a" href="#teachers" className={s().navLink()}>
              Para instrutores
            </Text>
            <Text as="a" href="#safety" className={s().navLink()}>
              Segurança
            </Text>
          </nav>
        </div>
      </header>

      <main className={s().main()}>
        <section className={s().heroSection()}>
          <div className={s().heroLeft()}>
            <div className={s().badgeRow()}>
              <Badge variant="solid" size="sm">
                Novo
              </Badge>
              <Badge variant="surface" size="sm">
                Feito para instrutores locais
              </Badge>
            </div>

            <Text as="h1" className={s().title()}>
              Encontre o instrutor de direção ideal. Aprenda com confiança.
            </Text>

            <Text as="p" className={s().subtitle()}>
              O EasyDrive conecta instrutores de direção certificados com
              pessoas que querem aprender a dirigir — combinando por
              localização, agenda, tipo de carro e objetivos de aprendizado.
            </Text>

            <Button asChild className={s().cta()}>
              <a href="#buscar">Começar agora</a>
            </Button>

            <Card id="buscar" className={s().searchCard()}>
              <Card.Header>
                <Card.Title>Comece pela sua cidade</Card.Title>
                <Card.Description>
                  Vamos mostrar instrutores próximos e os próximos horários
                  disponíveis para aula.
                </Card.Description>
              </Card.Header>
              <Card.Content className={s().searchContent()}>
                <div className={s().searchRow()}>
                  <Input
                    placeholder="Digite sua cidade (ex.: São Paulo)"
                    aria-label="Cidade"
                  />
                  <Button className={s().searchButton()} type="button">
                    Encontrar instrutores
                  </Button>
                </div>
                <Text as="p" className={s().helperText()}>
                  Quer ensinar?{" "}
                  <Text as="a" href="#teachers">
                    Candidate-se como instrutor
                  </Text>
                  .
                </Text>
              </Card.Content>
            </Card>
          </div>

          <div className={s().heroRight()}>
            <Card className={s().sideCard()}>
              <Card.Header>
                <Card.Title>Para alunos</Card.Title>
                <Card.Description>
                  Agende aulas no seu ritmo e no seu horário.
                </Card.Description>
              </Card.Header>
              <Card.Content className="grid gap-3">
                <ul className={s().list()}>
                  <Text as="li" className={s().listItem()}>
                    - Compare instrutores, disponibilidade e formatos de aula
                  </Text>
                  <Text as="li" className={s().listItem()}>
                    - Aprenda no manual ou automático (quando disponível)
                  </Text>
                  <Text as="li" className={s().listItem()}>
                    - Acompanhe seu progresso: baliza, rodovia, direção noturna
                  </Text>
                </ul>
              </Card.Content>
            </Card>

            <Card className={s().sideCard()}>
              <Card.Header>
                <Card.Title>Para instrutores</Card.Title>
                <Card.Description>
                  Seja encontrado por novos alunos na sua região.
                </Card.Description>
              </Card.Header>
              <Card.Content className="grid gap-3">
                <ul className={s().list()}>
                  <Text as="li" className={s().listItem()}>
                    - Defina suas áreas, preços e disponibilidade
                  </Text>
                  <Text as="li" className={s().listItem()}>
                    - Gerencie agendamentos em um só lugar
                  </Text>
                  <Text as="li" className={s().listItem()}>
                    - Construa confiança com perfis verificados e avaliações
                  </Text>
                </ul>
              </Card.Content>
            </Card>
          </div>
        </section>

        <section id="how" className={s().howSection()}>
          <div className={s().howHeader()}>
            <div className={s().howHeaderText()}>
              <Text as="h2">Como funciona</Text>
              <Text as="p" className={s().howSubtitle()}>
                Um fluxo simples para alunos e instrutores.
              </Text>
            </div>
          </div>

          <div className={s().stepsGrid()}>
            <Card className={s().stepCard()}>
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
            <Card className={s().stepCard()}>
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
            <Card className={s().stepCard()}>
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
        </section>

        <section id="teachers" className={s().teachersSection()}>
          <Card className={s().teacherCard()}>
            <Card.Header>
              <Card.Title>Seja instrutor no EasyDrive</Card.Title>
              <Card.Description>
                Crie um perfil, defina disponibilidade e comece a receber
                pedidos de aula.
              </Card.Description>
            </Card.Header>
            <Card.Content className={s().teacherCTAContent()}>
              <Text as="p" className={s().teacherCTAText()}>
                Estamos lançando cidade por cidade. Entre na lista de espera
                para ser o primeiro.
              </Text>
              <Button variant="secondary" type="button">
                Entrar na lista de espera
              </Button>
            </Card.Content>
          </Card>

          <Card className={s().verifyCard()}>
            <Card.Header>
              <Card.Title>O que verificamos</Card.Title>
              <Card.Description>
                Vamos manter isso rigoroso — qualidade e segurança em primeiro
                lugar.
              </Card.Description>
            </Card.Header>
            <Card.Content className={s().verifyContent()}>
              <Text as="p" className={s().verifyLine()}>
                - Identidade e contato
              </Text>
              <Text as="p" className={s().verifyLine()}>
                - Credenciais de instrutor (quando aplicável)
              </Text>
              <Text as="p" className={s().verifyLine()}>
                - Detalhes do veículo e áreas de atendimento
              </Text>
            </Card.Content>
          </Card>
        </section>

        <section id="safety" className={s().safetySection()}>
          <Card className={s().safetyCard()}>
            <Card.Header>
              <Card.Title>Segurança e confiança</Card.Title>
              <Card.Description>
                A plataforma é projetada para reduzir a incerteza para ambos os
                lados.
              </Card.Description>
            </Card.Header>
            <Card.Content className={s().safetyGrid()}>
              <div className={s().safetyBlock()}>
                <Text as="h4">Perfis verificados</Text>
                <Text as="p" className={s().safetyBlockText()}>
                  Instrutores e alunos constroem credibilidade com verificação e
                  histórico.
                </Text>
              </div>
              <div className={s().safetyBlock()}>
                <Text as="h4">Objetivos claros da aula</Text>
                <Text as="p" className={s().safetyBlockText()}>
                  Cada aula pode focar em habilidades específicas como baliza,
                  conversões ou preparação para prova.
                </Text>
              </div>
              <div className={s().safetyBlock()}>
                <Text as="h4">Preços transparentes</Text>
                <Text as="p" className={s().safetyBlockText()}>
                  Sem surpresas — veja preços e políticas antes de agendar.
                </Text>
              </div>
            </Card.Content>
          </Card>
        </section>

        <footer className={s().footer()}>
          <div className={s().footerInner()}>
            <Text as="p" className={s().footerText()}>
              © {new Date().getFullYear()} EasyDrive. Todos os direitos
              reservados.
            </Text>
            <div className={s().footerLinks()}>
              <Text as="a" href="#" className={s().footerText()}>
                Privacidade
              </Text>
              <Text as="a" href="#" className={s().footerText()}>
                Termos
              </Text>
              <Text as="a" href="#" className={s().footerText()}>
                Contato
              </Text>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
