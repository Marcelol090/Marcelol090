function normalize(items) {
  const maxFit = Math.max(...items.map((item) => item.fit));
  const weights = items.map((item) => Math.exp((item.fit - maxFit) / 0.12));
  const total = weights.reduce((sum, value) => sum + value, 0);
  return items.map((item, index) => ({
    ...item,
    probability: Number(((weights[index] / total) * 100).toFixed(1)),
  }));
}

export function finalize(dossier, analysis) {
  const base = new Map(dossier.candidates.slice(0, 5).map((candidate) => [candidate.course, candidate]));
  const used = new Set();
  const rows = [];
  for (const judgement of analysis.data.judgements || []) {
    if (used.has(judgement.course) || !base.has(judgement.course)) continue;
    used.add(judgement.course);
    const candidate = base.get(judgement.course);
    const adjustment = Math.max(-0.1, Math.min(0.1, Number(judgement.adjustment) || 0));
    rows.push({
      judgement,
      candidate,
      fit: Math.max(0, Math.min(1, Number(candidate.fit) + adjustment)),
      adjustment,
    });
  }
  if (rows.length < 3) throw new Error("A IA não retornou três cursos válidos");

  const ranked = normalize(rows).sort((a, b) => b.probability - a.probability);
  const width = analysis.data.overallConfidence === "alta" ? 8 : analysis.data.overallConfidence === "moderada" ? 13 : 19;
  const leastFitSet = new Set(dossier.leastFitCandidates.map((candidate) => candidate.course));
  const leastFitCourses = (analysis.data.leastFitCourses || [])
    .filter((item) => leastFitSet.has(item.course))
    .slice(0, 3);

  return {
    roleLabel: "Assistente de orientação profissional por IA",
    modelUsed: analysis.model,
    overallConfidence: analysis.data.overallConfidence,
    confidenceRationale: analysis.data.confidenceRationale,
    profileSummary: analysis.data.profileSummary,
    recommendations: ranked.map((row) => ({
      course: row.judgement.course,
      probability: row.probability,
      interval: [
        Math.max(0, Number((row.probability - width).toFixed(1))),
        Math.min(100, Number((row.probability + width).toFixed(1))),
      ],
      baseFit: Number(Number(row.candidate.fit).toFixed(3)),
      aiAdjustment: row.adjustment,
      interestFit: row.judgement.interestFit,
      currentViability: row.judgement.currentViability,
      rationale: row.judgement.rationale,
      evidence: row.judgement.evidence || [],
      counterevidence: row.judgement.counterevidence || [],
      viabilityNotes: row.judgement.viabilityNotes || [],
      experiment: row.judgement.experiment,
      observationCriteria: row.judgement.observationCriteria || [],
    })),
    leastFitCourses,
    missingInformation: analysis.data.missingInformation || [],
    nextBestQuestion: analysis.data.nextBestQuestion,
    ethicalNote: analysis.data.ethicalNote || "Resultado exploratório, não diagnóstico, laudo ou decisão automática.",
    usage: analysis.usage,
    providerFailuresBeforeSuccess: analysis.failures,
  };
}
