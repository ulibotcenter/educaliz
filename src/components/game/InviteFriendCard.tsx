import { useMemo, useState } from "react";
import { Check, Copy, Gift, Share2, Users } from "lucide-react";
import { useProfilesStore } from "@/lib/profiles";
import {
  FRIEND_XP,
  REFERRER_XP,
  generateInviteCode,
  isValidInviteCodeFormat,
  normalizeInviteCode,
} from "@/lib/profiles/referral";
import { cn } from "@/lib/utils";

/** Official share base so invites always open the production app */
const SHARE_ORIGIN = "https://educaliz.vercel.app";

/** Home card: unique invite code + successful referral count */
export function InviteFriendCard() {
  const activeId = useProfilesStore((s) => s.activeProfileId);
  const profile = useProfilesStore((s) =>
    activeId ? s.profiles[activeId] : null,
  );
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<"code" | "link" | "msg" | null>(null);
  const [shareNote, setShareNote] = useState<string | null>(null);

  const code =
    profile?.inviteCode ||
    (profile ? generateInviteCode(profile.username, profile.id) : "");

  const count = profile?.referralCount ?? 0;

  const inviteLink = useMemo(() => {
    const c = normalizeInviteCode(code);
    if (!c || !isValidInviteCodeFormat(c)) return "";
    return `${SHARE_ORIGIN}/?ref=${encodeURIComponent(c)}`;
  }, [code]);

  const shareText = useMemo(() => {
    if (!code) return "";
    return `¡Ven a la Academia Arcana! Usa mi enlace o el código ${code} al crear tu perfil.\n${inviteLink}\n¡Los dos ganamos XP mágico! ✨`;
  }, [code, inviteLink]);

  if (!profile || !activeId) return null;

  function flash(kind: "code" | "link" | "msg") {
    setCopied(kind);
    window.setTimeout(() => setCopied(null), 2200);
  }

  async function copyText(text: string, kind: "code" | "link" | "msg") {
    try {
      await navigator.clipboard.writeText(text);
      flash(kind);
    } catch {
      window.prompt("Copia esto:", text);
      flash(kind);
    }
  }

  async function shareLink() {
    if (!inviteLink) return;
    setShareNote(null);

    // Native share (mobile WhatsApp, etc.)
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: "Academia Arcana",
          text: `¡Únete a la Academia Arcana con mi código ${code}!`,
          url: inviteLink,
        });
        setShareNote("¡Enlace compartido!");
        window.setTimeout(() => setShareNote(null), 2500);
        return;
      } catch (err) {
        // User cancelled share sheet — don't treat as error
        if (err && typeof err === "object" && "name" in err && (err as { name: string }).name === "AbortError") {
          return;
        }
      }
    }

    // Fallback: copy link
    await copyText(inviteLink, "link");
    setShareNote("Enlace copiado. ¡Pégalo en WhatsApp!");
    window.setTimeout(() => setShareNote(null), 2800);
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
          Invitar amigo
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[11px] font-semibold text-primary">
          <Gift className="h-3 w-3" />
          +{REFERRER_XP} XP
        </span>
      </button>

      {open && (
        <div className="animate-fade-in space-y-3 rounded-2xl border border-primary/35 bg-card p-4 shadow-sm">
          <p className="text-sm text-muted">
            Comparte tu enlace mágico. Cuando un amigo cree su perfil con él,{" "}
            <strong className="text-fg">tú ganas +{REFERRER_XP} XP</strong> y{" "}
            <strong className="text-fg">él +{FRIEND_XP} XP</strong>.
          </p>

          <div className="rounded-xl border-2 border-primary/40 bg-primary/10 px-3 py-3 text-center">
            <p className="text-[11px] font-bold uppercase tracking-wide text-muted">
              Tu código de invitación
            </p>
            <p className="mt-1 font-display text-2xl font-bold tracking-wider text-primary tabular-nums">
              {code}
            </p>
          </div>

          {/* Primary: share / copy link */}
          <button
            type="button"
            onClick={() => void shareLink()}
            className="flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-base font-bold text-primary-fg shadow-md active:scale-[0.99]"
          >
            {copied === "link" ? (
              <Check className="h-5 w-5" />
            ) : (
              <Share2 className="h-5 w-5" />
            )}
            {copied === "link" ? "¡Enlace copiado!" : "Compartir enlace"}
          </button>

          <p className="break-all rounded-lg border border-border bg-surface/80 px-2.5 py-2 text-center text-[11px] font-medium text-muted">
            {inviteLink}
          </p>

          {shareNote && (
            <p className="text-center text-xs font-semibold text-success" role="status">
              {shareNote}
            </p>
          )}

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => void copyText(code, "code")}
              className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-border bg-surface text-sm font-semibold text-fg"
            >
              {copied === "code" ? (
                <Check className="h-4 w-4 text-success" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {copied === "code" ? "¡Copiado!" : "Copiar código"}
            </button>
            <button
              type="button"
              onClick={() => void copyText(shareText, "msg")}
              className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-primary/40 bg-primary/10 text-sm font-bold text-fg"
            >
              {copied === "msg" ? (
                <Check className="h-4 w-4 text-success" />
              ) : (
                <Gift className="h-4 w-4 text-primary" />
              )}
              {copied === "msg" ? "¡Listo!" : "Copiar mensaje"}
            </button>
          </div>

          <p className="text-center text-xs text-muted">
            Amigos invitados con éxito:{" "}
            <span className="font-bold text-fg">{count}</span>
            {count === 0
              ? " · ¡Sé el primero en invitar!"
              : count === 1
                ? " · ¡Qué bien!"
                : " · ¡Eres un mago social!"}
          </p>
        </div>
      )}
    </div>
  );
}
