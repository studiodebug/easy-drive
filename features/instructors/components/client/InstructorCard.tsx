/**
 * InstructorCard Component
 *
 * Card para exibir informações resumidas de um instrutor
 */

"use client";

import { Badge } from "@/components/retroui/Badge";
import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import type { InstructorPublicDTO } from "../../dtos/instructor.dto";

type InstructorCardProps = {
  instructor: InstructorPublicDTO;
  onSelect?: (id: string) => void;
};

export function InstructorCard({ instructor, onSelect }: InstructorCardProps) {
  return (
    <Card>
      <Card.Header>
        <div className="flex items-start justify-between">
          <div>
            <Card.Title>Instrutor ID: {instructor.id}</Card.Title>
            <Card.Description>
              {instructor.profile?.specialty ?? "Especialidade não informada"}
            </Card.Description>
          </div>
          {instructor.isActive ? <Badge>Ativo</Badge> : <Badge>Inativo</Badge>}
        </div>
      </Card.Header>

      <Card.Content>
        <div className="space-y-2">
          {instructor.profile?.description ? (
            <p className="text-sm">{instructor.profile.description}</p>
          ) : (
            <p className="text-sm text-muted-foreground">Sem descrição</p>
          )}

          <div className="flex items-center gap-4 text-sm">
            <span>
              ⭐{" "}
              {typeof instructor.rating === "number" ? instructor.rating : "—"}
            </span>
            <span>🪪 {instructor.driversLicense ?? "—"}</span>
          </div>

          <p className="text-xs text-muted-foreground">
            Perfil: {instructor.profileId ?? "—"}
          </p>
        </div>
      </Card.Content>

      {onSelect && (
        <div className="p-4 pt-0">
          <Button onClick={() => onSelect(instructor.id)}>Ver Perfil</Button>
        </div>
      )}
    </Card>
  );
}
