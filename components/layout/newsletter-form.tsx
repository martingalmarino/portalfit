"use client";

import { useState } from "react";

export function NewsletterForm({ variant = "footer" }: { variant?: "footer" | "rail" }) {
  const [note, setNote] = useState("");
  return (
    <form
      className={variant === "footer" ? "nl" : ""}
      onSubmit={(event) => {
        event.preventDefault();
        setNote("La newsletter todavía no está activa. No guardamos el email en esta etapa.");
      }}
    >
      <label className="sr-only" htmlFor={variant === "footer" ? "newsletter-email" : "rail-email"}>
        Email
      </label>
      {variant === "rail" ? (
        <div className="nl" style={{ marginTop: 14, maxWidth: "none" }}>
          <input id="rail-email" name="email" type="email" required autoComplete="email" placeholder="Tu email" />
          <button className="btn btn-brass" type="submit">
            Suscribirme
          </button>
        </div>
      ) : (
        <>
          <input id="newsletter-email" name="email" type="email" required autoComplete="email" placeholder="Tu email" />
          <button className="btn btn-brass" type="submit">
            Suscribirme
          </button>
        </>
      )}
      {note ? (
        <p className="xs" style={{ color: "#d9d3c6", marginTop: 10 }} role="status">
          {note}
        </p>
      ) : null}
    </form>
  );
}
