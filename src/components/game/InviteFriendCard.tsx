import { useMemo, useState } from "react";
import { Check, Copy, Gift, Users } from "lucide-react";
import { useProfilesStore } from "@/lib/profiles";
import { FRIEND_XP, REFERRER_XP, generateInviteCode } from "@/lib/profiles/referral";
import { cn } from "@/lib/utils";

/** Home card: unique invite code + successful referral count */
export function InviteFriendCard() {
  const activeId = useProfilesStore((s) => s.activeProfileId);
  const profile = useProfilesStore((s) =>
    activeId ? s.profiles[activeId] : null,
  );
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const code =
    profile?.inviteCode ||
    (profile ? generateInviteCode(profile.username, profile.id) : "");
  const count = profile?.referralCount ?? 0;

  const inviteLink = useMemo(() => {
    if (!code || typeof window === "undefined") return "";
    try {
      const u = new URL(window.location.origin + window.location.pathname);
      u.searchParams.set("ref", code);
      return u.toString();
    } catch {
      return `?ref=${code}`;
    }
  }, [code]);

  const shareText = useMemo(() => {
    if (!code) return "";
    const linkPart = inviteLink ? `\n${inviteLink}` : "";
    return `¡Ven a la Academia Arcana! Usa mi código de amiga: ${code} al crear tu perfil.${linkPart}\n¡Las dos ganamos XP mágico! ✨`;
  }, [code, inviteLink]);

  if (!profile || !activeId) return null;

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copia tu código:", code);
    }
  }

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copia el mensaje:", shareText);
    }
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex w-full min-h-12 items-center justify-between gap-2 rounded-xl border-2 border-dashed border-primary/45 bg-gradient-to-r from-primary/15 to-accent/10 px-3 py-2.5 text-left transition hover:border-primary/70",
        )}
      >
        <span className="inline-flex items-center gap-2 text-sm font-bold text-fg">
          <Users className="h-4 w-4 text-primary" />
          Convidar amigo
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[11px] font-semibold text-primary">
          <Gift className="h-3 w-3" />
          +{REFERRER_XP} XP
        </span>
      </button>

      {open && (
        <div className="animate-fade-in space-y-3 rounded-2xl border border-primary/35 bg-card p-4 shadow-sm">
          <p className="text-sm text-muted">
            Comparte tu código mágico. Cuando una amiga cree su perfil con él,{" "}
            <strong className="text-fg">tú ganas +{REFERRER_XP} XP</strong> y{" "}
            <strong className="text-fg">ella +{FRIEND_XP} XP</strong>.
          </p>

          <div className="rounded-xl border-2 border-primary/40 bg-primary/10 px-3 py-3 text-center">
            <p className="text-[11px] font-bold uppercase tracking-wide text-muted">
              Tu código de invitación
            </p>
            <p className="mt-1 font-display text-2xl font-bold tracking-wider text-primary tabular-nums">
              {code}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => void copyCode()}
              className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-border bg-surface text-sm font-semibold text-fg"
            >
              {copied ? (
                <Check className="h-4 w-4 text-success" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {copied ? "¡Copiado!" : "Copiar código"}
            </button>
            <button
              type="button"
              onClick={() => void copyMessage()}
              className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-primary text-sm font-bold text-primary-fg"
            >
              <Gift className="h-4 w-4" />
              Copiar mensaje
            </button>
          </div>

          <p className="text-center text-xs text-muted">
            Amigas invitadas con éxito:{" "}
            <span className="font-bold text-fg">{count}</span>
            {count === 0
              ? " · ¡Sé la primera en invitar!"
              : count === 1
                ? " · ¡Qué bien!"
                : " · ¡Eres una maga social!"}
          </p>
        </div>
      )}
    </div>
  );
}
