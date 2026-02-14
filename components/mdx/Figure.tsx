import Image from "next/image";

/**
 * Props for the Figure component.
 * - src/alt: Required for accessibility + Next/Image optimisation.
 * - caption: Optional text shown under the image.
 * - width/height: Optional intrinsic size used by Next/Image (defaults keep layout stable).
 */
type Props = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};

/**
 * Figure
 * A reusable MDX-friendly image component with consistent styling:
 * - Card-like container (rounded corners, border, subtle shadow)
 * - Optional caption
 *
 * Use this instead of raw <img> in MDX to keep images consistent across the site.
 */
export default function Figure({
  src,
  alt,
  caption,
  width = 1400,
  height = 800,
}: Props) {
  return (
    // Semantic figure wrapper so captions are correctly associated with the image.
    <figure className="mt-8">
      {/* Styled image container to match the site's "card" look. */}
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full"
        />
      </div>

      {/* Only render a caption when one is provided. */}
      {caption ? (
        <figcaption className="mt-2 text-sm text-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}