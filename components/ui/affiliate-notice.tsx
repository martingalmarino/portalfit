export function AffiliateNotice({ text, show }: { text: string; show: boolean }) {
  if (!show) return null;
  return <p className="xs affiliate-note">{text}</p>;
}
