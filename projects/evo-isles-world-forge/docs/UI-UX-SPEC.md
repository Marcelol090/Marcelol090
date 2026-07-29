# Evo Isles UI/UX Specification

## Telas principais

### Island Hub
Visão geral da economia, dragões trabalhando, casas, buffs, coleta acumulada e fila de produção.

### Exploration
Mini mundo aberto com movimentação por teclado/toque, energia, nós regenerativos, baús, missões e retorno à ilha.

### Workshop
Receitas de ferramentas, comparação de bônus, custos, fila de fabricação e equipamentos ativos.

### Egg Forge
Receitas elementais e prismáticas, requisitos, temporizador, estados de falta de recursos e ação de chocar.

### Collection
Famílias, estágios evolutivos, afinidade econômica, raridade, poder e desbloqueios.

## Breakpoints

- Mobile: 390 × 844
- Tablet: 768 × 1024
- Desktop: 1440 × 900

## Regras

- Touch targets com no mínimo 44 px.
- Contraste mínimo 4.5:1 para texto funcional.
- Recursos nunca devem depender apenas de cor; usar ícone + nome + número.
- Feedback imediato após coleta, fabricação, evolução e melhoria.
- Navegação mobile fixa na base; desktop usa rail lateral.
- Painéis de detalhe devem virar bottom sheets no mobile.

## Estados obrigatórios

- Loading
- Empty
- Offline return
- Insufficient resources
- Crafting active
- Ready to hatch
- Node regenerating
- Energy depleted
- Building upgrade available

## Componentes

- ResourceBar
- NavigationRail
- BottomNavigation
- DragonCard
- BuildingCard
- RecipeCard
- ProgressBar
- ElementChip
- ProductionQueue
- ExplorationHUD
- Toast
- ConfirmationDialog
