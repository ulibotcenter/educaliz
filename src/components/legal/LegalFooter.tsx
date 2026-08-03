import { Link } from "@tanstack/react-router";

/** Permanent legal line + policies link (main screens + profile gate) */
export function LegalFooter({
  compact,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <footer
      className={`space-y-1 text-center text-[11px] leading-snug text-muted ${className}`}
    >
      <p>
        Academia Arcana · Herramienta educativa independiente · Uso bajo
        responsabilidad familiar
      </p>
      {!compact && (
        <p>
          <Link
            to="/politicas"
            className="font-semibold text-primary/90 underline-offset-2 hover:underline"
          >
            Políticas, privacidad y exención de responsabilidad
          </Link>
        </p>
      )}
      {compact && (
        <p>
          <Link
            to="/politicas"
            className="font-medium text-primary/80 underline-offset-2 hover:underline"
          >
            Políticas
          </Link>
        </p>
      )}
    </footer>
  );
}
