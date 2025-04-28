import type { LucideIcon } from 'lucide-react'; // Import LucideIcon type
import { Home, BookOpen, Award, BrainCircuit } from 'lucide-react';

export type NavItem = {
  title: string;
  href: string;
  icon?: LucideIcon; // Use LucideIcon type
  disabled?: boolean;
};

export type SiteConfig = {
  name: string;
  description: string;
  mainNav: NavItem[];
};


export const siteConfig: SiteConfig = {
  name: "SkillSync",
  description: "Live Skills Tracker and Micro-Certification Hub",
  mainNav: [
    {
      title: "Dashboard",
      href: "/",
      icon: Home,
    },
    {
      title: "Skills",
      href: "/skills",
      icon: BookOpen,
    },
    {
      title: "Certificates",
      href: "/certificates",
      icon: Award,
    },
    {
        title: "Micro Tasks",
        href: "/micro-tasks",
        icon: BrainCircuit,
      },
  ],
};
