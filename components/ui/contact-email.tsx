"use client";

import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

function hidden() {
  return null;
}

/**
 * El HTML inicial no incluye un mailto. El enlace se arma en el cliente
 * con el usuario y el dominio por separado.
 */
export function ContactEmail({ user, domain }: { user: string; domain: string }) {
  const href = useSyncExternalStore(
    subscribe,
    () => "mail" + "to:" + user + String.fromCharCode(64) + domain,
    hidden,
  );
  const label = (
    <>
      {user} [arroba] {domain}
    </>
  );
  if (!href) return <span className="contact-email">{label}</span>;
  return (
    <a className="contact-email" href={href}>
      {label}
    </a>
  );
}
