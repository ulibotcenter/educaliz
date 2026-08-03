import { createFileRoute } from "@tanstack/react-router";
import { PoliciesPage } from "@/components/legal/PoliciesPage";
import { CookieBanner } from "@/components/legal/CookieBanner";
import { ThemeApplier } from "@/components/game/ThemeApplier";

export const Route = createFileRoute("/politicas")({
  component: PoliticasRoute,
  head: () => ({
    meta: [
      {
        title: "Políticas · Academia Arcana",
      },
      {
        name: "description",
        content:
          "Política de Privacidad, Reglas de la Academia y Exención de Responsabilidad de Academia Arcana.",
      },
    ],
  }),
});

function PoliticasRoute() {
  return (
    <div className="bg-academy text-fg">
      <ThemeApplier />
      <PoliciesPage />
      <CookieBanner />
    </div>
  );
}
