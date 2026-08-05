# Fliperama DS v0.34.1

**Fase 7.15R — Auditoria de CPU, multiplayer e qualidade**

## Publicação

O `index.html` está diretamente na raiz. Extraia o ZIP e envie todo o conteúdo para a raiz publicada no GitHub Pages.

## Destaques desta revisão

- Board Arena com CPU ou dois jogadores locais;
- Vector Tennis com CPU ou dois jogadores locais;
- CPU Surpresa com dificuldade e personalidade aleatórias;
- estratégias Ofensiva, Defensiva, Posicional e Imprevisível;
- tempo de decisão separado da jogada do usuário;
- controles independentes dos dois jogadores;
- migração de saves antigos para schema 3;
- regras, controles, contexto e previews competitivos revisados;
- Dama identificada claramente como variante didática simplificada;
- 18 experiências jogáveis preservadas.

## Validação

- 116 testes específicos de CPU, multiplayer e qualidade;
- 109 verificações gerais;
- 37 testes da expansão arcade;
- 120 verificações educacionais;
- 62 testes do museu e da linha do tempo;
- 22 testes do VoxelCraft;
- 16 testes físicos;
- 26 testes 3D;
- **508 verificações aprovadas**;
- **0 falhas automatizadas**;
- 106 módulos no build;
- 209 arquivos e rotas no pacote final.

## Limitação conhecida da validação

O Chromium headless do ambiente não iniciou a camada gráfica por falha de DBus/GPU. O pacote inclui checklist manual para teclado simultâneo, toque, canvas, áudio e responsividade em navegador real.

## Arquivos principais

- `index.html` — entrada da plataforma;
- `app.js` — bundle principal;
- `app.css` — estilos responsivos;
- `game-profiles.json` — modos, controles e configurações;
- `education/game-learning.json` — curadoria educacional;
- `version.json` — versão pública;
- `sw.js` — cache v0.34.1;
- `diagnostico.html` — diagnóstico técnico;
- `diagnostico-jogos.html` — diagnóstico dos 18 jogos;
- `validation/test-cpu-multiplayer-quality.js` — auditoria desta revisão;
- `RELATORIO-AUDITORIA-CPU-MULTIPLAYER-QUALIDADE-v0.34.1.md` — relatório principal.
