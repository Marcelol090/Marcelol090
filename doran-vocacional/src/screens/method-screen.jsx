import { ArrowRight, BarChart3, BrainCircuit, Layers3, ShieldCheck, Sparkles } from "lucide-react";
import { ScreenShell } from "@/components/screen-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function MethodScreen({ navigate }) {
  return (
    <ScreenShell className="mx-auto w-full max-w-[1040px] px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <Badge variant="secondary">Metodologia e limites</Badge>
      <h1 className="mt-5 max-w-[14ch] font-display text-5xl font-medium leading-[0.95] tracking-[-0.05em] text-foreground sm:text-6xl">Um processo transparente, com fronteiras visíveis.</h1>
      <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground">O Doran foi desenhado para apoiar exploração educacional e de carreira. Ele combina uma camada de interesses com perguntas reflexivas e comparação de cursos, sem simular precisão psicométrica inexistente.</p>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {[
          { icon: BrainCircuit, title: "Interesses RIASEC", text: "Os 30 itens seguem a redução brasileira publicada do O*NET Interest Profiler Short Form. O resultado usa somas e médias simples, sem normas ou percentis." },
          { icon: Layers3, title: "Valores e contexto", text: "Valores, energia e barreiras são camadas reflexivas separadas. Elas enriquecem a interpretação, mas não alteram silenciosamente o escore de interesses." },
          { icon: BarChart3, title: "Aderência de cursos", text: "O ranking compara a forma do perfil RIASEC com vetores exploratórios de cursos. Os percentuais são normalizados apenas entre as alternativas exibidas." },
          { icon: Sparkles, title: "Interpretação por IA", text: "O Gemini pode ajustar cada fit em no máximo ±0,10. O backend valida os cursos permitidos, recalcula percentuais e mostra incerteza e contrapontos." }
        ].map(({ icon: Icon, title, text }) => <Card key={title} className="bg-card/75"><CardHeader><div className="grid size-11 place-items-center rounded-2xl border border-border bg-secondary text-primary"><Icon className="size-5" aria-hidden="true" /></div><CardTitle className="mt-5">{title}</CardTitle><CardDescription className="leading-7">{text}</CardDescription></CardHeader></Card>)}
      </div>
      <Card className="mt-5 border-warm/20 bg-warm/6"><CardHeader><div className="flex items-start gap-4"><ShieldCheck className="mt-1 size-6 shrink-0 text-warm" aria-hidden="true" /><div><CardTitle>O que o Doran não faz</CardTitle><CardDescription className="mt-3 leading-7">Não diagnostica, não emite laudo ou parecer psicológico, não estima chance de emprego, não garante satisfação futura e não substitui mediação profissional quando a decisão envolve sofrimento, conflito ou alto risco.</CardDescription></div></div></CardHeader></Card>
      <div className="mt-8 flex flex-wrap gap-3"><Button onClick={() => navigate("test")}>Começar exploração<ArrowRight className="size-4" aria-hidden="true" /></Button><Button variant="ghost" onClick={() => navigate("home")}>Voltar ao início</Button></div>
    </ScreenShell>
  );
}
