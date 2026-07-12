import { Check, ChevronLeft, CircleHelp } from "lucide-react";
import { useEffect, useRef } from "react";
import { StageHeader } from "@/components/stage-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScreenShell } from "@/components/screen-shell";
import { ANSWER_OPTIONS, QUESTIONS, RIASEC_DESCRIPTIONS, RIASEC_LABELS } from "@/lib/assessment";
import { cn } from "@/lib/utils";

export function TestScreen({ state, setState, navigate }) {
  const questionIndex = state.currentQuestion;
  const [axis, question] = QUESTIONS[questionIndex];
  const selected = state.answers[questionIndex];
  const answeredCount = state.answers.filter(Number.isInteger).length;
  const progress = (answeredCount / QUESTIONS.length) * 100;
  const nextTimer = useRef(null);

  useEffect(() => () => clearTimeout(nextTimer.current), []);

  const choose = (value) => {
    const answers = [...state.answers];
    answers[questionIndex] = value;
    setState((current) => ({ ...current, answers }));
    clearTimeout(nextTimer.current);
    nextTimer.current = setTimeout(() => {
      if (questionIndex < QUESTIONS.length - 1) setState((current) => ({ ...current, currentQuestion: questionIndex + 1 }));
      else navigate("context");
    }, 240);
  };

  const previous = () => {
    if (questionIndex === 0) return navigate("home");
    setState((current) => ({ ...current, currentQuestion: questionIndex - 1 }));
  };

  return (
    <ScreenShell className="mx-auto w-full max-w-[1120px] px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <StageHeader step="1" title="Interesses em situações concretas" description="Responda pelo interesse espontâneo, não pelo que parece mais útil, prestigioso ou esperado por outras pessoas." progress={progress * 0.72} />
      <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
        <Card className="overflow-hidden bg-card/80">
          <CardHeader className="border-b border-border/70 p-5 sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3"><div className="grid size-10 place-items-center rounded-2xl border border-border bg-secondary font-display text-lg text-primary">{axis}</div><div><div className="text-sm font-semibold text-foreground">{RIASEC_LABELS[axis]}</div><div className="text-xs text-muted-foreground">Item {questionIndex + 1} de {QUESTIONS.length}</div></div></div>
              <span className="text-xs tabular-nums text-muted-foreground">{answeredCount} respondidos</span>
            </div>
          </CardHeader>
          <CardContent className="p-5 sm:p-8 lg:p-10">
            <fieldset>
              <legend className="max-w-[24ch] font-display text-[clamp(2rem,5vw,4.1rem)] font-medium leading-[1.02] tracking-[-0.045em] text-foreground">{question}</legend>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">Quanto você gostaria de realizar essa atividade como parte da sua rotina?</p>
              <div className="mt-9 grid gap-3">
                {ANSWER_OPTIONS.map((option) => {
                  const active = selected === option.value;
                  return (
                    <button key={option.value} type="button" onClick={() => choose(option.value)} aria-pressed={active} className={cn("group grid min-h-[68px] w-full grid-cols-[42px_1fr_auto] items-center gap-3 rounded-2xl border px-4 text-left outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring", active ? "border-primary/60 bg-primary/10 shadow-[0_14px_35px_-28px_rgba(161,190,214,.9)]" : "border-border bg-secondary/35 hover:border-border-strong hover:bg-secondary/65") }>
                      <span className={cn("grid size-9 place-items-center rounded-xl border font-display text-base", active ? "border-primary/45 bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground group-hover:text-foreground")}>{option.value}</span>
                      <span><span className="block text-sm font-semibold text-foreground">{option.label}</span><span className="mt-0.5 block text-xs text-muted-foreground">{option.short}</span></span>
                      {active ? <Check className="size-5 text-primary" aria-hidden="true" /> : null}
                    </button>
                  );
                })}
              </div>
            </fieldset>
            <div className="mt-8 flex items-center justify-between gap-3 border-t border-border/70 pt-6"><Button variant="ghost" onClick={previous}><ChevronLeft className="size-4" aria-hidden="true" />Voltar</Button><span className="text-xs text-muted-foreground">A seleção avança automaticamente.</span></div>
          </CardContent>
        </Card>
        <aside className="grid content-start gap-4">
          <Card className="bg-surface/80"><CardHeader><div className="text-xs font-semibold uppercase tracking-[.12em] text-muted-foreground">Dimensão atual</div><div className="font-display text-2xl text-foreground">{RIASEC_LABELS[axis]}</div><p className="text-sm leading-6 text-muted-foreground">{RIASEC_DESCRIPTIONS[axis]}</p></CardHeader></Card>
          <Card className="bg-surface/60"><CardContent className="p-5"><div className="flex items-start gap-3"><CircleHelp className="mt-0.5 size-5 shrink-0 text-warm" aria-hidden="true" /><p className="text-xs leading-6 text-muted-foreground">Não avalie sua habilidade atual. O foco aqui é interesse, mesmo que você ainda nunca tenha tentado a atividade.</p></div></CardContent></Card>
        </aside>
      </div>
    </ScreenShell>
  );
}
