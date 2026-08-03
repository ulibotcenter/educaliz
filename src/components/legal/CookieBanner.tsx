import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Shield } from "lucide-react";
import {
  acceptCookieConsent,
  hasCookieConsent,
} from "@/lib/legal/consent";

/** Bottom banner — first visit only, until Accept */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!hasCookieConsent());
  }, []);

  if (!visible) return null;

  function accept() {
    acceptCookieConsent();
    setVisible(false);
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[80] p-3 sm:p-4"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border-2 border-primary/40 bg-card p-4 shadow-[0_8px_40px_rgba(0,0,0,0.25)] sm:flex-row sm:items-center sm:gap-4 sm:p-5">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
          <Shield className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0 flex-1 space-y-1">
          <p
            id="cookie-banner-title"
            className="font-display text-sm font-semibold text-fg sm:text-base"
          >
            Almacenamiento y privacidad
          </p>
          <p
            id="cookie-banner-desc"
            className="text-sm leading-snug text-muted"
          >
            Esta aplicación utiliza almacenamiento local y en la nube para
            guardar el progreso del juego y los perfiles. Al continuar, aceptas
            el uso de este almacenamiento según nuestra{" "}
            <Link
              to="/politicas"
              hash="privacidad"
              className="font-semibold text-primary underline-offset-2 hover:underline"
            >
              Política de Privacidad
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:w-44">
          <button
            type="button"
            onClick={accept}
            className="min-h-12 rounded-xl bg-primary px-4 text-sm font-bold text-primary-fg"
          >
            Aceptar
          </button>
          <Link
            to="/politicas"
            hash="privacidad"
            className="min-h-10 text-center text-xs font-semibold text-primary underline-offset-2 hover:underline"
          >
            Ver Política de Privacidad
          </Link>
        </div>
      </div>
    </div>
  );
}
