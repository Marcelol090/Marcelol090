import { BarChart3, BookOpen, Home } from "lucide-react";
import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/button";

export function AppHeader({ screen, navigate, completed }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/75 bg-background/88 backdrop-blur-xl">
      <div className="mx-auto flex min-h-18 w-full max-w-[1240px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <button type="button" onClick={() => navigate("home")} className="rounded-2xl text-left outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Voltar ao início">
          <Brand />
        </button>
        <nav className="flex items-center gap-2" aria-label="Navegação principal">
          <Button variant={screen === "method" ? "secondary" : "ghost"} size="sm" onClick={() => navigate("method")} className="hidden sm:inline-flex">
            <BookOpen className="size-4" aria-hidden="true" />Metodologia
          </Button>
          {completed ? (
            <Button variant={screen === "result" ? "secondary" : "outline"} size="sm" onClick={() => navigate("result")}>
              <BarChart3 className="size-4" aria-hidden="true" /><span className="hidden sm:inline">Meu resultado</span>
            </Button>
          ) : null}
          <Button variant="ghost" size="icon" onClick={() => navigate("home")} aria-label="Início"><Home className="size-4" aria-hidden="true" /></Button>
        </nav>
      </div>
    </header>
  );
}
