import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <main className="grid min-h-[calc(100dvh-var(--grok-banner-h,0px))] place-items-center p-6">
      <div className="w-full max-w-sm space-y-4 rounded-xl border border-border bg-card p-6">
        <h1 className="font-display text-xl font-semibold text-fg">Entrar (opcional)</h1>
        <p className="text-sm text-muted">
          El juego de Liz funciona sin cuenta. El progreso se guarda en este dispositivo.
        </p>
        {authEnabled ? (
          GROK_PROVIDERS.map((p) => (
            <button
              key={p.providerId}
              type="button"
              onClick={() => signIn(p.providerId, { callbackURL: "/" })}
              className="w-full rounded-md border border-border bg-surface px-4 py-2.5 text-fg transition hover:bg-surface-2"
            >
              Continuar con {p.label}
            </button>
          ))
        ) : (
          <p className="text-sm text-muted">El inicio de sesión está desactivado.</p>
        )}
        <Link to="/" className="block text-center text-sm text-primary underline-offset-2 hover:underline">
          Volver a la academia
        </Link>
      </div>
    </main>
  );
}
