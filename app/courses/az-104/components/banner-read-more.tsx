import { ReadMore } from "./read-more";

interface Props {
  children: React.ReactNode;
}

// Wraps the banner description in the same ReadMore pattern used by Course
// Overview — mobile gets a plain "Read more" button below the clamped text,
// desktop gets "Read more" positioned right after the visible text ends —
// just themed for the dark banner background and with breakpoint-specific
// line clamps.
export function BannerReadMore({ children }: Props) {
  return (
    <>
      <div className="sm:hidden mb-4">
        <ReadMore lines={3} hoverClassName="hover:text-cyan-300">
          {children}
        </ReadMore>
      </div>
      <div className="hidden sm:block mb-4">
        <ReadMore lines={3} hoverClassName="hover:text-cyan-300">
          {children}
        </ReadMore>
      </div>
    </>
  );
}
