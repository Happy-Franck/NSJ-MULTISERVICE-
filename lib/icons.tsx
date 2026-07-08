// Icônes SVG (style Lucide, contour uniforme) utilisées dans tout le site.

export type IconName =
  | "concierge"
  | "clean"
  | "extreme"
  | "debarras"
  | "reno"
  | "serrurerie"
  | "transport"
  | "bricolage"
  | "verts"
  | "derat"
  | "biens"
  | "literie"
  | "bolt"
  | "shield"
  | "clock"
  | "heart"
  | "phone"
  | "mail"
  | "chat"
  | "pin"
  | "arrow";

const PATHS: Record<IconName, string> = {
  concierge:
    '<path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6"/><circle cx="12" cy="11" r="1.5"/>',
  clean:
    '<path d="M19 3l-7 7M14 3h5v5M9.5 12.5L5 21l-2-2 8.5-4.5M8 13l3 3"/>',
  extreme:
    '<path d="M12 2l2.5 5 5.5.8-4 3.9 1 5.5L12 19l-5 2.6 1-5.5-4-3.9 5.5-.8z"/><path d="M5 22h14"/>',
  debarras:
    '<path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 10v6M14 10v6"/>',
  reno:
    '<path d="M3 21h18M5 21v-9l7-6 7 6v9M9 21v-5h6v5"/><path d="M14 3l3 3-2 2"/>',
  serrurerie:
    '<circle cx="9" cy="9" r="5"/><path d="M12.5 12.5L21 21M17 17l2-2 2 2-2 2zM9 9h.01"/>',
  transport:
    '<path d="M1 11h13v6H1zM14 8h4l3 3v6h-7z"/><circle cx="5" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
  bricolage:
    '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2-2z"/>',
  verts:
    '<path d="M12 22V12M12 12c0-5 3-8 8-8 0 5-3 8-8 8zM12 14c0-4-2.5-6.5-6.5-6.5C5.5 11.5 8 14 12 14z"/>',
  derat:
    '<path d="M3 12c0-3 2-5 5-5 4 0 6 3 10 3M8 7a2 2 0 1 0 0-.01M18 10l3-2M18 10l3 2M2 14c2 4 6 6 10 6 5 0 9-3 9-7"/>',
  biens:
    '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
  literie:
    '<path d="M2 4v16M2 8h16a3 3 0 0 1 3 3v9M2 17h20M6 8V6h4v2"/>',
  bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/>',
  shield:
    '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  heart:
    '<path d="M19 14c1.5-1.5 3-3.3 3-5.5A4.5 4.5 0 0 0 12 6 4.5 4.5 0 0 0 2 8.5c0 2.2 1.5 4 3 5.5l7 7z"/>',
  phone:
    '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8.1 9.5a16 16 0 0 0 6 6l1.1-1.1a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/>',
  chat:
    '<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-3.8-.9L3 20l1.3-4a8.4 8.4 0 0 1-.8-3.6 8.5 8.5 0 0 1 17 0z"/>',
  pin: '<path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
};

export function Icon({
  name,
  strokeWidth = 1.7,
}: {
  name: IconName;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: PATHS[name] }}
    />
  );
}
