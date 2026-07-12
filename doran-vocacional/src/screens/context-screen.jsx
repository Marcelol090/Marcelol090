import { ArrowRight, ChevronLeft } from "lucide-react";
import { useEffect } from "react";
import { StageHeader } from "@/components/stage-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, NativeSelect } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { ScreenShell } from "@/components/screen-shell";
import { QUESTIONS, WORK_VALUES } from "@/lib/assessment";
import { cn } from "@/lib/utils";

function ValueScale({ item, value, onChange }) {
  return (
    <fieldset className="rounded-2xl border border-border bg-secondary/35 p-4">
      <legend className="sr-only">Importância de {item.label}</legend>
      <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
        <div><div className="text-sm font-semibold text-foreground">{item.label}</div><div className="mt-1 text-xs leading-5 text-muted-foreground">{item.description}</div></div>
        <div className="flex gap-1.5" aria-label={`Importância de ${item.label}`}>
          {[1,2,3,4,5].map((score) => <button key={score} type="button" onClick={() => onChange(score)} aria-pressed={value === score} className={cn("grid size-10 place-items-center rounded-xl border text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring", value === score ? "border-primary/60 bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground hover:border-border-strong hover:text-foreground")}>{score}</button>)}
        </div>
      </div>
    </fieldset>
  );
}

export function ContextScreen({ state, setState, navigate }) {
  const complete = state.answers.filter(Number.isInteger).length === QUESTIONS.length;
  useEffect(() => { if (!complete) navigate("test"); }, [complete, navigate]);
  if (!complete) return null;

  return (
    <ScreenShell className="mx-auto w-full max-w-[1120px] px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <StageHeader step="2" title="Contexto para uma decisão real" description="Interesses são importantes, mas não vivem no vácuo. Registre preferências, barreiras e valores sem tentar parecer ideal." progress={84} />
      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="bg-card/80">
          <CardHeader><CardTitle>Sua situação agora</CardTitle><CardDescription>Esses campos ajudam a IA a separar afinidade de viabilidade imediata.</CardDescription></CardHeader>
          <CardContent className="grid gap-5">
            <Field label="Motivo da exploração" htmlFor="reason"><NativeSelect id="reason" value={state.reason} onChange={(event) => setState((current) => ({ ...current, reason: event.target.value }))}><option>Primeira formação</option><option>Transição de carreira</option><option>Recolocação</option><option>Especialização</option></NativeSelect></Field>
            <Field label="Duração preferida" htmlFor="duration"><NativeSelect id="duration" value={state.duration} onChange={(event) => setState((current) => ({ ...current, duration: event.target.value }))}><option>Sem preferência</option><option>Curso curto</option><option>Curso técnico</option></NativeSelect></Field>
            <Field label="Atividades que costumam dar energia" htmlFor="energy" hint="Exemplos concretos são mais úteis que adjetivos genéricos."><Textarea id="energy" maxLength={700} value={state.energy} placeholder="Ex.: organizar uma equipe, resolver problemas práticos, explicar algo para alguém..." onChange={(event) => setState((current) => ({ ...current, energy: event.target.value }))} /></Field>
            <Field label="Barreiras e limites atuais" htmlFor="limits" hint="Inclua tempo, deslocamento, orçamento, rotina, acessibilidade ou responsabilidades."><Textarea id="limits" maxLength={700} value={state.limits} placeholder="Ex.: preciso estudar à noite, não posso me mudar agora, prefiro trabalho híbrido..." onChange={(event) => setState((current) => ({ ...current, limits: event.target.value }))} /></Field>
          </CardContent>
        </Card>
        <Card className="bg-card/80">
          <CardHeader><CardTitle>Valores de trabalho</CardTitle><CardDescription>Marque a importância de cada dimensão de 1 a 5. Isso não altera o RIASEC.</CardDescription></CardHeader>
          <CardContent className="grid gap-3">{WORK_VALUES.map((item) => <ValueScale key={item.key} item={item} value={state.values[item.key]} onChange={(value) => setState((current) => ({ ...current, values: { ...current.values, [item.key]: value } }))} />)}</CardContent>
        </Card>
      </div>
      <div className="mt-6 flex flex-col-reverse justify-between gap-3 sm:flex-row"><Button variant="ghost" onClick={() => navigate("test")}><ChevronLeft className="size-4" aria-hidden="true" />Revisar respostas</Button><Button size="lg" onClick={() => navigate("result")}>Gerar resultado<ArrowRight className="size-4" aria-hidden="true" /></Button></div>
    </ScreenShell>
  );
}
