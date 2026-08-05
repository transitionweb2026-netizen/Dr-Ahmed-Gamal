export interface NavLink {
  href: string;
  labelKey:
    | "home"
    | "about"
    | "procedures"
    | "beforeAfter"
    | "patientStories"
    | "blog"
    | "videos"
    | "faq"
    | "contact";
}

export const navLinks: NavLink[] = [
  { href: "/", labelKey: "home" },
  { href: "/about", labelKey: "about" },
  { href: "/procedures", labelKey: "procedures" },
  { href: "/before-after", labelKey: "beforeAfter" },
  { href: "/patient-stories", labelKey: "patientStories" },
  { href: "/blog", labelKey: "blog" },
  { href: "/videos", labelKey: "videos" },
  { href: "/faq", labelKey: "faq" },
  { href: "/contact", labelKey: "contact" },
];
