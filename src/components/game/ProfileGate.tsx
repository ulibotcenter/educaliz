import { useEffect, useMemo, useState } from "react";
import { CloudOff, Lock, Sparkles, Trash2, UserPlus, Users } from "lucide-react";
import {
  useProfilesStore,
  usernameAvailability,
  usernameAvailabilityAsync,
  USERNAME_TAKEN_MSG,
} from "@/lib/profiles";
import { normalizeInviteCode } from "@/lib/profiles/referral";
import { levelFromXp } from "@/lib/progression";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { LegalFooter } from "@/components/legal/LegalFooter";
import { recordLegalAcceptance } from "@/lib/legal/consent";

type Mode = "pick" | "create";

function readInviteFromUrl(): string {
  if (typeof window === "undefined") return "";
  try {
    const q = new URLSearchParams(window.location.search);
    const raw =
      q.get("ref") || q.get("invite") || q.get("codigo") || q.get("code") || "";
    return normalizeInviteCode(raw);
  } catch {
    return "";
  }
}

export function ProfileGate() {
  const listProfiles = useProfilesStore((s) => s.listProfiles);
  const createProfile = useProfilesStore((s) => s.createProfile);
  const deleteProfile = useProfilesStore((s) => s.deleteProfile);
  const selectProfile = useProfilesStore((s) => s.selectProfile);
  const bootstrapFromLegacy = useProfilesStore((s) => s.bootstrapFromLegacy);
  const bootstrapped = useProfilesStore((s) => s.bootstrapped);
  const loading = useProfilesStore((s) => s.loading);
  const profiles = useProfilesStore((s) => s.profiles);
  const cloudError = useProfilesStore((s) => s.cloudError);
  const cloudEnabled = useProfilesStore((s) => s.cloudEnabled);
  const clearCloudError = useProfilesStore((s) => s.clearCloudError);
  const refreshFromCloud = useProfilesStore((s) => s.refreshFromCloud);

  const urlInvite = useMemo(() => readInviteFromUrl(), []);

  const [mode, setMode] = useState<Mode>(() =>
    urlInvite ? "create" : "pick",
  );
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [pin, setPin] = useState("");
  const [friendCode, setFriendCode] = useState(urlInvite);
  const [legalAccepted, setLegalAccepted] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pinFor, setPinFor] = useState<string | null>(null);
  const [pinTry, setPinTry] = useState("");
  const [busy, setBusy] = useState(false);
  const [liveHint, setLiveHint] = useState<string | null>(null);
  const [liveOk, setLiveOk] = useState(false);

  useEffect(() => {
    void bootstrapFromLegacy();
  }, [bootstrapFromLegacy]);

  const list = listProfiles();

  useEffect(() => {
    if (!bootstrapped) return;
    if (urlInvite) {
      setMode("create");
      setFriendCode(urlInvite);
      return;
    }
    if (list.length === 0) setMode("create");
    else setMode("pick");
  }, [bootstrapped, list.length, urlInvite]);

  useEffect(() => {
    if (username.trim().length < 3) {
      setLiveHint(null);
      setLiveOk(false);
      return;
    }
    const local = usernameAvailability(username);
    if (!local.ok) {
      setLiveHint(local.error);
      setLiveOk(false);
      return;
    }
    let cancelled = false;
    const t = window.setTimeout(() => {
      void usernameAvailabilityAsync(username).then((r) => {
        if (cancelled) return;
        if (!r.ok) {
          setLiveHint(r.error);
          setLiveOk(false);
        } else {
          setLiveHint(`✓ @${r.normalized} está libre`);
          setLiveOk(true);
        }
      });
    }, 350);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [username]);

  if (!bootstrapped) {
    return (
      <div className="grid min-h-[50vh] place-items-center gap-2 bg-academy text-muted">
        <Sparkles className="h-6 w-6 animate-pulse text-primary" />
        <p>Abriendo la Academia…</p>
        {cloudEnabled && (
          <p className="text-xs">Conectando con la nube mágica…</p>
        )}
      </div>
    );
  }

  async function trySelect(id: string) {
    setError(null);
    clearCloudError();
    const p = profiles[id];
    if (p?.pin) {
      setPinFor(id);
      setPinTry("");
      return;
    }
    setBusy(true);
    try {
      const r = await selectProfile(id);
      if (!r.ok) setError(r.error);
    } finally {
      setBusy(false);
    }
  }

  async function confirmPin() {
    if (!pinFor) return;
    setBusy(true);
    setError(null);
    try {
      const r = await selectProfile(pinFor, pinTry);
      if (!r.ok) {
        setError(r.error);
        return;
      }
      setPinFor(null);
      setPinTry("");
    } finally {
      setBusy(false);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setBusy(true);
    setError(null);
    clearCloudError();
    try {
      const r = await deleteProfile(deleteTarget);
      if (!r.ok) {
        setError(r.error);
        return;
      }
      setDeleteTarget(null);
    } finally {
      setBusy(false);
    }
  }

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    clearCloudError();
    setBusy(true);
    try {
      const check = await usernameAvailabilityAsync(username);
      if (!check.ok) {
        setError(check.error);
        return;
      }
      if (!legalAccepted) {
        setError("Debes aceptar las políticas para crear un perfil.");
        return;
      }
      const dn = displayName.trim() || check.normalized;
      recordLegalAcceptance({
        username: check.normalized,
        displayName: dn,
      });
      const r = await createProfile({
        username: check.normalized,
        displayName: dn,
        pin: pin.trim() || null,
        friendCode: friendCode.trim() || null,
      });
      if (!r.ok) {
        setError(r.error.includes("usado") ? USERNAME_TAKEN_MSG : r.error);
        return;
      }
      // Clean invite param from URL after success
      try {
        const url = new URL(window.location.href);
        ["ref", "invite", "codigo", "code"].forEach((k) =>
          url.searchParams.delete(k),
        );
        window.history.replaceState({}, "", url.pathname + url.search);
      } catch {
        /* ignore */
      }
    } finally {
      setBusy(false);
    }
  }

  const showError = error || cloudError;

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-var(--grok-banner-h,0px))] max-w-lg flex-col justify-center gap-5 px-4 py-8 animate-fade-in sm:py-10">
      <header className="space-y-2 text-center">
        <p className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          Academia Arcana
        </p>
        <h1 className="font-display text-3xl font-semibold text-fg">
          ¿Quién juega hoy?
        </h1>
        <p className="text-base text-muted">
          Elige tu perfil o crea uno nuevo. Ideal para hermanas y amigos.
        </p>
      </header>

      {urlInvite && mode === "create" && (
        <p className="rounded-xl border border-success/40 bg-success/10 px-3 py-2 text-center text-sm font-medium text-success">
          ¡Te invitaron con un código mágico! Solo crea tu perfil para ganar XP
          extra.
        </p>
      )}

      {showError && (
        <div
          className="flex items-start gap-2 rounded-xl border border-danger/40 bg-danger/10 px-4 py-3 text-sm font-medium text-danger"
          role="alert"
        >
          <CloudOff className="mt-0.5 h-4 w-4 shrink-0" />
          <div className="space-y-2">
            <p>{showError}</p>
            {cloudEnabled && (
              <button
                type="button"
                disabled={busy || loading}
                onClick={() => {
                  clearCloudError();
                  setError(null);
                  void refreshFromCloud();
                }}
                className="text-xs font-bold underline"
              >
                Reintentar conexión
              </button>
            )}
          </div>
        </div>
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
            onChange={(e) =>
              setPinTry(e.target.value.replace(/\D/g, "").slice(0, 4))
            }
            className="min-h-14 w-full rounded-xl border border-border bg-surface px-4 text-center text-2xl tracking-[0.4em] text-fg outline-none ring-primary focus:ring-2"
            placeholder="••••"
            autoFocus
          />
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              disabled={busy}
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
              disabled={busy}
              onClick={() => void confirmPin()}
              className="min-h-12 rounded-xl bg-primary font-bold text-primary-fg disabled:opacity-60"
            >
              {busy ? "…" : "Entrar"}
            </button>
          </div>
        </div>
      )}

      
      {deleteTarget && profiles[deleteTarget] && (
        <div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-black/45 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-profile-title"
        >
          <div className="w-full max-w-md space-y-4 rounded-2xl border-2 border-danger/40 bg-card p-5 shadow-xl animate-fade-in">
            <p
              id="delete-profile-title"
              className="font-display text-lg font-semibold text-fg"
            >
              ¿Borrar perfil?
            </p>
            <p className="text-sm leading-relaxed text-muted">
              ¿Seguro que quieres borrar el perfil de{" "}
              <strong className="text-fg">
                {profiles[deleteTarget].displayName}
              </strong>
              ?
              <br />
              Se perderá todo el progreso. Esta acción no se puede deshacer.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                disabled={busy}
                onClick={() => setDeleteTarget(null)}
                className="min-h-12 rounded-xl border border-border bg-surface font-semibold text-fg"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => void confirmDelete()}
                className="min-h-12 rounded-xl bg-danger font-bold text-white disabled:opacity-60"
              >
                {busy ? "…" : "Sí, borrar"}
              </button>
            </div>
          </div>
        </div>
      )}

{!pinFor && mode === "pick" && (
        <div className="space-y-4">
          <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-fg">
            <Users className="h-4 w-4 text-primary" />
            Elige un perfil
          </p>

          {list.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted">
              Aún no hay perfiles. ¡Crea el primero!
            </p>
          ) : (
            <ul className="grid grid-cols-2 gap-3 sm:gap-4">
              {list.map((p) => {
                const level = levelFromXp(p.progress.xp);
                return (
                  <li key={p.id} className="relative">
                    <button
                      type="button"
                      disabled={busy || loading}
                      onClick={() => void trySelect(p.id)}
                      className="flex h-full min-h-[8.25rem] w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-border bg-card p-3 pt-4 text-center transition hover:border-primary/50 hover:bg-primary/5 active:scale-[0.98] disabled:opacity-60"
                    >
                      <span className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-b from-violet-600/80 to-purple-900/80 text-3xl shadow-inner">
                        👧
                      </span>
                      <span className="w-full min-w-0">
                        <span className="block truncate font-display text-base font-semibold text-fg">
                          {p.displayName}
                        </span>
                        <span className="block truncate text-xs text-muted">
                          @{p.username}
                        </span>
                        <span className="mt-0.5 block text-[11px] font-medium text-primary">
                          Nv.{level} · {p.progress.xp} XP
                          {p.pin ? " · 🔒" : ""}
                        </span>
                      </span>
                    </button>
                    <button
                      type="button"
                      disabled={busy || loading}
                      onClick={(e) => {
                        e.stopPropagation();
                        setError(null);
                        setDeleteTarget(p.id);
                      }}
                      className="absolute right-1.5 top-1.5 z-10 grid h-10 w-10 place-items-center rounded-xl border border-danger/30 bg-card/95 text-danger shadow-sm transition hover:bg-danger/10 active:scale-95 disabled:opacity-50"
                      aria-label={`Borrar perfil de ${p.displayName}`}
                      title="Borrar perfil"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          <button
            type="button"
            onClick={() => {
              setMode("create");
              setError(null);
            }}
            className="flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-primary/50 bg-primary/10 text-base font-bold text-primary"
          >
            <UserPlus className="h-5 w-5" />
            Crear nuevo perfil
          </button>
        </div>
      )}

      {!pinFor && mode === "create" && (
        <form
          onSubmit={(e) => void onCreate(e)}
          className="space-y-4 rounded-2xl border border-border bg-card p-5"
        >
          <div className="flex items-center justify-between gap-2">
            <p className="font-display text-lg font-semibold text-fg">
              Nuevo perfil
            </p>
            {list.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setMode("pick");
                  setError(null);
                }}
                className="text-sm font-semibold text-primary underline-offset-2 hover:underline"
              >
                ← Ver perfiles
              </button>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-fg" htmlFor="username">
              Nombre de usuario *
            </label>
            <input
              id="username"
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value.replace(/[^a-zA-Z0-9]/g, "").slice(0, 16),
                )
              }
              autoComplete="username"
              className="min-h-12 w-full rounded-xl border border-border bg-surface px-4 text-base text-fg outline-none ring-primary focus:ring-2"
              placeholder="ej: lizmaga"
              required
              disabled={busy}
            />
            <p className="text-xs text-muted">
              Único · sin espacios · solo letras y números
            </p>
            {liveHint && (
              <p
                className={cn(
                  "text-sm font-medium",
                  liveOk ? "text-success" : "text-danger",
                )}
              >
                {liveHint}
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
              disabled={busy}
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
              onChange={(e) =>
                setPin(e.target.value.replace(/\D/g, "").slice(0, 4))
              }
              className="min-h-12 w-full rounded-xl border border-border bg-surface px-4 text-base tracking-widest text-fg outline-none ring-primary focus:ring-2"
              placeholder="Opcional · protege tu perfil"
              disabled={busy}
            />
          </div>

          <div className="space-y-1.5 rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 p-3">
            <label
              className="text-sm font-semibold text-fg"
              htmlFor="friendCode"
            >
              Código de amiga (opcional) – gana XP extra
            </label>
            <input
              id="friendCode"
              value={friendCode}
              onChange={(e) =>
                setFriendCode(
                  e.target.value
                    .toUpperCase()
                    .replace(/[^A-Z0-9-]/g, "")
                    .slice(0, 16),
                )
              }
              className="min-h-12 w-full rounded-xl border border-border bg-surface px-4 text-base tracking-wide text-fg outline-none ring-primary focus:ring-2"
              placeholder="ej: ARC-LIZ7K2A"
              disabled={busy}
            />
            <p className="text-xs text-muted">
              Si te invitaron, pega el código aquí. Tú ganas +20 XP y tu amiga
              +30 XP.
            </p>
          </div>

          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-surface/80 p-3">
            <input
              type="checkbox"
              checked={legalAccepted}
              onChange={(e) => setLegalAccepted(e.target.checked)}
              className="mt-1 h-5 w-5 shrink-0 rounded border-border text-primary accent-[var(--color-primary)]"
              disabled={busy}
              required
            />
            <span className="text-sm leading-snug text-fg">
              Declaro que soy el responsable legal (o actúo bajo su supervisión) y
              acepto las{" "}
              <Link
                to="/politicas"
                hash="reglas"
                className="font-semibold text-primary underline-offset-2 hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                Reglas de la Academia
              </Link>
              , la{" "}
              <Link
                to="/politicas"
                hash="privacidad"
                className="font-semibold text-primary underline-offset-2 hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                Política de Privacidad
              </Link>{" "}
              y el{" "}
              <Link
                to="/politicas"
                hash="exencion"
                className="font-semibold text-primary underline-offset-2 hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                Aviso de Exención de Responsabilidad
              </Link>
              .
            </span>
          </label>

          <button
            type="submit"
            disabled={busy || loading || !legalAccepted}
            className="flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary text-base font-bold text-primary-fg disabled:opacity-60"
          >
            <UserPlus className="h-5 w-5" />
            {busy ? "Guardando magia…" : "Crear perfil y entrar"}
          </button>
        </form>
      )}

      <p className="text-center text-xs text-muted">
        {cloudEnabled
          ? "Tus partidas se guardan en la nube mágica de la Academia."
          : "Sin email ni contraseña. Configura la nube para guardar entre aparatos."}
      </p>

      <LegalFooter className="pb-20 pt-2" />
    </div>
  );
}
