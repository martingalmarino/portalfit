import Link from "next/link";
import { getSiteName } from "@/lib/site";

export function Wordmark({ href = "/" }: { href?: string }) {
  return (
    <Link className="brand" href={href} aria-label={getSiteName()}>
      <span className="mark" aria-hidden>
        <i>F</i>
      </span>
      <span className="wm">
        <em>Portal</em>
        <b>FIT</b>
      </span>
    </Link>
  );
}
