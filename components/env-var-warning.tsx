import { Badge } from "./retroui/Badge";
import { Button } from "./retroui/Button";

export function EnvVarWarning() {
  return (
    <div className="flex gap-4 items-center">
      <Badge variant={"outline"} className="font-normal">
        Supabase environment variables required
      </Badge>
      <div className="flex gap-2">
        <Button size="sm" variant={"outline"} disabled>
          Entrar
        </Button>
        <Button size="sm" variant={"default"} disabled>
          Cadastrar
        </Button>
      </div>
    </div>
  );
}
