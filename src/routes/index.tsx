import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/game/Shell";
import { HomeView } from "@/components/game/HomeView";
import { DailyMission } from "@/components/game/DailyMission";
import { MathMap } from "@/components/game/MathMap";
import { MathPlay } from "@/components/game/MathPlay";
import { LanguageMap } from "@/components/game/LanguageMap";
import { LanguagePlay } from "@/components/game/LanguagePlay";
import { EnglishMap } from "@/components/game/EnglishMap";
import { EnglishPlay } from "@/components/game/EnglishPlay";
import { ReadingJournal } from "@/components/game/ReadingJournal";
import { ProgressView } from "@/components/game/ProgressView";
import { AvatarCustomizer } from "@/components/game/AvatarView";
import { BossBattle } from "@/components/game/BossBattle";
import { DiagnosticView } from "@/components/game/DiagnosticView";
import { RankingView } from "@/components/game/RankingView";
import { ProfileGate } from "@/components/game/ProfileGate";
import { ProfileSync } from "@/components/game/ProfileSync";
import { CookieBanner } from "@/components/legal/CookieBanner";
import { useGameStore } from "@/lib/game-store";
import { useProfilesStore } from "@/lib/profiles";
import { useEffect } from "react";

export const Route = createFileRoute("/")({ component: App });

function App() {
  const view = useGameStore((s) => s.view);
  const activeProfileId = useProfilesStore((s) => s.activeProfileId);
  const bootstrapped = useProfilesStore((s) => s.bootstrapped);
  const bootstrapFromLegacy = useProfilesStore((s) => s.bootstrapFromLegacy);

  useEffect(() => {
    bootstrapFromLegacy();
  }, [bootstrapFromLegacy]);

  if (!bootstrapped) {
    return (
      <div className="grid min-h-[50vh] place-items-center bg-academy text-muted">
        Abriendo la Academia…
        <CookieBanner />
      </div>
    );
  }

  if (!activeProfileId) {
    return (
      <>
        <ProfileGate />
        <CookieBanner />
      </>
    );
  }

  return (
    <>
      <ProfileSync />
      <Shell>
        {view === "home" && <HomeView />}
        {view === "daily" && <DailyMission />}
        {view === "diagnostic" && <DiagnosticView />}
        {view === "math" && <MathMap />}
        {view === "math-play" && <MathPlay />}
        {view === "math-boss" && <BossBattle zone="math" />}
        {view === "language" && <LanguageMap />}
        {view === "language-play" && <LanguagePlay />}
        {view === "language-boss" && <BossBattle zone="language" />}
        {view === "english" && <EnglishMap />}
        {view === "english-play" && <EnglishPlay />}
        {view === "english-boss" && <BossBattle zone="english" />}
        {view === "reading" && <ReadingJournal />}
        {view === "progress" && <ProgressView />}
        {view === "avatar" && <AvatarCustomizer />}
        {view === "ranking" && <RankingView />}
        {view === "profiles" && <ProfileGate />}
      </Shell>
      <CookieBanner />
    </>
  );
}
