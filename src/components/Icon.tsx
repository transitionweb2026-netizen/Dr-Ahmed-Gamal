import type { LucideProps } from "lucide-react";
import { iconMap, type IconName } from "@/constants/iconMap";

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Component = iconMap[name];
  return <Component {...props} />;
}
