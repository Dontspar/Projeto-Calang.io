decisões

# Decisões do projeto — Agenda Studio Rita

Este documento registra as decisões e premissas que orientam o desenvolvimento do MVP. As escolhas foram consolidadas a partir dos requisitos do projeto e do protótipo atual. O registro explica os motivos das escolhas e seus efeitos esperados; não substitui a especificação completa dos requisitos.

**Data de consolidação:** 31/10/2026  
**Responsáveis pelo registro:** organização da documentação por Tadeu Coêlho de Vasconcelos  
**Contexto:** MVP de agendamento para o Studio Rita, desenvolvido no programa de trainee da Calang.io.


## DEC-01 — Entregar o MVP como uma página única

- **Data:** 31/10/2026 (consolidação do registro)
- **Responsável:** João Lucas de Siqueira Miranda
- **Status:** Definida para o MVP
- **Decisão:** Organizar a experiência em uma única página HTML, com uma área de agendamento para clientes e outra área administrativa para Rita.
- **Premissa:** O fluxo inicial pode ser atendido em uma página sem exigir navegação entre várias rotas.

| Alternativa | Vantagens | Custos e limitações |
|---|---|---|
| Uma página com áreas distintas (**escolhida**) | Menos estrutura e navegação simples para o MVP. | O arquivo pode crescer; é preciso separar responsabilidades no código e deixar clara a diferença entre as áreas. |
| Páginas separadas para cliente e administração | Separa melhor os fluxos e pode facilitar permissões e evolução independente. | Exige navegação e mais arquivos; sem backend, não resolve por si só a proteção da área administrativa. |
| Aplicação com rotas usando framework | Facilita experiências com várias telas e URLs. | Aumenta a complexidade e entra em conflito com as restrições técnicas atuais. |

**Consequências:** A página deverá identificar claramente o fluxo da cliente e o painel de Rita. A separação visual não equivale a controle de acesso seguro.

## DEC-02 — Armazenar os agendamentos no navegador

- **Data:** 31/10/2026 (consolidação do registro)
- **Responsável:** Gledson do Nascimento Silva
- **Status:** Definida para o MVP
- **Decisão:** Usar `localStorage` para persistir os dados no navegador.
- **Premissa:** O MVP não terá backend e pode demonstrar persistência durante o uso no mesmo navegador e dispositivo.

| Alternativa | Vantagens | Custos e limitações |
|---|---|---|
| `localStorage` (**escolhida**) | Simples, nativo do navegador e mantém dados após recarregar a página. | Os dados ficam restritos àquele navegador/dispositivo; não há sincronização, cópia central ou acesso compartilhado automático. |
| `sessionStorage` | Também é nativo e simples. | Os dados duram apenas durante a sessão da aba, inadequado para manter a agenda após fechar a sessão. |
| Backend com banco de dados | Permite centralizar e sincronizar agendamentos entre dispositivos e usuários. | Exige servidor, banco, hospedagem e cuidados adicionais de segurança; fora do escopo e das restrições do MVP. |

**Consequências e riscos:** A agenda salva em um dispositivo não será automaticamente visível em outro. Como os dados podem incluir nome e telefone, a solução atual não deve ser tratada como armazenamento seguro para operação real. Uma versão multiusuário exigirá reavaliação desta decisão.

## DEC-03 — Manter as regras de negócio separadas da interface

- **Data:** 31/10/2026 (consolidação do registro)
- **Responsável:** Alexandre Marques Cabral
- **Status:** Definida para o MVP
- **Decisão:** Implementar as regras da agenda em funções puras, separadas do código de interface, e cobri-las com testes usando `node:test`.
- **Premissa:** Regras como conflito de horários, duração dos serviços e horário de funcionamento podem ser calculadas sem depender do DOM ou do armazenamento.

| Alternativa | Vantagens | Custos e limitações |
|---|---|---|
| Funções puras em módulo de regras e testes nativos (**escolhida**) | Resultados previsíveis; testes independentes do navegador; sem dependência de biblioteca de testes. | Exige manter a fronteira entre regras e interface e configurar corretamente os módulos no Node e no navegador. |
| Regras implementadas diretamente nos manipuladores da interface | Pode parecer mais rápido em um protótipo muito pequeno. | Mistura responsabilidades e torna mais difícil testar conflitos e casos extremos de forma isolada. |
| Biblioteca de testes ou camada de serviços mais elaborada | Pode oferecer ferramentas adicionais ou abstrações. | Acrescenta dependências e estrutura que não são necessárias para os requisitos atuais. |

**Consequências:** As regras devem receber dados e devolver resultados, sem consultar elementos HTML. Essa separação permite testar a lógica sem abrir a página no navegador.

## DEC-04 — Respeitar o horário de funcionamento e bloquear sobreposições

- **Data:** 31/10/2026 (consolidação do registro)
- **Responsável:** Gledson do Nascimento Silva
- **Status:** Regras definidas; intervalo de almoço pendente
- **Decisão:** Permitir atendimento de segunda-feira a sábado, entre 09h e 18h; não oferecer horários aos domingos; considerar a duração do serviço para impedir sobreposição e término após as 18h.
- **Premissa:** Os quatro serviços inicialmente listados têm duração conhecida (30, 60 ou 90 minutos), e a agenda não deve aceitar atendimentos simultâneos.

| Alternativa | Vantagens | Custos e limitações |
|---|---|---|
| Validar intervalos completos e respeitar os limites de funcionamento (**escolhida**) | Evita conflitos também quando os serviços têm durações diferentes e protege o horário de encerramento. | Requer cálculo correto do horário final e testes de limites. |
| Comparar apenas o horário inicial | Implementação inicial mais simples. | Pode permitir que um serviço longo se sobreponha a outro ou termine depois do fechamento. |
| Permitir agendamentos sem limite de funcionamento | Flexibilidade para horários excepcionais. | Contradiz o horário de operação informado e exigiria uma forma explícita de cadastrar exceções. |

**Consequências e pendência:** O intervalo de almoço está indicado como “a definir” no escopo. Até a equipe determinar seu período, não se deve inventar um intervalo nem afirmar que a regra está completa. A regra de cancelamento deve liberar a faixa ocupada pelo atendimento cancelado.

## DEC-05 — Colaborar com branches, revisão por Pull Request e Kanban

- **Data:** 31/10/2026 (consolidação do registro)
- **Responsável:** Tadeu Coêlho de Vasconcelos; Guardião da Main.
- **Status:** Definida como fluxo de trabalho
- **Decisão:** Desenvolver tarefas em branches próprias, incorporar alterações à `main` por Pull Request revisado e acompanhar o trabalho em um quadro Kanban.
- **Premissa:** O trabalho é realizado em equipe e precisa deixar visíveis o andamento e a revisão das mudanças.

| Alternativa | Vantagens | Custos e limitações |
|---|---|---|
| Branch por tarefa, Pull Request revisado e Kanban (**escolhida**) | Torna mudanças revisáveis e dá visibilidade ao andamento do grupo. | Exige manter branches e cards atualizados e reservar tempo para revisão. |
| Todos alterarem diretamente a `main` | Fluxo inicial simples, com menos etapas. | Aumenta o risco de conflitos e permite integrar mudanças sem revisão. |
| Acompanhar tarefas apenas por mensagens | Não exige configurar quadro. | Histórico e estado das tarefas ficam dispersos e mais difíceis de consultar. |

**Consequências:** O grupo precisa definir quem revisa cada Pull Request e manter o quadro atualizado. Os papéis rotativos de facilitador e guardião da `main` devem ser preenchidos conforme a escala real.

## DEC-06 — Servir a aplicação localmente durante o desenvolvimento

- **Data:** 01/11/2026
- **Responsável:** Alexandre 
- **Status:** Definida para o desenvolvimento do MVP
- **Decisão:** Usar o pacote `serve` como servidor HTTP estático, iniciado pelo script `npm run dev` a partir da pasta `projeto`.
- **Premissa:** Servir a página por HTTP facilita a execução e os testes da aplicação no navegador, sem introduzir um backend.

| Alternativa | Vantagens | Custos e limitações |
|---|---|---|
| `serve` como servidor estático (**escolhida**) | Disponibiliza os arquivos por HTTP com um comando npm simples; é uma dependência de desenvolvimento. | Requer Node.js e a instalação das dependências; não fornece API, banco de dados ou sincronização entre dispositivos. |
| Abrir `index.html` diretamente | Não exige instalar ou iniciar um servidor. | Não exercita a aplicação por HTTP, podendo diferir do ambiente esperado durante o desenvolvimento. |
| Criar um backend | Permitiria centralizar dados e oferecer uma API. | Acrescentaria infraestrutura e complexidade fora do escopo atual do MVP. |

**Consequências:** O servidor serve os arquivos do projeto, mas não altera a decisão de persistir os agendamentos no `localStorage` do navegador. Os dados permanecem locais e não são compartilhados entre dispositivos.



## Premissas e pontos a confirmar

- A data acima é a data de consolidação deste registro, não necessariamente a data em que cada decisão foi tomada.


