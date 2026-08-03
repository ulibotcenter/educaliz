import { useEffect, useState } from "react";
import { Lock, Sparkles, UserPlus, Users } from "lucide-react";
import {
  useProfilesStore,
  usernameAvailability,
  USERNAME_TAKEN_MSG,
} from "@/lib/profiles";
import { levelFromXp } from "@/lib/progression";
import { cn } from "@/lib/utils";

type Mode = "pick" | "create";

export function ProfileGate() {
  const listProfiles = useProfilesStore((s) => s.listProfiles);
  const createProfile = useProfilesStore((s) => s.createProfile);
  const selectProfile = useProfilesStore((s) => s.selectProfile);
  const bootstrapFromLegacy = useProfilesStore((s) => s.bootstrapFromLegacy);
  const bootstrapped = useProfilesStore((s) => s.bootstrapped);
  const profiles = useProfilesStore((s) => s.profiles);

  const [mode, setMode] = useState<Mode>("pick");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pinFor, setPinFor] = useState<string | null>(null);
  const [pinTry, setPinTry] = useState("");

  useEffect(() => {
    bootstrapFromLegacy();
  }, [bootstrapFromLegacy]);

  const list = listProfiles();

  useEffect(() => {
    if (bootstrapped && list.length === 0) setMode("create");
  }, [bootstrapped, list.length]);

  if (!bootstrapped) {
    return (
      <div className="grid min-h-[50vh] place-items-center text-muted">
        Abriendo la Academia…
      </div>
    );
  }

  function trySelect(id: string) {
    setError(null);
    const p = profiles[id];
    if (p?.pin) {
      setPinFor(id);
      setPinTry("");
      return;
    }
    const r = selectProfile(id);
    if (!r.ok) setError(r.error);
  }

  function confirmPin() {
    if (!pinFor) return;
    const r = selectProfile(pinFor, pinTry);
    if (!r.ok) {
      setError(r.error);
      return;
    }
    setPinFor(null);
    setPinTry("");
  }

  function onCreate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const check = usernameAvailability(username);
    if (!check.ok) {
      setError(check.error);
      return;
    }
    const r = createProfile({
      username: check.normalized,
      displayName: displayName.trim() || check.normalized,
      pin: pin.trim() || null,
    });
    if (!r.ok) {
      setError(r.error === "taken" ? USERNAME_TAKEN_MSG : r.error);
    }
  }

  // Live uniqueness hint
  const liveCheck =
    username.trim().length >= 3 ? usernameAvailability(username) : null;

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-var(--grok-banner-h,0px))] max-w-lg flex-col justify-center gap-6 px-4 py-10 animate-fade-in">
      <header className="space-y-2 text-center">
        <p className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          Academia Arcana
        </p>
        <h1 className="font-display text-3xl font-semibold text-fg">
          ¿Quién juega hoy?
        </h1>
        <p className="text-base text-muted">
          Elige tu perfil o crea uno nuevo. Cada maga guarda su propia magia.
        </p>
      </header>

      {error && (
        <p
          className="rounded-xl border border-danger/40 bg-danger/10 px-4 py-3 text-center text-sm font-medium text-danger"
          role="alert"
        >
          {error}
        </p>
      )}

      {pinFor && (
        <div className="space-y-3 rounded-2xl border-2 border-primary/40 bg-card p-5">
          <p className="flex items-center gap-2 font-semibold text-fg">
            <Lock className="h-4 w-4 text-primary" />
            PIN de 4 dígitos
          </p>
          <input
            type="password"
            inputMode="numeric"
            maxLength={4}
            value={pinTry}
            onChange={(e) => setPinTry(e.target.value.replace(/\D/g, "").slice(0, 4))}
            className="min-h-14 w-full rounded-xl border border-border bg-surface px-4 text-center text-2xl tracking-[0.4em] text-fg outline-none ring-primary focus:ring-2"
            placeholder="••••"
            autoFocus
          />
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                setPinFor(null);
                setError(null);
              }}
              className="min-h-12 rounded-xl border border-border bg-surface font-semibold text-fg"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={confirmPin}
              className="min-h-12 rounded-xl bg-primary font-bold text-primary-fg"
            >
              Entrar
            </button>
          </div>
        </div>
      )}

      {!pinFor && (
        <>
          <div className="grid grid-cols-2 gap-2 rounded-xl border border-border bg-surface/50 p-1">
            <button
              type="button"
              onClick={() => {
                setMode("pick");
                setError(null);
              }}
              className={cn(
                "inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg text-sm font-semibold",
                mode === "pick" ? "bg-primary text-primary-fg" : "text-muted",
              )}
            >
              <Users className="h-4 w-4" />
              Elegir
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("create");
                setError(null);
              }}
              className={cn(
                "inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg text-sm font-semibold",
                mode === "create" ? "bg-primary text-primary-fg" : "text-muted",
              )}
            >
              <UserPlus className="h-4 w-4" />
              Crear
            </button>
          </div>

          {mode === "pick" && (
            <ul className="space-y-3">
              {list.length === 0 ? (
                <li className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted">
                  Aún no hay perfiles. ¡Crea el primero!
                </li>
              ) : (
                list.map((p) => {
                  const level = levelFromXp(p.progress.xp);
                  return (
                    <li key={p.id}>
                      <button
                        type="button"
                        onClick={() => trySelect(p.id)}
                        className="flex w-full min-h-[4.5rem] items-center gap-3 rounded-2xl border border-border bg-card p-4 text-left transition hover:border-primary/40 active:scale-[0.99]"
                      >
                        <span className="shrink-0 scale-90">
                          {/* Portrait reads game store — show emoji fallback from profile avatar */}
                          <span className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-b from-violet-600/80 to-purple-900/80 text-3xl">
                            👧
                          </span>
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-display text-lg font-semibold text-fg">
                            {p.displayName}
                          </span>
                          <span className="block text-sm text-muted">
                            @{p.username} · Nv.{level} · {p.progress.xp} XP
                            {p.pin ? " · 🔒" : ""}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
          )}

          {mode === "create" && (
            <form onSubmit={onCreate} className="space-y-4 rounded-2xl border border-border bg-card p-5">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-fg" htmlFor="username">
                  Nombre de usuario *
                </label>
                <input
                  id="username"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value.replace(/[^a-zA-Z0-9]/g, "").slice(0, 16))
                  }
                  autoComplete="username"
                  className="min-h-12 w-full rounded-xl border border-border bg-surface px-4 text-base text-fg outline-none ring-primary focus:ring-2"
                  placeholder="ej: lizmaga"
                  required
                />
                <p className="text-xs text-muted">
                  Único · sin espacios · solo letras y números
                </p>
                {liveCheck && !liveCheck.ok && (
                  <p className="text-sm font-medium text-danger">{liveCheck.error}</p>
                )}
                {liveCheck && liveCheck.ok && (
                  <p className="text-sm font-medium text-success">
                    ✓ @{liveCheck.normalized} está libre
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-fg" htmlFor="display">
                  Nombre para mostrar
                </label>
                <input
                  id="display"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value.slice(0, 24))}
                  className="min-h-12 w-full rounded-xl border border-border bg-surface px-4 text-base text-fg outline-none ring-primary focus:ring-2"
                  placeholder="ej: Liz"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-fg" htmlFor="pin">
                  PIN de 4 dígitos (opcional)
                </label>
                <input
                  id="pin"
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  className="min-h-12 w-full rounded-xl border border-border bg-surface px-4 text-base tracking-widest text-fg outline-none ring-primary focus:ring-2"
                  placeholder="Opcional · protege tu perfil"
                />
              </div>

              <button
                type="submit"
                className="flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary text-base font-bold text-primary-fg"
              >
                <UserPlus className="h-5 w-5" />
                Crear perfil y entrar
              </button>
            </form>
          )}
        </>
      )}

      <p className="text-center text-xs text-muted">
        Sin email ni contraseña. Más adelante se podrá guardar en la nube.
      </p>
    </div>
  );
}
