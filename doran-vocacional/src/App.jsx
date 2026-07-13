import { AnimatePresence } from "motion/react";
import { FileText, LockKeyhole } from "lucide-react";
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/app-header";
import { Brand } from "@/components/brand";
import { ScrollProgress } from "@/components/scroll-progress";
import { useApiHealth } from "@/hooks/use-api-health";
import { useScreenNavigation } from "@/hooks/use-screen-navigation";
import { QUESTIONS } from "@/lib/assessment";
import { INITIAL_STATE, loadState, STORAGE_KEY } from "@/lib/state";
import { ContextScreen } from "@/screens/context-screen";
import { HomeScreen } from "@/screens/home-screen";
import { MethodScreen } from "@/screens/method-screen";
import { ResultScreen } from "@/screens/result-screen";
import { TestScreen } from "@/screens/test-screen";

export default function App() {
  const [screen, navigate] = useScreenNavigation();
  const [state, setState] = useState(loadState);
  const apiHealth = useApiHealth();
  const answeredCount = state.answers.filter(Number.isInteger).length;
  const completed = answeredCount === QUESTIONS.length;

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    requestAnimationFrame(() => {
      document.getElementById("main-content")?.focus({ preventScroll: true });
    });
  }, [screen]);

  const reset = () => {
    if (!window.confirm("Apagar as respostas locais e iniciar novamente?")) return;
    setState(INITIAL_STATE);
    localStorage.removeItem(STORAGE_KEY);
    navigate("home");
  };

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <ScrollProgress />
      <AppHeader screen={screen} navigate={navigate} completed={completed} apiHealth={apiHealth} />
      <AnimatePresence mode="wait" initial={false}>
        <div key={screen}>
          {screen === "home" ? <HomeScreen navigate={navigate} answeredCount={answeredCount} apiHealth={apiHealth} /> : null}
          {screen === "test" ? <TestScreen state={state} setState={setState} navigate={navigate} /> : null}
          {screen === "context" ? <ContextScreen state={state} setState={setState} navigate={navigate} /> : null}
          {screen === "result" ? <ResultScreen state={state} navigate={navigate} reset={reset} /> : null}
          {screen === "method" ? <MethodScreen navigate={navigate} /> : null}
        </div>
      </AnimatePresence>
      <footer className="border-t border-border/60 bg-surface/40">
        <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-4 px-4 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <Brand compact />
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="inline-flex items-center gap-1.5"><LockKeyhole className="size-3.5" aria-hidden="true" />respostas salvas localmente</span>
            <span className="inline-flex items-center gap-1.5"><FileText className="size-3.5" aria-hidden="true" />não é avaliação psicológica</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
