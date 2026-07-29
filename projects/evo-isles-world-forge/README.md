# Evo Isles — World Forge

Protótipo web de idle monster collector com mineração por criatura, progressão de vila, fabricação de ferramentas e ovos, exploração em mini mundo aberto e evolução de linhagens.

## Produção

- Demo: https://evo-isles-idle-demo.vercel.app
- Figma: https://www.figma.com/design/LNT7eySPzrGHknIodNMmzj

## Loop principal

1. Dragões produzem recursos conforme afinidade e trabalho.
2. O jogador explora o Vale do Núcleo Antigo para coletar materiais raros.
3. A Oficina transforma recursos em ferramentas com bônus permanentes.
4. Casas e edifícios ampliam produção, capacidade e velocidade.
5. A Forja combina materiais em ovos elementais ou prismáticos.
6. Novos monstros aumentam a economia, a coleção e a progressão.

## UI/UX

O arquivo Figma contém:

- Design system com tokens, tipografia e componentes.
- 5 protótipos desktop.
- 5 protótipos mobile.
- Fluxos de coleta, exploração, crafting, incubação e retenção idle.
- Página de handoff com breakpoints, acessibilidade e Definition of Done.

## Estrutura sugerida

```text
src/
  app/
  components/
    navigation/
    resources/
    dragons/
    buildings/
    crafting/
    exploration/
  game/
    economy/
    recipes/
    progression/
    persistence/
  assets/
  styles/
docs/
```

## Stack recomendada

- Next.js + TypeScript
- Zustand para estado local
- Zod para schemas de save e balanceamento
- Canvas 2D ou PixiJS para exploração
- CSS Modules ou Tailwind para interface
- Vitest + Playwright
- Vercel para deploy

## Branch

O projeto foi colocado em uma branch isolada para não sobrescrever repositórios existentes.
