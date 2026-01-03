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
              {instructor.city}, {instructor.state}
            </Card.Description>
          </div>
          {instructor.verified && <Badge>Verificado</Badge>}
        </div>
      </Card.Header>

      <Card.Content>
        <div className="space-y-2">
          <p className="text-sm">{instructor.bio}</p>

          <div className="flex items-center gap-4 text-sm">
            <span>⭐ {instructor.rating.toFixed(1)}</span>
            <span>🚗 {instructor.vehicle.type}</span>
            <span>💰 R$ {instructor.pricePerHour}/h</span>
          </div>

          <p className="text-xs text-muted-foreground">
            {instructor.totalLessons} aulas ministradas
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
