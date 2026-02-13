export type ExplorerItem = {
  id: string;          // unique key (slug, id)
  href: string;        // link to detail page
  title: string;
  summary?: string;
  date?: string;       // YYYY-MM-DD
  type?: string;       // "ai" | "automation" | "cyber" | etc
  tags?: string[];     // stack/categories
  confidential?: boolean;
};