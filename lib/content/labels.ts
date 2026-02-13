export type ContentType = "cyber" | "ai" | "automation" | "software" | "photo" | "blog";

/**
 * Converts the short `type` key stored in MDX frontmatter into a nice label for UI.
 * Keeps the content consistent (short keys) while letting the UI be human-readable.
 */

export function typeLabel(type: string): string {
  switch (type) {
    case "cyber":
      return "Cybersecurity";
    case "AI":
      return "AI";
    case "automation":
      return "Automation";
    case "blog":
      return "Blog";
    case "Case Study":
      return "Case Study";
    case "photo":
      return "Photography";
    default:
      return "Software";
    case "Literature Review":
      return "Literature Review";
  }
}