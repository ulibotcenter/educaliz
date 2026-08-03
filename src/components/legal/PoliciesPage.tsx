import { Link } from "@tanstack/react-router";
import { ArrowLeft, Scale, Shield, ScrollText, AlertTriangle } from "lucide-react";

export function PoliciesPage() {
  return (
    <div className="mx-auto min-h-[calc(100dvh-var(--grok-banner-h,0px))] max-w-3xl px-4 py-8 sm:py-10">
      <Link
        to="/"
        className="mb-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a la Academia
      </Link>

      <header className="mb-8 space-y-2">
        <p className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">
          <Scale className="h-3.5 w-3.5" />
          Documentos legales
        </p>
        <h1 className="font-display text-3xl font-semibold text-fg">
          Políticas de Academia Arcana
        </h1>
        <p className="text-base text-muted">
          Información clara para familias. Última actualización: agosto de 2026.
        </p>
      </header>

      <nav className="mb-8 flex flex-wrap gap-2">
        {[
          { href: "#privacidad", label: "Privacidad" },
          { href: "#reglas", label: "Reglas / Términos" },
          { href: "#exencion", label: "Exención de responsabilidad" },
        ].map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-semibold text-fg hover:border-primary/40"
          >
            {l.label}
          </a>
        ))}
      </nav>

      <div className="space-y-10 text-[15px] leading-relaxed text-fg">
        {/* A) Privacidad */}
        <section
          id="privacidad"
          className="scroll-mt-24 space-y-3 rounded-2xl border border-border bg-card p-5 sm:p-6"
        >
          <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-fg">
            <Shield className="h-5 w-5 text-primary" />
            A) Política de Privacidad
          </h2>
          <p className="text-muted">
            Academia Arcana respeta la privacidad de las familias y de los
            menores. Esta política describe de forma sencilla qué datos se usan
            y para qué.
          </p>
          <h3 className="pt-1 font-semibold text-fg">1. Qué datos se recogen</h3>
          <p>
            Solo se recogen los datos necesarios para el funcionamiento del
            juego:
          </p>
          <ul className="list-disc space-y-1 pl-5 text-muted">
            <li>Nombre de usuario (identificador único en la Academia)</li>
            <li>Nombre visible / de visualización</li>
            <li>Avatar y personalización estética</li>
            <li>Progreso del juego (XP, niveles, misiones, insignias, etc.)</li>
            <li>Código de invitación de amistad (si se usa)</li>
            <li>PIN opcional de 4 dígitos para proteger el perfil</li>
            <li>
              Registro local de consentimiento de almacenamiento y de aceptación
              legal al crear el perfil
            </li>
          </ul>
          <h3 className="pt-1 font-semibold text-fg">2. Qué NO se recogen</h3>
          <ul className="list-disc space-y-1 pl-5 text-muted">
            <li>No se recogen emails</li>
            <li>No se recogen teléfonos</li>
            <li>No se recogen ubicaciones GPS</li>
            <li>
              No se recogen datos sensibles (salud, religión, orientación, etc.)
            </li>
            <li>No se solicita documentación oficial del menor</li>
          </ul>
          <h3 className="pt-1 font-semibold text-fg">3. Dónde se guardan</h3>
          <p className="text-muted">
            Los datos se almacenan <strong className="text-fg">localmente</strong>{" "}
            en el dispositivo (almacenamiento del navegador) y, cuando está
            configurado, en <strong className="text-fg">Supabase</strong> en la
            nube, únicamente para el funcionamiento del juego (perfiles,
            progreso y ranking).
          </p>
          <h3 className="pt-1 font-semibold text-fg">
            4. Responsable del tratamiento
          </h3>
          <p className="text-muted">
            El responsable del tratamiento de los datos del perfil es la{" "}
            <strong className="text-fg">familia / usuario</strong> que crea y
            administra el perfil. La aplicación es una herramienta de uso
            familiar con supervisión de un adulto.
          </p>
          <h3 className="pt-1 font-semibold text-fg">
            5. Derechos (acceso, rectificación y supresión)
          </h3>
          <p className="text-muted">
            Puedes acceder a tus datos desde el propio perfil, rectificar el
            nombre o la personalización, y solicitar o realizar la{" "}
            <strong className="text-fg">supresión del perfil</strong> en
            cualquier momento (borrado del perfil y del progreso asociado en el
            dispositivo y, cuando aplique, en la nube).
          </p>
          <h3 className="pt-1 font-semibold text-fg">6. Cesión a terceros</h3>
          <p className="text-muted">
            <strong className="text-fg">
              No se ceden datos a terceros con fines comerciales
            </strong>
            . No se venden datos. Los servicios de infraestructura (como el
            alojamiento o la base de datos) solo se usan para operar la
            aplicación.
          </p>
          <h3 className="pt-1 font-semibold text-fg">7. Menores</h3>
          <p className="text-muted">
            La aplicación está pensada para uso infantil con supervisión de un
            adulto o responsable legal. Al crear un perfil se declara esa
            supervisión y la aceptación de estas políticas.
          </p>
        </section>

        {/* B) Reglas */}
        <section
          id="reglas"
          className="scroll-mt-24 space-y-3 rounded-2xl border border-border bg-card p-5 sm:p-6"
        >
          <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-fg">
            <ScrollText className="h-5 w-5 text-primary" />
            B) Reglas de la Academia / Términos de Uso
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-muted">
            <li>
              Academia Arcana es una{" "}
              <strong className="text-fg">
                herramienta de refuerzo educativo y entretenimiento
              </strong>
              .
            </li>
            <li>
              Está pensada para{" "}
              <strong className="text-fg">
                uso familiar y con supervisión de un adulto
              </strong>
              .
            </li>
            <li>
              <strong className="text-fg">No sustituye</strong> la educación
              formal ni está vinculada a ningún colegio, profesor, academia
              privada ni administración pública.
            </li>
            <li>
              Queda{" "}
              <strong className="text-fg">
                prohibido el uso indebido, ofensivo o que perjudique
              </strong>{" "}
              a otros usuarios (nombres ofensivos, acoso, intento de acceso a
              perfiles ajenos, etc.).
            </li>
            <li>
              El ranking y el torneo son actividades lúdicas de motivación, no
              evaluaciones oficiales.
            </li>
            <li>
              El creador puede actualizar estas reglas; el uso continuado
              implica la aceptación de la versión vigente publicada en esta
              página.
            </li>
          </ul>
        </section>

        {/* C) Exención — strong */}
        <section
          id="exencion"
          className="scroll-mt-24 space-y-4 rounded-2xl border-2 border-danger/40 bg-danger/5 p-5 sm:p-6"
        >
          <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-fg">
            <AlertTriangle className="h-5 w-5 text-danger" />
            C) Aviso de Exención de Responsabilidad
          </h2>
          <p className="font-medium text-fg">
            Academia Arcana es una herramienta educativa independiente, creada
            únicamente con fines de aprendizaje, refuerzo escolar y
            entretenimiento durante las vacaciones.
          </p>
          <p className="text-muted">
            <strong className="text-fg">
              No está afiliada, respaldada ni relacionada con ningún colegio,
              profesor, institución educativa ni administración pública.
            </strong>
          </p>
          <p className="text-muted">
            El creador de la aplicación{" "}
            <strong className="text-fg">
              no asume ninguna responsabilidad civil, penal, administrativa ni
              de cualquier otra índole
            </strong>{" "}
            por:
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-muted">
            <li>Los resultados académicos del menor</li>
            <li>El uso que se haga de la aplicación</li>
            <li>
              Cualquier daño directo, indirecto, incidental o consecuente
              derivado del uso o la imposibilidad de uso del servicio
            </li>
            <li>La pérdida de datos o progreso</li>
            <li>Cualquier reclamación realizada por terceros</li>
          </ul>
          <p className="rounded-xl border border-danger/30 bg-card/80 p-4 font-semibold text-fg">
            El uso de Academia Arcana se realiza bajo la exclusiva
            responsabilidad de la familia y del usuario. Al crear un perfil y
            utilizar la aplicación, el responsable legal acepta plenamente esta
            exención de responsabilidad.
          </p>
        </section>

        <p className="text-center text-xs text-muted">
          Academia Arcana · Herramienta educativa independiente · Uso bajo
          responsabilidad familiar
        </p>
      </div>
    </div>
  );
}
