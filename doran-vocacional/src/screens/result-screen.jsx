import { BrainCircuit, Check, CircleHelp, Download, LockKeyhole, Printer, RefreshCw, Route, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { RiasecChart } from "@/components/riasec-chart";
import { ScreenShell } from "@/components/screen-shell";
import { StageHeader } from "@/components/stage-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { requestAIReport } from "@/lib/api-client";
import { buildDossier, calculateRiasec, profileCode, rankCourses, RIASEC_LABELS } from "@/lib/assessment";

function ScoreRow({ axis, score }) {
  return <div className="grid gap-2"><div className="flex items-center justify-between gap-4 text-sm"><div className="flex items-center gap-2"><span className="grid size-7 place-items-center rounded-lg border border-border bg-secondary font-display text-xs text-primary">{axis}</span><span className="font-semibold">{RIASEC_LABELS[axis]}</span></div><span className="tabular-nums text-muted-foreground">{score.toFixed(1)} / 5</span></div><Progress value={(score / 5) * 100} className="h-1.5" /></div>;
}

function CourseCard({ item, index }) {
  return <div className="grid gap-4 rounded-2xl border border-border bg-secondary/28 p-4 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-border-strong sm:grid-cols-[auto_1fr_auto] sm:items-center"><div className="grid size-10 place-items-center rounded-xl border border-border bg-background font-display text-lg text-muted-foreground">{String(index + 1).padStart(2, "0")}</div><div><div className="flex flex-wrap items-center gap-2"><h3 className="font-semibold">{item.course}</h3><Badge variant="secondary" className="normal-case tracking-normal">{item.code}</Badge></div><p className="mt-1 text-xs text-muted-foreground">{item.axis}</p></div><div className="sm:text-right"><div className="font-display text-2xl tabular-nums">{item.probability}%</div><div className="text-[11px] text-muted-foreground">aderência relativa</div></div></div>;
}

function AIResult({ data }) {
  return <div className="grid gap-5">
    <div className="rounded-2xl border border-success/25 bg-success/8 p-5"><div className="flex flex-wrap items-center gap-2"><Badge variant="success">{data.modelUsed}</Badge><span className="text-xs text-muted-foreground">confiança {data.overallConfidence}</span></div><p className="mt-4 text-sm leading-7">{data.profileSummary}</p>{data.confidenceRationale ? <p className="mt-2 text-xs leading-6 text-muted-foreground">{data.confidenceRationale}</p> : null}</div>
    {data.recommendations.map((recommendation, index) => <article key={recommendation.course} className="rounded-2xl border border-border bg-card p-5 shadow-[0_24px_70px_-55px_rgba(0,0,0,.95)]"><div className="flex flex-wrap items-start justify-between gap-3"><div><div className="text-[11px] font-semibold uppercase tracking-[.12em] text-muted-foreground">hipótese {index + 1}</div><h4 className="mt-1 font-display text-2xl">{recommendation.course}</h4></div><div className="text-right"><div className="font-display text-3xl text-primary tabular-nums">{recommendation.probability}%</div><div className="text-[11px] text-muted-foreground">intervalo {recommendation.interval[0]}–{recommendation.interval[1]}%</div></div></div>{recommendation.interestFit || recommendation.currentViability ? <div className="mt-4 flex flex-wrap gap-2"><Badge variant="secondary">interesse {recommendation.interestFit || "indeterminado"}</Badge><Badge variant="secondary">viabilidade {recommendation.currentViability || "indeterminada"}</Badge></div> : null}<p className="mt-4 text-sm leading-7 text-muted-foreground">{recommendation.rationale}</p><div className="mt-5 grid gap-4 md:grid-cols-2"><div><h5 className="text-xs font-semibold uppercase tracking-[.1em]">Evidências</h5><ul className="mt-2 grid gap-2 text-xs leading-5 text-muted-foreground">{recommendation.evidence.map((item) => <li key={item} className="flex gap-2"><Check className="mt-0.5 size-3.5 shrink-0 text-success" aria-hidden="true" />{item}</li>)}</ul></div><div><h5 className="text-xs font-semibold uppercase tracking-[.1em]">Contrapontos</h5><ul className="mt-2 grid gap-2 text-xs leading-5 text-muted-foreground">{(recommendation.counterevidence?.length ? recommendation.counterevidence : ["Não há evidência suficiente para um contraponto específico."]).map((item) => <li key={item} className="flex gap-2"><CircleHelp className="mt-0.5 size-3.5 shrink-0 text-warm" aria-hidden="true" />{item}</li>)}</ul></div></div><div className="mt-5 rounded-xl border border-primary/20 bg-primary/6 p-4"><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.1em] text-primary"><Route className="size-4" aria-hidden="true" />Microexperimento</div><p className="mt-2 text-sm leading-6">{recommendation.experiment}</p>{recommendation.observationCriteria?.length ? <ul className="mt-3 grid gap-1 text-xs leading-5 text-muted-foreground">{recommendation.observationCriteria.map((item) => <li key={item}>• {item}</li>)}</ul> : null}</div></article>)}
    {data.missingInformation?.length ? <div className="rounded-2xl border border-border bg-secondary/35 p-5"><h4 className="text-sm font-semibold">Informações que melhorariam a análise</h4><ul className="mt-3 grid gap-2 text-sm text-muted-foreground">{data.missingInformation.map((item) => <li key={item} className="flex gap-2"><CircleHelp className="mt-0.5 size-4 shrink-0" aria-hidden="true" />{item}</li>)}</ul>{data.nextBestQuestion ? <p className="mt-4 border-t border-border/70 pt-4 text-sm"><strong>Próxima pergunta útil:</strong> {data.nextBestQuestion}</p> : null}</div> : null}
    <div className="rounded-2xl border border-warm/25 bg-warm/8 p-4 text-xs leading-6 text-warm">{data.ethicalNote}</div>
  </div>;
}

export function ResultScreen({ state, navigate, reset }) {
  const complete = state.answers.every(Number.isInteger);
  const scores = useMemo(() => calculateRiasec(state.answers), [state.answers]);
  const code = useMemo(() => profileCode(scores), [scores]);
  const courses = useMemo(() => rankCourses(scores, 10), [scores]);
  const dossier = useMemo(() => complete ? buildDossier(state) : null, [complete, state]);
  const [consent, setConsent] = useState(false);
  const [aiStatus, setAiStatus] = useState("idle");
  const [aiResult, setAiResult] = useState(null);
  const [aiError, setAiError] = useState(null);

  useEffect(() => { if (!complete) navigate("test"); }, [complete, navigate]);
  if (!complete || !dossier) return null;
  const topAxes = [...code].map((axis) => RIASEC_LABELS[axis]).join(" · ");

  async function askAI() {
    if (!consent || aiStatus === "loading") return;
    setAiStatus("loading"); setAiResult(null); setAiError(null);
    try { setAiResult(await requestAIReport(dossier)); setAiStatus("success"); }
    catch (error) { setAiError({ message: error.message, details: error.details }); setAiStatus("error"); }
  }

  function download() {
    const url = URL.createObjectURL(new Blob([JSON.stringify(dossier, null, 2)], { type: "application/json" }));
    const link = document.createElement("a"); link.href = url; link.download = "doran-op-dossie.json"; link.click(); URL.revokeObjectURL(url);
  }

  return <ScreenShell className="mx-auto w-full max-w-[1200px] px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
    <StageHeader step="3" title="Seu mapa de exploração" description="Leia o resultado como hipóteses comparáveis. A etapa decisiva começa quando uma delas é testada no mundo real." progress={100} />
    <div className="grid gap-5 lg:grid-cols-[370px_1fr]">
      <div className="grid content-start gap-5 lg:sticky lg:top-24 lg:self-start"><Card className="overflow-hidden bg-card/80"><CardHeader className="border-b border-border/70"><Badge>Perfil predominante</Badge><div className="font-display text-7xl tracking-[-.08em]">{code}</div><CardDescription>{topAxes}</CardDescription></CardHeader><CardContent className="p-5"><RiasecChart scores={scores} /><div className="mt-2 grid gap-4 border-t border-border/70 pt-5">{[..."RIASEC"].map((axis, index) => <ScoreRow key={axis} axis={axis} score={scores[index]} />)}</div></CardContent></Card><Card className="bg-surface/70"><CardContent className="grid gap-3 p-5"><div className="flex items-center gap-2 text-sm font-semibold"><ShieldCheck className="size-4 text-success" aria-hidden="true" />Leitura responsável</div><p className="text-xs leading-6 text-muted-foreground">Os percentuais são relativos ao conjunto comparado e não preveem sucesso.</p></CardContent></Card></div>
      <div className="grid content-start gap-5"><Card className="bg-card/80"><CardHeader><div className="flex flex-wrap items-center justify-between gap-3"><div><CardTitle>Cursos com maior aderência</CardTitle><CardDescription className="mt-1">Ranking determinístico antes da interpretação por IA.</CardDescription></div><Badge variant="secondary">10 alternativas</Badge></div></CardHeader><CardContent className="grid gap-3">{courses.map((course, index) => <CourseCard key={course.course} item={course} index={index} />)}</CardContent></Card>
      <Card className="overflow-hidden border-primary/20 bg-[linear-gradient(145deg,rgba(24,42,58,.9),rgba(12,22,32,.96))]"><CardHeader className="border-b border-border/70"><div className="flex items-start gap-4"><div className="grid size-12 shrink-0 place-items-center rounded-2xl border border-primary/25 bg-primary/10 text-primary"><Sparkles className="size-5" aria-hidden="true" /></div><div><CardTitle>Interpretação final com Gemini</CardTitle><CardDescription className="mt-1">A IA confronta evidências. O servidor limita os ajustes e recalcula as aderências.</CardDescription></div></div></CardHeader><CardContent className="grid gap-5 p-5 sm:p-6"><label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border bg-background/55 p-4 hover:border-border-strong"><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-0.5 size-5 accent-[#9ab6d0]" /><span><span className="flex items-center gap-2 text-sm font-semibold"><LockKeyhole className="size-4 text-primary" aria-hidden="true" />Autorizo o envio do dossiê anonimizado.</span><span className="mt-1 block text-xs leading-5 text-muted-foreground">A chave permanece no servidor e dados identificáveis não fazem parte do dossiê.</span></span></label><Button size="lg" className="w-fit" disabled={!consent || aiStatus === "loading"} onClick={askAI}>{aiStatus === "loading" ? <RefreshCw className="size-4 animate-spin" aria-hidden="true" /> : <BrainCircuit className="size-4" aria-hidden="true" />}{aiStatus === "loading" ? "Analisando evidências…" : "Gerar interpretação final"}</Button>{aiStatus === "error" && aiError ? <div className="rounded-2xl border border-destructive/30 bg-destructive/8 p-5" role="alert"><div className="text-sm font-semibold text-destructive-foreground">A interpretação não foi concluída</div><p className="mt-2 text-sm leading-6 text-muted-foreground">{aiError.message}</p>{aiError.details?.responsePreview ? <details className="mt-4 text-xs"><summary className="cursor-pointer font-semibold">Ver resposta técnica</summary><pre className="mt-2 overflow-auto rounded-xl border border-border bg-background p-3 text-[11px]">{aiError.details.responsePreview}</pre></details> : null}</div> : null}{aiStatus === "success" && aiResult ? <AIResult data={aiResult} /> : null}</CardContent></Card></div>
    </div>
    <div className="mt-6 flex flex-wrap gap-3 border-t border-border/70 pt-6"><Button variant="outline" onClick={download}><Download className="size-4" aria-hidden="true" />Baixar dossiê</Button><Button variant="outline" onClick={() => window.print()}><Printer className="size-4" aria-hidden="true" />Salvar PDF</Button><Button variant="ghost" onClick={() => navigate("context")}>Revisar contexto</Button><Button variant="ghost" onClick={reset} className="sm:ml-auto"><RefreshCw className="size-4" aria-hidden="true" />Recomeçar</Button></div>
  </ScreenShell>;
}
