import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export function StageHeader({ step, title, description, progress }) {
  return (
    <div className="mb-8 grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end">
      <div>
        <Badge variant="secondary">Etapa {step} de 3</Badge>
        <h1 className="mt-4 font-display text-4xl font-medium tracking-[-0.04em] text-foreground sm:text-5xl">{title}</h1>
        <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">{description}</p>
      </div>
      <div className="w-full min-w-52 sm:w-64">
        <div className="mb-2 flex justify-between text-xs text-muted-foreground"><span>Progresso</span><span className="tabular-nums">{Math.round(progress)}%</span></div>
        <Progress value={progress} />
      </div>
    </div>
  );
}
