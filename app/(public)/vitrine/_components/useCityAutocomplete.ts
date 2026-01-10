import { useState, useMemo, useRef, useEffect } from "react";
import { brazilStates } from "./brazil-locations";

export interface CitySuggestion {
  name: string;
  state: string;
}

export function useCityAutocomplete() {
  const [searchCity, setSearchCity] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Extract all cities with their states
  const allCities: CitySuggestion[] = useMemo(() => {
    return brazilStates.flatMap((state) =>
      state.cities.map((city) => ({
        name: city.name,
        state: state.code,
      }))
    );
  }, []);

  // Filter cities based on search input (max 5)
  const suggestions = useMemo(() => {
    if (!searchCity.trim()) return [];
    
    const searchLower = searchCity.toLowerCase().trim();
    const filtered = allCities.filter((city) =>
      city.name.toLowerCase().includes(searchLower)
    );
    
    return filtered.slice(0, 5);
  }, [searchCity, allCities]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCity(e.target.value);
    setShowSuggestions(true);
    setFocusedIndex(-1);
  };

  // Handle city selection
  const handleCitySelect = (city: CitySuggestion, onSelect?: (city: CitySuggestion) => void) => {
    setSearchCity(city.name);
    setShowSuggestions(false);
    setFocusedIndex(-1);
    onSelect?.(city);
  };

  // Handle keyboard navigation
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    onSelect?: (city: CitySuggestion) => void,
    onSubmit?: () => void
  ) => {
    if (showSuggestions && suggestions.length > 0) {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex((prev) =>
            prev < suggestions.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case "Enter":
          e.preventDefault();
          if (focusedIndex >= 0 && suggestions[focusedIndex]) {
            handleCitySelect(suggestions[focusedIndex], onSelect);
          } else {
            onSubmit?.();
          }
          break;
        case "Escape":
          setShowSuggestions(false);
          setFocusedIndex(-1);
          break;
      }
      return;
    }
    
    // If no suggestions are shown, let Enter trigger submit
    if (e.key === "Enter" && searchCity.trim()) {
      onSubmit?.();
    }
  };

  // Get selected city for submit (exact match or first suggestion)
  const getSelectedCityForSubmit = (): CitySuggestion | null => {
    if (!searchCity.trim()) return null;
    
    // Try exact match first
    const foundCity = allCities.find(
      (c) => c.name.toLowerCase() === searchCity.toLowerCase().trim()
    );
    
    if (foundCity) return foundCity;
    
    // If no exact match but we have suggestions, use the first one
    if (suggestions.length > 0) {
      return suggestions[0];
    }
    
    return null;
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return {
    searchCity,
    setSearchCity,
    showSuggestions,
    setShowSuggestions,
    focusedIndex,
    setFocusedIndex,
    suggestions,
    allCities,
    containerRef,
    handleInputChange,
    handleCitySelect,
    handleKeyDown,
    getSelectedCityForSubmit,
  };
}
