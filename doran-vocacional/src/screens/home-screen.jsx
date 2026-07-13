import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, BrainCircuit, Check, CircleDot, Compass, Database, FileCheck2, Fingerprint, Layers3, LockKeyhole, Route, ShieldCheck, Sparkles, Target } from "lucide-react";
import { ApiStatus } from "@/components/api-status";
import { Reveal } from "@/components/reveal";
import { ScreenShell } from "@/components/screen-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { QUESTIONS } from "@/lib/assessment";

const PROCESS = [
  { icon: BrainCircuit, index: "01", title: "Interesses sem rótulos rígidos", copy: "Trinta situações desenham o perfil RIASEC sem transformar três letras em identidade fixa." },
  { icon: Layers3, index: "02", title: "Contexto mantido separado", copy: "Valores, experiências e limites entram como evidências próprias, sem adulterar o escore de interesse." },
  { icon: Route, index: "03", title: "Hipóteses testadas na prática", copy: "O ranking se transforma em contrapontos, perguntas abertas e microexperimentos de baixo risco." },
];

const TRUST = [
  { icon: LockKeyhole, title: "Local por padrão", copy: "Respostas permanecem no dispositivo. O envio à IA exige consentimento." },
  { icon: FileCheck2, title: "Limites explícitos", copy: "Aderência relativa não é chance de sucesso, emprego ou satisfação." },
  { icon: Database, title: "Frontend e API juntos", copy: "A mesma implantação atende a interface e /api/report, sem versões desencontradas." },
  { icon: Fingerprint, title: "Sem identificação", copy: "Nome, e-mail, telefone e endereço não fazem parte do dossiê." },
];

const REPORT_ROWS = [["Interesse", 84], ["Rotina", 67], ["Viabilidade", 52]];

export function HomeScreen({ navigate, answeredCount, apiHealth }) {
  const reduceMotion = useReducedMotion();
  const hasProgress = answeredCount > 0 && answeredCount < QUESTIONS.length;
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.22], [0, reduceMotion ? 0 : 52]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.72]);

  return (
    <ScreenShell>
      <section className="relative isolate overflow-hidden border-b border-border/60">
        <div className="hero-grid absolute inset-0 opacity-80" aria-hidden="true" />
        <div className="ambient-orb ambient-orb-primary" aria-hidden="true" />
        <div className="ambient-orb ambient-orb-warm" aria-hidden="true" />
        <div className="mx-auto grid min-h-[calc(100dvh-72px)] w-full max-w-[1240px] items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.04fr_.96fr] lg:px-8 lg:py-20">
          <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-3xl">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <Badge><Compass className="size-3.5" aria-hidden="true" />Orientação profissional com método</Badge>
              <ApiStatus health={apiHealth} />
            </div>
            <h1 className="max-w-[12ch] font-display text-[clamp(3.45rem,7.6vw,7rem)] font-medium leading-[.89] tracking-[-.064em]">Clareza para explorar. Evidência para decidir.</h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">O Doran organiza interesses, contexto e experiências em hipóteses comparáveis. Você recebe um mapa de investigação, não uma profissão decretada por um teste.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" onClick={() => navigate("test")}>{hasProgress ? "Continuar exploração" : "Começar exploração"}<ArrowRight className="size-4" aria-hidden="true" /></Button>
              <Button size="lg" variant="outline" onClick={() => navigate("method")}>Ver metodologia e limites</Button>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-5 gap-y-3 text-xs text-muted-foreground">
              {["Sem cadastro", "Resultado local", "IA opcional", "Dossiê anonimizado"].map((item) => <span key={item} className="inline-flex items-center gap-2"><Check className="size-3.5 text-success" aria-hidden="true" />{item}</span>)}
            </div>
          </motion.div>

          <motion.div style={{ y: heroY }} initial={reduceMotion ? false : { opacity: 0, scale: .96, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: .62, ease: [.22, 1, .36, 1] }} className="relative mx-auto w-full max-w-[620px]">
            <div className="absolute -inset-10 rounded-full bg-primary/6 blur-3xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[32px] border border-border/70 bg-card/72 p-3 shadow-[0_45px_110px_-52px_rgba(0,0,0,.95)] backdrop-blur-xl">
              <img src="/pathways-orbit.svg" width="720" height="720" alt="Mapa abstrato conectando as seis dimensões RIASEC a caminhos profissionais" className="w-full select-none rounded-[24px]" />
              <div className="absolute inset-x-6 bottom-6 grid gap-3 rounded-2xl border border-border/80 bg-background/88 p-4 shadow-2xl backdrop-blur-xl sm:grid-cols-3">
                {REPORT_ROWS.map(([label, value]) => <div key={label}><div className="flex justify-between gap-2 text-[11px]"><span className="font-semibold">{label}</span><span className="tabular-nums text-primary">{value}%</span></div><Progress value={value} className="mt-2 h-1" /></div>)}
              </div>
            </div>
            <motion.div animate={reduceMotion ? undefined : { y: [0, -8, 0] }} transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-3 top-[12%] hidden rounded-2xl border border-border bg-card/95 px-4 py-3 shadow-2xl backdrop-blur sm:block"><div className="flex items-center gap-2 text-xs font-semibold"><Target className="size-4 text-warm" aria-hidden="true" />Interesse</div><div className="mt-1 text-[11px] text-muted-foreground">o que desperta energia</div></motion.div>
            <motion.div animate={reduceMotion ? undefined : { y: [0, 7, 0] }} transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: .45 }} className="absolute -right-2 top-[25%] hidden rounded-2xl border border-border bg-card/95 px-4 py-3 shadow-2xl backdrop-blur sm:block"><div className="flex items-center gap-2 text-xs font-semibold"><Route className="size-4 text-primary" aria-hidden="true" />Experimento</div><div className="mt-1 text-[11px] text-muted-foreground">evidência antes da decisão</div></motion.div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-border/60 bg-surface/35">
        <div className="mx-auto grid w-full max-w-[1240px] grid-cols-2 gap-px bg-border/70 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[["30", "itens RIASEC"], ["56", "cursos mapeados"], ["6", "dimensões de interesse"], ["4", "camadas de decisão"]].map(([value, label]) => <div key={label} className="bg-background/92 px-5 py-6 text-center"><div className="font-display text-3xl">{value}</div><div className="mt-1 text-xs text-muted-foreground">{label}</div></div>)}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1240px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[.72fr_1.28fr] lg:items-start">
          <Reveal className="lg:sticky lg:top-28"><Badge variant="secondary">Como funciona</Badge><h2 className="mt-5 max-w-[11ch] font-display text-4xl leading-[.98] tracking-[-.045em] sm:text-6xl">Da percepção à evidência.</h2><p className="mt-5 max-w-md leading-7 text-muted-foreground">Cada etapa responde a uma pergunta diferente. Misturar tudo em um único número seria mais simples, mas menos honesto.</p></Reveal>
          <div className="grid gap-5">
            {PROCESS.map(({ icon: Icon, index, title, copy }, itemIndex) => <Reveal key={title} delay={itemIndex * .06}><Card className="group bg-card/75 transition-[border-color,transform,background-color] duration-300 hover:-translate-y-1 hover:border-border-strong hover:bg-card"><CardContent className="grid gap-6 p-6 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-8"><div className="grid size-14 place-items-center rounded-2xl border border-primary/20 bg-primary/8 text-primary"><Icon className="size-6" aria-hidden="true" /></div><div><CardTitle>{title}</CardTitle><CardDescription className="mt-2 max-w-2xl leading-7">{copy}</CardDescription></div><span className="font-display text-3xl text-muted-foreground/35">{index}</span></CardContent></Card></Reveal>)}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-border/60 bg-surface/50">
        <div className="section-grid absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-[1240px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <Reveal className="mx-auto max-w-3xl text-center"><Badge variant="success">Arquitetura de confiança</Badge><h2 className="mt-5 font-display text-4xl tracking-[-.045em] sm:text-6xl">Credibilidade aparece nos detalhes.</h2><p className="mx-auto mt-5 max-w-2xl leading-7 text-muted-foreground">A interface mostra o que está funcionando, o que foi inferido e onde ainda existe incerteza.</p></Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {TRUST.map(({ icon: Icon, title, copy }, index) => <Reveal key={title} delay={index * .05}><Card className="h-full bg-background/68 backdrop-blur"><CardHeader><div className="grid size-11 place-items-center rounded-2xl border border-border bg-secondary text-primary"><Icon className="size-5" aria-hidden="true" /></div><CardTitle className="mt-5 text-xl">{title}</CardTitle><CardDescription className="leading-7">{copy}</CardDescription></CardHeader></Card></Reveal>)}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1240px] gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:px-8 lg:py-28">
        <Reveal><div className="rounded-[30px] border border-border bg-card/80 p-6 shadow-[0_40px_100px_-55px_rgba(0,0,0,.95)]"><div className="flex items-center justify-between gap-4 border-b border-border/70 pb-5"><div><div className="text-xs font-semibold uppercase tracking-[.14em] text-primary">Exemplo de leitura</div><div className="mt-2 font-display text-3xl">Desenvolvimento de Sistemas</div></div><Badge variant="secondary">hipótese</Badge></div><div className="mt-6 grid gap-4 sm:grid-cols-3">{REPORT_ROWS.map(([label, value]) => <div key={label} className="rounded-2xl border border-border bg-secondary/28 p-4"><div className="text-xs text-muted-foreground">{label}</div><div className="mt-2 font-display text-3xl tabular-nums">{value}%</div></div>)}</div><div className="mt-5 rounded-2xl border border-primary/20 bg-primary/6 p-5"><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.12em] text-primary"><Sparkles className="size-4" aria-hidden="true" />Próxima evidência</div><p className="mt-3 text-sm leading-7">Executar uma tarefa introdutória e observar curiosidade, frustração e vontade de continuar.</p></div></div></Reveal>
        <Reveal delay={.08}><Badge variant="warm">Relatório interpretável</Badge><h2 className="mt-5 font-display text-4xl tracking-[-.04em] sm:text-5xl">Um número sozinho não explica uma decisão.</h2><p className="mt-5 leading-7 text-muted-foreground">O relatório separa sinais de interesse, viabilidade, contrapontos e ações observáveis. A IA organiza a leitura, mas não cria fatos ausentes.</p><div className="mt-7 grid gap-3">{["Evidências e contradições lado a lado", "Viabilidade separada de afinidade", "Informações ausentes explicitadas", "Microexperimentos observáveis"].map((item) => <div key={item} className="flex items-start gap-3 rounded-xl border border-border/70 bg-card/45 px-4 py-3 text-sm"><CircleDot className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />{item}</div>)}</div></Reveal>
      </section>

      <section className="border-t border-border/60 bg-[linear-gradient(180deg,rgba(20,35,51,.4),rgba(8,17,27,.95))]"><div className="mx-auto grid w-full max-w-[1240px] gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8 lg:py-20"><Reveal><div className="flex items-start gap-4"><ShieldCheck className="mt-1 size-6 shrink-0 text-success" aria-hidden="true" /><div><h2 className="font-display text-4xl tracking-[-.04em]">Comece com curiosidade. Termine com evidência.</h2><p className="mt-3 max-w-2xl leading-7 text-muted-foreground">O resultado local continua disponível mesmo quando a camada de IA estiver temporariamente indisponível.</p></div></div></Reveal><Reveal delay={.08}><Button size="lg" onClick={() => navigate("test")}>{hasProgress ? "Retomar exploração" : "Iniciar agora"}<ArrowRight className="size-4" aria-hidden="true" /></Button></Reveal></div></section>
    </ScreenShell>
  );
}
