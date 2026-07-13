export function responseSchema(courseIds, leastFitCourseIds) {
  const properties = {
    overallConfidence: { type: "string", enum: ["baixa", "moderada", "alta"] },
    confidenceRationale: { type: "string" },
    profileSummary: { type: "string" },
    judgements: {
      type: "array",
      minItems: 3,
      maxItems: 5,
      items: {
        type: "object",
        properties: {
          course: { type: "string", enum: courseIds },
          adjustment: { type: "number", minimum: -0.1, maximum: 0.1 },
          interestFit: { type: "string", enum: ["baixa", "moderada", "alta"] },
          currentViability: { type: "string", enum: ["baixa", "moderada", "alta", "indeterminada"] },
          rationale: { type: "string" },
          evidence: { type: "array", items: { type: "string" }, minItems: 1, maxItems: 5 },
          counterevidence: { type: "array", items: { type: "string" }, minItems: 1, maxItems: 4 },
          viabilityNotes: { type: "array", items: { type: "string" }, maxItems: 4 },
          experiment: { type: "string" },
          observationCriteria: { type: "array", items: { type: "string" }, minItems: 2, maxItems: 4 },
        },
        required: [
          "course",
          "adjustment",
          "interestFit",
          "currentViability",
          "rationale",
          "evidence",
          "counterevidence",
          "viabilityNotes",
          "experiment",
          "observationCriteria"
        ],
      },
    },
    missingInformation: { type: "array", items: { type: "string" }, maxItems: 8 },
    nextBestQuestion: { type: "string" },
    ethicalNote: { type: "string" },
  };

  const required = [
    "overallConfidence",
    "confidenceRationale",
    "profileSummary",
    "judgements",
    "missingInformation",
    "nextBestQuestion",
    "ethicalNote"
  ];

  if (leastFitCourseIds.length) {
    properties.leastFitCourses = {
      type: "array",
      minItems: 1,
      maxItems: 3,
      items: {
        type: "object",
        properties: {
          course: { type: "string", enum: leastFitCourseIds },
          reason: { type: "string" },
          supportingEvidence: { type: "array", items: { type: "string" }, minItems: 1, maxItems: 4 },
          reconsiderationCondition: { type: "string" },
        },
        required: ["course", "reason", "supportingEvidence", "reconsiderationCondition"],
      },
    };
    required.push("leastFitCourses");
  }

  return { type: "object", properties, required };
}
