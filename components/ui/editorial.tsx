import { publicCopy, publishedCopy } from "@/lib/format";

export function Editorial({
  text,
  className,
  verbatim = false,
}: {
  text: string;
  className?: string;
  verbatim?: boolean;
}) {
  const visible = (verbatim ? publishedCopy : publicCopy)(String(text));
  if (!visible) return null;
  return <span className={className}>{visible}</span>;
}
