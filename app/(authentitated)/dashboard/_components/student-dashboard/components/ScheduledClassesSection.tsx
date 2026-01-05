import { ScheduledClassesEmpty } from "./ScheduledClassesEmpty";
import { ScheduledClassesList } from "./ScheduledClassesList";
import { ScheduledClass } from "../data/scheduled-classes-mock";

interface ScheduledClassesSectionProps {
  scheduledClasses: ScheduledClass[];
}

/**
 * Wrapper component that conditionally renders either the scheduled classes list
 * or an empty state based on whether there are scheduled classes.
 *
 * @example
 * // With scheduled classes
 * import { scheduledClassesMock } from "../data/scheduled-classes-mock";
 * <ScheduledClassesSection scheduledClasses={scheduledClassesMock} />
 *
 * @example
 * // Without scheduled classes (empty state)
 * <ScheduledClassesSection scheduledClasses={[]} />
 */
export function ScheduledClassesSection({
  scheduledClasses,
}: ScheduledClassesSectionProps) {
  if (scheduledClasses.length === 0) {
    return <ScheduledClassesEmpty />;
  }

  return <ScheduledClassesList scheduledClasses={scheduledClasses} />;
}
