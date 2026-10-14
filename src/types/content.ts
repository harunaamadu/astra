export type Section = {
  heading: string;
  paragraphs?: string[];
  items?: { title: string; text: string }[];
};

export type InfoPage = {
  slug: string;
  title: string;
  description: string;
  headline: string;
  intro: string;
  sections: Section[];
  cta?: { title: string; text: string; label: string; href: string };
};

export type HelpArticle = { slug: string; title: string; summary: string; sections: Section[] };
export type LegalDoc = { slug: string; title: string; summary: string; updated: string; sections: Section[] };
export type BlogPost = { slug: string; title: string; date: string; excerpt: string; body: Section[] };

export type Plan = {
  id: string;
  name: string;
  /** cents; 0 = free */
  price: number;
  period?: string;
  description: string;
  features: string[];
  cta: { label: string; href: string };
  highlighted?: boolean;
  badge?: string;
};
