import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, BrainCircuit, Check, Compass, Layers3, Route, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScreenShell } from "@/components/screen-shell";
import { QUESTIONS } from "@/lib/assessment";

export function HomeScreen({ navigate, answeredCount }) {
  const reduceMotion = useReducedMotion();
  const hasProgress = answeredCount > 0 && answeredCount < QUESTIONS.length;

  return (
    <ScreenShell>
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="hero-grid absolute inset-0 opacity-80" aria-hidden="true" />
        <div className="mx-auto grid min-h-[calc(100dvh-72px)] w-full max-w-[1240px] items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-20">
          <div className="relative z-10 max-w-3xl">
            <Badge className="mb-6"><Compass className="size-3.5" aria-hidden="true" />Orientação profissional com método</Badge>
            <h1 className="max-w-[13ch] font-display text-[clamp(3.5rem,8vw,7.2rem)] font-medium leading-[0.88] tracking-[-0.065em] text-foreground">Escolher um caminho pode ser mais claro.</h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">O Doran organiza interesses RIASEC, valores e contexto para transformar incerteza em hipóteses testáveis, não em uma sentença sobre o seu futuro.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" onClick={() => navigate("test")}>{hasProgress ? "Continuar exploração" : "Começar exploração"}<ArrowRight className="size-4" aria-hidden="true" /></Button>
              <Button size="lg" variant="outline" onClick={() => navigate("method")}>Entender a metodologia</Button>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
              {[["30", "itens de interesses"], ["56", "áreas de cursos"], ["6", "dimensões RIASEC"], ["1", "relatório interpretativo"]].map(([value, label]) => (
                <div key={label} className="bg-background/90 px-4 py-4"><div className="font-display text-2xl text-foreground">{value}</div><div className="mt-1 text-[11px] leading-4 text-muted-foreground">{label}</div></div>
              ))}
            </div>
          </div>

          <motion.div initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto w-full max-w-[620px]">
            <div className="absolute -inset-8 rounded-full bg-primary/5 blur-3xl" aria-hidden="true" />
            <img src="/pathways-orbit.svg" width="720" height="720" alt="Mapa abstrato conectando as seis dimensões RIASEC a caminhos profissionais" className="relative w-full select-none drop-shadow-[0_32px_55px_rgba(0,0,0,.34)]" />
            <motion.div animate={reduceMotion ? undefined : { y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute left-[4%] top-[18%] hidden rounded-2xl border border-border bg-card/95 px-4 py-3 shadow-2xl backdrop-blur sm:block">
              <div className="flex items-center gap-2 text-xs font-semibold text-foreground"><Target className="size-4 text-warm" aria-hidden="true" />Interesses</div><div className="mt-1 text-[11px] text-muted-foreground">energia e curiosidade</div>
            </motion.div>
            <motion.div animate={reduceMotion ? undefined : { y: [0, 7, 0] }} transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute bottom-[15%] right-[3%] hidden rounded-2xl border border-border bg-card/95 px-4 py-3 shadow-2xl backdrop-blur sm:block">
              <div className="flex items-center gap-2 text-xs font-semibold text-foreground"><Route className="size-4 text-primary" aria-hidden="true" />Microexperimentos</div><div className="mt-1 text-[11px] text-muted-foreground">teste antes de decidir</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1240px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[.78fr_1.22fr] lg:items-start">
          <div className="lg:sticky lg:top-28"><Badge variant="secondary">O processo</Badge><h2 className="mt-5 max-w-[12ch] font-display text-4xl font-medium leading-[0.98] tracking-[-0.045em] text-foreground sm:text-5xl">Da percepção à evidência.</h2><p className="mt-5 max-w-md leading-7 text-muted-foreground">O resultado não tenta adivinhar uma profissão perfeita. Ele organiza sinais, mostra tensões e propõe próximos passos de baixo risco.</p></div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { icon: BrainCircuit, index: "01", title: "Mapeie interesses", copy: "Trinta situações ajudam a desenhar a forma do seu perfil RIASEC sem usar percentis inventados." },
              { icon: Layers3, index: "02", title: "Cruze contexto", copy: "Valores, limitações e duração desejada entram como camadas separadas, sem distorcer o escore de interesses." },
              { icon: Route, index: "03", title: "Teste hipóteses", copy: "Cursos são comparados e a IA sugere microexperimentos para produzir evidência no mundo real." }
            ].map(({ icon: Icon, index, title, copy }) => (
              <Card key={title} className="group min-h-[290px] overflow-hidden bg-card/75 transition-colors hover:border-border-strong"><CardHeader><div className="flex items-center justify-between"><div className="grid size-11 place-items-center rounded-2xl border border-border bg-secondary text-primary"><Icon className="size-5" aria-hidden="true" /></div><span className="font-display text-lg text-muted-foreground/55">{index}</span></div><CardTitle className="mt-8">{title}</CardTitle><CardDescription className="text-sm leading-7">{copy}</CardDescription></CardHeader></Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border/60 bg-surface/45">
        <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:px-8 lg:py-20">
          <img src="/decision-landscape.svg" width="960" height="480" loading="lazy" alt="Ilustração de caminhos conectando interesses, contexto e experimentos" className="w-full rounded-[28px] shadow-[0_32px_80px_-48px_rgba(0,0,0,.85)]" />
          <div><Badge variant="warm">Limite explícito</Badge><h2 className="mt-5 font-display text-4xl font-medium tracking-[-0.04em] text-foreground">Uma ferramenta de exploração, não um veredito.</h2><p className="mt-5 leading-7 text-muted-foreground">O Doran não produz diagnóstico, laudo ou avaliação psicológica. A interpretação do Gemini é uma camada de apoio que mostra evidências, contrapontos e incertezas.</p>
            <div className="mt-7 grid gap-3">{["Probabilidades relativas apenas entre cursos comparados", "Consentimento antes do envio do dossiê anonimizado", "Ajuste da IA limitado e recalculado pelo servidor"].map((item) => <div key={item} className="flex items-start gap-3 text-sm text-foreground"><div className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-success/35 bg-success/10 text-success"><Check className="size-3" aria-hidden="true" /></div><span className="leading-6">{item}</span></div>)}</div>
            <Button className="mt-8" onClick={() => navigate("test")}>Explorar meu perfil<ArrowRight className="size-4" aria-hidden="true" /></Button>
          </div>
        </div>
      </section>
    </ScreenShell>
  );
}
