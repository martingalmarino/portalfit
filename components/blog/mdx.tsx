import type { ReactNode } from "react";
import Link from "next/link";

export function H({ n, id, children }: { n: string; id: string; children: ReactNode }) {
  return (
    <h2 id={id}>
      <span className="hn">{n}</span>
      {children}
    </h2>
  );
}

export function Tldr({ children }: { children: ReactNode }) {
  return (
    <div className="tldr">
      <div className="kicker">En corto</div>
      {children}
    </div>
  );
}

export function Study({
  kicker = "Módulo de estudio",
  badge = "Position stand",
  title,
  meta,
  href,
  tipo,
  poblacion,
  hallazgo,
  quote,
  note,
}: {
  kicker?: string;
  badge?: string;
  title: string;
  meta: string;
  href: string;
  tipo: string;
  poblacion: string;
  hallazgo: string;
  quote: string;
  note: string;
}) {
  return (
    <div className="study">
      <div className="st-h" style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <span className="kicker light">{kicker}</span>
        <span className="pill" style={{ background: "var(--paper)", color: "var(--forest)" }}>
          {badge}
        </span>
      </div>
      <h3 className="h3" style={{ marginTop: 14, color: "var(--paper)" }}>
        {title}
      </h3>
      <p className="xs" style={{ marginTop: 8, color: "#c9c3b5" }}>
        {meta}
      </p>
      <div className="st-g">
        <div>
          <span className="xs">Tipo</span>
          <b style={{ display: "block" }}>{tipo}</b>
        </div>
        <div>
          <span className="xs">Población</span>
          <b style={{ display: "block" }}>{poblacion}</b>
        </div>
        <div>
          <span className="xs">Hallazgo clave</span>
          <b style={{ display: "block" }}>{hallazgo}</b>
        </div>
        <div>
          <span className="xs">Grado en Portal FIT</span>
          <b style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span className="grade g-A" style={{ width: 24, height: 24, fontSize: 13 }}>
              A
            </span>
            Alta
          </b>
        </div>
      </div>
      <p className="st-q" style={{ font: "300 italic 22px/1.35 var(--serif)", marginTop: 18 }}>
        “{quote}”
      </p>
      <p className="xs" style={{ color: "#c9c3b5" }}>
        {note}{" "}
        <a href={href} target="_blank" rel="noreferrer">
          Leer el estudio
        </a>
      </p>
    </div>
  );
}

export function CalcTable() {
  const rows = [
    ["60 kg", "1,4–2,0 g/kg", "84–120 g", "21–30 g c/u"],
    ["70 kg", "1,4–2,0 g/kg", "98–140 g", "25–35 g c/u"],
    ["85 kg", "1,4–2,0 g/kg", "119–170 g", "30–43 g c/u"],
  ];
  return (
    <div className="calcb">
      <div className="kicker">Ejemplo de cálculo</div>
      <table>
        <thead>
          <tr>
            <th>Peso</th>
            <th>Rango</th>
            <th>Total diario</th>
            <th>En 4 comidas</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, index) => (
                <td key={cell}>{index === 2 ? <b>{cell}</b> : cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="xs" style={{ marginTop: 10 }}>
        Orientativo, para personas sanas que entrenan. No es una recomendación individual. Texto de ejemplo.
      </p>
    </div>
  );
}

export function Quote({ cite, children }: { cite: string; children: ReactNode }) {
  return (
    <blockquote className="pullq">
      {children}
      <cite>{cite}</cite>
    </blockquote>
  );
}

export function Checks({ children }: { children: ReactNode }) {
  return <ul className="chk">{children}</ul>;
}

export function Check({ children }: { children: ReactNode }) {
  return (
    <li>
      <span aria-hidden>✓</span>
      <div>{children}</div>
    </li>
  );
}

export function ExampleNote({ children }: { children: ReactNode }) {
  return (
    <p className="small">
      <span className="ex-flag">Contenido de ejemplo</span> {children}
    </p>
  );
}

export function GuideLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href}>{children}</Link>;
}
