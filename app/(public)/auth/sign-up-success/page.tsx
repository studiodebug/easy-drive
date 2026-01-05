import { Card } from "@/components/retroui/Card";

export default function Page() {
  return (
    <Card>
      <Card.Header>
        <Card.Title className="text-2xl">
          Parabéns, você deu o primeiro passo!
        </Card.Title>
        <Card.Description>
          Verifique seu email para confirmar sua conta
        </Card.Description>
      </Card.Header>
    </Card>
  );
}
