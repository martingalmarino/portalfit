import { pendingParts } from "@/lib/format";

export function Editorial({ text, className }: { text: string; className?: string }) {
  const parts = pendingParts(String(text));
  return (
    <span className={className}>
      {parts.map((part, index) =>
        part.pending ? (
          <span key={index} className="pend">
            Pendiente
          </span>
        ) : (
          <span key={index}>{part.text}</span>
        ),
      )}
    </span>
  );
}
