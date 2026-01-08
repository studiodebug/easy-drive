"use client";

import { useState, useMemo } from "react";
import { VitrineInstructorCard } from "./VitrineInstructorCard";
import { VitrineMobileFilters } from "./VitrineMobileFilters";
import { VitrineFilters } from "./VitrineFilters";
import { VitrineSearchBanner } from "./VitrineSearchBanner";
import { instructorsMock } from "@/app/(authentitated)/dashboard/_components/student-dashboard/data/instructors-mock";
import { Instructor } from "@/app/(authentitated)/dashboard/_components/student-dashboard/data/instructors-mock";
import { brazilStates } from "./brazil-locations";

export function VitrineInstructors({ isLoggedIn }: { isLoggedIn?: boolean }) {
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  const handleCitySearch = (cityName: string) => {
    for (const state of brazilStates) {
      const city = state.cities.find(
        (c) => c.name.toLowerCase() === cityName.toLowerCase()
      );
      if (city) {
        setSelectedState(state.code);
        setSelectedCity(city.name);
        return;
      }
    }
    setSelectedCity(cityName);
  };

  const filteredInstructors = useMemo(() => {
    let filtered: Instructor[] = [...instructorsMock];

    if (selectedState) {
      filtered = filtered.filter(
        (instructor) => instructor.state === selectedState
      );
    }

    if (selectedCity) {
      filtered = filtered.filter(
        (instructor) => instructor.city === selectedCity
      );
    }

    return filtered;
  }, [selectedState, selectedCity]);

  return (
    <div className="w-full flex flex-col">
      <VitrineSearchBanner onSearch={handleCitySearch} />
      <div className="w-full flex flex-col gap-4 items-center px-5 py-6">
        {(selectedState || selectedCity) && (
          <div className="w-full max-w-7xl text-sm text-muted-foreground">
            {filteredInstructors.length} instrutor
            {filteredInstructors.length !== 1 ? "es" : ""} encontrado
            {filteredInstructors.length !== 1 ? "s" : ""}
            {selectedState && ` em ${selectedState}`}
            {selectedCity && ` - ${selectedCity}`}
          </div>
        )}

        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          <aside className="hidden lg:block">
            <VitrineFilters
              selectedState={selectedState}
              selectedCity={selectedCity}
              onStateChange={setSelectedState}
              onCityChange={setSelectedCity}
            />
          </aside>

          <div className="flex flex-col">
            <div className="lg:hidden">
              <VitrineMobileFilters
                selectedState={selectedState}
                selectedCity={selectedCity}
                onStateChange={setSelectedState}
                onCityChange={setSelectedCity}
              />
            </div>

            {filteredInstructors.length > 0 ? (
              <main className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {filteredInstructors.map((instructor) => (
                  <div key={instructor.id} className="h-full">
                    <VitrineInstructorCard
                      instructor={instructor}
                      isLoggedIn={!!isLoggedIn}
                    />
                  </div>
                ))}
              </main>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-2">
                  Nenhum instrutor encontrado
                </p>
                <p className="text-sm text-muted-foreground">
                  Tente ajustar os filtros para encontrar mais resultados
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
