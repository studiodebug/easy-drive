import { Avatar } from "@/components/retroui/Avatar";
import { Badge } from "@/components/retroui/Badge";
import { StarRating } from "@/components/StarRating";
import { Text } from "@/components/retroui/Text";
import { Award, Car, MapPin } from "lucide-react";
import type { Instructor } from "@/types/instructor";

interface InstructorDetailsProps {
  instructor: Instructor;
}

export function InstructorDetails({ instructor }: InstructorDetailsProps) {
  return (
    <div className="space-y-6">
      <Text variant="h4">Instrutor</Text>

      <div className="flex items-start gap-6">
        <Avatar className="h-24 w-24 shrink-0">
          <Avatar.Image src={instructor.avatar} alt={instructor.name} />
          <Avatar.Fallback>
            {instructor.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </Avatar.Fallback>
        </Avatar>

        <div className="flex-1 space-y-4">
          <div>
            <Text variant="h4" className="mb-2">
              {instructor.name}
            </Text>

            <div className="flex items-center gap-4 flex-wrap mb-3">
              <div className="flex items-center gap-2">
                <StarRating rating={instructor.rating} size={20} />
                <Text variant="h6">{instructor.rating.toFixed(1)}</Text>
              </div>

              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                <Text variant="body">{instructor.totalClasses} aulas</Text>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              {instructor.specialties.map((specialty) => (
                <Badge key={specialty} variant="surface" size="sm">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>

          {instructor.bio && <Text variant="body">{instructor.bio}</Text>}
        </div>
      </div>

      {/* Vehicle and Location Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="flex items-start gap-3 p-3 rounded border-2">
          <Car className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <Text variant="bodySm">Veículo</Text>
            <Text variant="body" className="font-semibold">
              {instructor.carModel} {instructor.carYear}
            </Text>
            <Text variant="body">
              Câmbio{" "}
              {instructor.carTransmission === "manual" ? "Manual" : "Automático"}
            </Text>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded border-2">
          <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <Text variant="bodySm">Localização</Text>
            <Text variant="body" className="font-semibold">
              {instructor.address.city}
            </Text>
            <Text variant="body">{instructor.address.state}</Text>
          </div>
        </div>
      </div>
    </div>
  );
}
