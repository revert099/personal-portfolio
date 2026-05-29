export type ContentType = "cyber" | "ai" | "automation" | "software" | "photo" | "blog";

/**
 * Converts the short `type` key stored in MDX frontmatter into a nice label for UI.
 * Keeps the content consistent (short keys) while letting the UI be human-readable.
 */

export function typeLabel(type: string): string {
  switch (type.trim().toLowerCase()) {
    case "cyber":
      return "Cybersecurity";
    case "ai":
      return "AI";
    case "automation":
      return "Automation";
    case "blog":
      return "Blog";
    case "case study":
      return "Case Study";
    case "photo":
      return "Photography";
    case "literature review":
      return "Literature Review";
    default:
      return "Software";
  }
}
