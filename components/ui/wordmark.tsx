import Link from "next/link";

export function Wordmark({ href = "/" }: { href?: string }) {
  return (
    <Link className="brand" href={href}>
      <span className="mark" aria-hidden>
        <i>F</i>
      </span>
      <span className="wm">
        <em>Portal</em> <b>FIT</b>
      </span>
    </Link>
  );
}
