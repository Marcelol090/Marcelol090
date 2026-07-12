export const RIASEC_LABELS = {
  R: "Realista",
  I: "Investigativo",
  A: "Artístico",
  S: "Social",
  E: "Empreendedor",
  C: "Convencional",
};

export const RIASEC_DESCRIPTIONS = {
  R: "Prefere ação concreta, ferramentas, operação e resultados visíveis.",
  I: "Busca compreender problemas, analisar padrões e investigar causas.",
  A: "Valoriza expressão, criação, originalidade e linguagem visual ou narrativa.",
  S: "Encontra energia em apoiar, ensinar, cuidar e colaborar com pessoas.",
  E: "Gosta de influenciar, liderar, negociar e transformar ideias em movimento.",
  C: "Prefere estrutura, organização, precisão, registros e processos claros.",
};

export const QUESTIONS = [
  ["R", "Reparar e instalar fechaduras"],
  ["I", "Realizar testes laboratoriais para identificar doenças"],
  ["A", "Escrever livros ou peças de teatro"],
  ["S", "Ajudar pessoas com problemas familiares"],
  ["E", "Começar seu próprio negócio"],
  ["C", "Corrigir registros ou formulários"],
  ["R", "Reparar eletrodomésticos"],
  ["I", "Examinar amostras de sangue usando um microscópio"],
  ["A", "Desenhar ou pintar quadros"],
  ["S", "Realizar terapias de reabilitação"],
  ["E", "Promover um produto que você está vendendo"],
  ["C", "Registrar pagamentos de aluguéis"],
  ["R", "Construir armários de cozinha"],
  ["I", "Trabalhar em um laboratório de biologia"],
  ["A", "Fazer uma performance de dança"],
  ["S", "Ajudar a conduzir uma sessão de terapia de grupo"],
  ["E", "Gerenciar um departamento dentro de uma grande empresa"],
  ["C", "Controlar um estoque usando um computador de mão"],
  ["R", "Configurar e operar máquinas para fabricar produtos"],
  ["I", "Desenvolver um novo medicamento"],
  ["A", "Cantar em uma banda"],
  ["S", "Ajudar pessoas com problemas pessoais ou emocionais"],
  ["E", "Negociar contratos de empresas"],
  ["C", "Manter o envio e o recebimento de registros"],
  ["R", "Testar a qualidade de peças antes de despachar"],
  ["I", "Conduzir experimentos químicos"],
  ["A", "Criar efeitos especiais para filmes"],
  ["S", "Realizar orientação profissional com as pessoas"],
  ["E", "Comprar e vender ações e títulos"],
  ["C", "Carimbar, classificar e distribuir correspondência"],
];

export const ANSWER_OPTIONS = [
  { value: 1, label: "Detestaria", short: "Nada a ver comigo" },
  { value: 2, label: "Não gostaria", short: "Pouco interesse" },
  { value: 3, label: "Indiferente", short: "Neutro" },
  { value: 4, label: "Gostaria", short: "Tenho interesse" },
  { value: 5, label: "Gostaria muito", short: "Muito a ver comigo" },
];

export const WORK_VALUES = [
  { key: "achievement", label: "Realização", description: "Sentir que o trabalho gera progresso e competência." },
  { key: "independence", label: "Independência", description: "Ter autonomia para decidir como executar o trabalho." },
  { key: "recognition", label: "Reconhecimento", description: "Receber visibilidade, status ou valorização pelo trabalho." },
  { key: "relationships", label: "Relacionamentos", description: "Trabalhar com respeito, cooperação e contato humano." },
  { key: "support", label: "Apoio", description: "Contar com liderança, orientação e ambiente confiável." },
  { key: "conditions", label: "Condições", description: "Ter previsibilidade, segurança e condições adequadas." },
];

const RAW_COURSES = `Enfermagem|SCR|Ambiente e Saúde;Análises Clínicas|IRC|Ambiente e Saúde;Farmácia|ICS|Ambiente e Saúde;Saúde Bucal|SRC|Ambiente e Saúde;Estética|ASE|Ambiente e Saúde;Nutrição e Dietética|ISC|Ambiente e Saúde;Meio Ambiente|IRC|Ambiente e Saúde;Segurança do Trabalho|RCS|Segurança;Informática|IRC|Informação e Comunicação;Desenvolvimento de Sistemas|ICA|Informação e Comunicação;Redes de Computadores|IRC|Informação e Comunicação;Manutenção de Computadores|RIC|Informação e Comunicação;Design Gráfico|AIE|Produção Cultural e Design;Multimídia|ARE|Produção Cultural e Design;Marketing|EAS|Gestão e Negócios;Administração|ECS|Gestão e Negócios;Contabilidade|CIE|Gestão e Negócios;Recursos Humanos|SEC|Gestão e Negócios;Logística|CER|Gestão e Negócios;Secretariado|CSE|Gestão e Negócios;Comércio|ECS|Gestão e Negócios;Vendas|ESC|Gestão e Negócios;Finanças|CIE|Gestão e Negócios;Qualidade|CIR|Gestão e Negócios;Edificações|RIC|Infraestrutura;Estradas|RIC|Infraestrutura;Agrimensura|RIC|Infraestrutura;Eletrotécnica|RIC|Controle e Processos Industriais;Eletrônica|RIC|Controle e Processos Industriais;Automação Industrial|RIC|Controle e Processos Industriais;Mecatrônica|RIC|Controle e Processos Industriais;Mecânica|RIC|Controle e Processos Industriais;Manutenção Automotiva|RIC|Controle e Processos Industriais;Refrigeração e Climatização|RIC|Controle e Processos Industriais;Soldagem|RCI|Controle e Processos Industriais;Química|IRC|Produção Industrial;Alimentos|IRC|Produção Alimentícia;Panificação|RAC|Produção Alimentícia;Agropecuária|RIE|Recursos Naturais;Agricultura|RIC|Recursos Naturais;Zootecnia|RIS|Recursos Naturais;Florestas|RIC|Recursos Naturais;Eventos|ESA|Turismo, Hospitalidade e Lazer;Hospedagem|SEC|Turismo, Hospitalidade e Lazer;Guia de Turismo|SEA|Turismo, Hospitalidade e Lazer;Cozinha|RAE|Turismo, Hospitalidade e Lazer;Produção de Áudio e Vídeo|ARI|Produção Cultural e Design;Teatro|ASE|Produção Cultural e Design;Dança|ASR|Produção Cultural e Design;Artes Visuais|ARI|Produção Cultural e Design;Vestuário|ARC|Produção Cultural e Design;Design de Interiores|ARE|Produção Cultural e Design;Serviços Jurídicos|CEI|Gestão e Negócios;Transações Imobiliárias|ESC|Gestão e Negócios;Desenvolvimento Comunitário|SEC|Desenvolvimento Educacional e Social;Cuidados de Idosos|SRC|Ambiente e Saúde`;

export const COURSES = RAW_COURSES.split(";").map((entry, index) => {
  const [name, code, axis] = entry.split("|");
  const vector = [1, 1, 1, 1, 1, 1];
  [...code].forEach((letter, position) => {
    vector["RIASEC".indexOf(letter)] = 5 - position;
  });
  return { id: index, name, code, axis, vector };
});

export function calculateRiasec(answers) {
  const totals = [0, 0, 0, 0, 0, 0];
  QUESTIONS.forEach(([letter], index) => {
    totals["RIASEC".indexOf(letter)] += Number(answers[index] || 0);
  });
  return totals.map((value) => value / 5);
}

export function profileCode(scores) {
  return [0, 1, 2, 3, 4, 5].sort((a, b) => scores[b] - scores[a]).slice(0, 3).map((index) => "RIASEC"[index]).join("");
}

function similarity(profile, courseVector) {
  const distance = profile.reduce((sum, value, index) => sum + (value - courseVector[index]) ** 2, 0);
  return Math.exp(-Math.sqrt(distance) / 3);
}

export function normalizeProbabilities(items, temperature = 0.12) {
  const maxFit = Math.max(...items.map((item) => item.fit));
  const weights = items.map((item) => Math.exp((item.fit - maxFit) / temperature));
  const total = weights.reduce((sum, value) => sum + value, 0);
  return items.map((item, index) => ({ ...item, probability: Number(((weights[index] / total) * 100).toFixed(1)) }));
}

export function rankCourses(scores, limit = 10) {
  const ranked = COURSES.map((course) => ({ course: course.name, axis: course.axis, code: course.code, fit: similarity(scores, course.vector) })).sort((a, b) => b.fit - a.fit).slice(0, limit);
  return normalizeProbabilities(ranked);
}

export function buildDossier(state) {
  const scores = calculateRiasec(state.answers);
  const candidates = rankCourses(scores, 10);
  return {
    schema: "doran-op-v3",
    boundary: "Aderências relativas entre alternativas comparadas. Não são probabilidades de sucesso, emprego, conclusão ou satisfação.",
    riasec: { code: profileCode(scores), averages: scores },
    context: { reason: state.reason, duration: state.duration, energy: state.energy.trim(), limits: state.limits.trim(), values: state.values },
    candidates: candidates.map((candidate) => ({ course: candidate.course, axis: candidate.axis, code: candidate.code, fit: Number(candidate.fit.toFixed(3)), relative_probability: candidate.probability })),
  };
}
