export type NavItem = {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
};

export type SiteConfig = {
  name: string;
  description: string;
  mainNav: NavItem[];
};

import { Home, BookOpen, Award, BrainCircuit } from 'lucide-react';

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
