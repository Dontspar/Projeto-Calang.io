readme

# 📅 Agenda Studio Rita

Projeto de sistema de agendamento online para o Studio Rita, desenvolvido com **HTML, CSS e JavaScript**. Este README descreve o escopo planejado do MVP; consulte a estrutura e o estado atual dos arquivos antes de considerar uma funcionalidade concluída.

O MVP prevê que clientes consultem os serviços, vejam horários disponíveis e realizem agendamentos. Também prevê um painel administrativo para Rita acompanhar e gerenciar a agenda diária.

---

## 📌 Sumário

- [Sobre o projeto](#-sobre-o-projeto)
- [Objetivos](#-objetivos)
- [Funcionalidades](#-funcionalidades)
- [Requisitos e critérios de aceitação](#-requisitos-e-critérios-de-aceitação)
- [Arquitetura do sistema](#-arquitetura-do-sistema)
- [Regras de negócio](#-regras-de-negócio)
- [Persistência de dados](#-persistência-de-dados)
- [Tecnologias utilizadas](#-tecnologias-utilizadas)
- [Como executar](#-como-executar)
- [Testes automatizados](#-testes-automatizados)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Decisões do projeto](#-decisões-do-projeto)
- [Equipe](#-equipe)

---

## 🎯 Sobre o projeto

O **Agenda Studio Rita** tem como finalidade facilitar o gerenciamento de horários e atendimentos de um pequeno salão de beleza localizado no Crato, Ceará.

Atualmente, a profissional responsável pelo estabelecimento realiza seus agendamentos manualmente, utilizando um caderno e o WhatsApp. Esse processo pode ocasionar conflitos de horários, agendamentos duplicados e dificuldades na organização dos atendimentos.

Diante desse cenário, o sistema propõe uma solução digital que permita às clientes consultar os serviços disponíveis e realizar seus próprios agendamentos, enquanto a profissional poderá visualizar e administrar sua agenda diária.

O projeto foi desenvolvido como parte do programa de trainee do **Setor de Projetos da Calang.io**, aplicando conceitos de desenvolvimento web, organização de requisitos, gerenciamento ágil, testes automatizados e colaboração por meio do Git e GitHub.

## 🎓 Objetivos

- Facilitar o processo de agendamento de serviços.
- Reduzir conflitos e sobreposições de horários.
- Permitir que clientes consultem os serviços e horários disponíveis.
- Simplificar o gerenciamento dos atendimentos diários.
- Proporcionar uma interface intuitiva e acessível.
- Implementar regras de negócio para garantir a consistência dos agendamentos.
- Aplicar boas práticas de desenvolvimento e organização de código.
- Desenvolver uma aplicação testada e modular, respeitando os requisitos técnicos estabelecidos.

## ✨ Funcionalidades

### 💇 Catálogo de serviços

O sistema apresenta os serviços oferecidos pelo Studio Rita, disponibilizando informações sobre seus respectivos preços e durações.

Serviços disponíveis:

| Serviço | Duração | Preço |
|---|---:|---:|
| Corte | 1 hora | R$ 50,00 |
| Escova | 30 minutos | R$ 35,00 |
| Manicure | 30 minutos | R$ 25,00 |
| Coloração | 1 hora e 30 minutos | R$ 120,00 |

### 📅 Agendamento de horários (previsto)

O fluxo planejado permite que as clientes consultem horários por serviço e data e enviem seus dados para realizar um agendamento.

Funcionalidades:

- Consultar horários disponíveis para uma data.
- Selecionar o serviço desejado.
- Informar nome e telefone.
- Confirmar o agendamento.
- Impedir agendamentos com informações obrigatórias ausentes.
- Evitar conflitos entre atendimentos.

### 🗓️ Visualização da agenda (prevista)

O painel administrativo planejado permitirá que Rita acompanhe os atendimentos de determinado dia.

Informações apresentadas:

- Horário do atendimento.
- Nome da cliente.
- Telefone.
- Serviço agendado.

Os atendimentos são organizados em ordem cronológica, facilitando a visualização e o acompanhamento da rotina do estabelecimento.

### ⚙️ Gerenciamento de atendimentos (previsto)

O escopo prevê as seguintes funções administrativas:

- Consultar os atendimentos do dia.
- Cancelar agendamentos existentes.
- Liberar automaticamente horários após cancelamentos.
- Bloquear horários específicos (diferencial).
- Marcar atendimentos como concluídos (diferencial).

### 💾 Armazenamento de dados (previsto)

- Persistência de informações utilizando `localStorage`.
- Armazenamento dos agendamentos no navegador.
- Recuperação dos dados após recarregar a página.
- Manutenção dos registros durante a utilização do sistema no mesmo navegador.

---

## 📋 Requisitos e critérios de aceitação

Os requisitos funcionais abaixo definem o produto mínimo viável (MVP); sua inclusão nesta tabela não significa que já estejam implementados.

| ID | Requisito | Prioridade |
|---|---|---|
| RF01 | Cliente visualiza os serviços, suas durações e preços. | Obrigatório |
| RF02 | Cliente visualiza os horários disponíveis para determinado serviço. | Obrigatório |
| RF03 | Cliente realiza agendamento informando nome e telefone. | Obrigatório |
| RF04 | Sistema impede atendimentos com horários sobrepostos. | Obrigatório |
| RF05 | Rita visualiza a agenda do dia em ordem de horário. | Obrigatório |
| RF06 | Rita consegue cancelar um agendamento. | Obrigatório |
| RF07 | Rita consegue bloquear um horário. | Diferencial |
| RF08 | Rita consegue marcar um atendimento como concluído. | Diferencial |

### Critérios de aceitação

| ID | Critério |
|---|---|
| RF01 | Os quatro serviços aparecem com nome, duração e preço. |
| RF02 | Um corte agendado às 10h impede que uma escova seja oferecida às 10h ou às 10h30 no mesmo dia. |
| RF02 | Domingos não apresentam horários disponíveis e nenhum serviço pode terminar após as 18h. |
| RF03 | Agendamentos sem nome ou telefone não são salvos, e a cliente recebe uma indicação do motivo. |
| RF04 | A regra de conflito deve ser implementada como função pura em `projeto/scr/regras/` e acompanhada de testes. |
| RF05 | O painel apresenta os atendimentos em ordem de horário, com nome, telefone e serviço. |
| RF06 | Após o cancelamento, o horário correspondente volta a aparecer como disponível. |
| Geral | Os dados permanecem armazenados após recarregar a página. |

---

## 🏗️ Arquitetura do sistema

O projeto utiliza uma arquitetura simplificada, considerando as restrições técnicas estabelecidas para o desenvolvimento.

A aplicação será construída em uma única página HTML, contendo duas áreas principais:

| Área | Responsabilidade |
|---|---|
| Agendar | Interface destinada às clientes, permitindo consultar serviços, horários disponíveis e realizar agendamentos. |
| Painel da Rita | Interface administrativa destinada à visualização e ao gerenciamento dos atendimentos. |
| `projeto/scr/regras/` | Local atual previsto para as funções responsáveis pelas regras de negócio. |
| Servidor estático (`serve`) | Disponibiliza os arquivos da aplicação por HTTP durante o desenvolvimento; não implementa backend nem API. |
| `localStorage` | Persistência local planejada para os dados dos agendamentos. |

A separação entre regras de negócio e interface tem como objetivo facilitar a manutenção do código e permitir a realização de testes independentes da apresentação visual.

### 🧩 Organização das regras de negócio

As regras responsáveis pelo funcionamento da agenda devem permanecer separadas dos elementos da interface.

Entre as responsabilidades desse módulo estão:

- Verificar conflitos entre agendamentos.
- Validar a disponibilidade de horários.
- Considerar a duração dos serviços.
- Respeitar os horários de funcionamento.
- Impedir agendamentos em dias não permitidos.

**Arquivo principal previsto:**

`projeto/scr/regras/agenda.js`

Outros módulos poderão ser adicionados conforme a necessidade identificada durante o desenvolvimento.

---

## ⚖️ Regras de negócio

O sistema deve respeitar as condições de funcionamento do Studio Rita.

### Horário de funcionamento

| Condição | Regra |
|---|---|
| Dias de atendimento | Segunda-feira a sábado |
| Horário de abertura | 09h |
| Horário de encerramento | 18h |
| Intervalo de almoço | Horário a definir |
| Domingo | Sem atendimento |

### Disponibilidade de horários

- Os horários disponíveis dependem da duração do serviço selecionado.
- Não podem existir atendimentos simultâneos.
- Um novo agendamento não pode ocupar o intervalo de um atendimento já registrado.
- Nenhum serviço pode ultrapassar o horário de encerramento.
- O intervalo de almoço ainda precisa ser definido; depois disso, esse período não deverá ser disponibilizado para agendamento.

### Integridade dos agendamentos

- Nome e telefone são informações obrigatórias.
- O sistema deve impedir agendamentos sobrepostos.
- O cancelamento deve liberar o horário correspondente.
- Os dados devem permanecer disponíveis após a atualização da página.

---

## 💾 Persistência de dados com localStorage

O escopo prevê o uso de `localStorage`, recurso do navegador que permite armazenar informações localmente.

A persistência dos dados deverá permitir que os agendamentos continuem disponíveis após o recarregamento da página, sem servidor ou banco de dados externo.

As operações de armazenamento e recuperação deverão ser organizadas de maneira consistente.

**Observação:** como não há backend, o armazenamento é local ao navegador utilizado. Portanto, a solução não contempla sincronização automática de dados entre diferentes dispositivos ou navegadores.

---

## 🛠️ Tecnologias utilizadas

- **HTML5:** estruturação dos elementos e conteúdo da aplicação.
- **CSS3:** estilização e organização visual da interface.
- **JavaScript:** implementação das funcionalidades e regras de negócio.
- **Node.js:** execução dos testes automatizados.
- **localStorage:** persistência local dos dados no navegador.
- **Git:** controle de versão e acompanhamento das modificações.
- **GitHub:** hospedagem do repositório e gerenciamento da colaboração.
- **Node Test Runner (`node:test`):** execução dos testes automatizados.

### Restrições técnicas

O desenvolvimento deve respeitar as seguintes condições:

- Utilização de HTML, CSS e JavaScript puro.
- Não utilização de frameworks.
- Não utilização de backend; o servidor `serve` é estático e serve apenas os arquivos da aplicação.
- Aplicação organizada em uma única `index.html`.
- Persistência de dados por meio de `localStorage`.
- Regras de negócio em funções puras dentro de `projeto/scr/regras/`.
- Testes automatizados executados com `node --test`.
- Node.js 18 ou superior para executar o servidor e os testes.

---

## ▶️ Como executar

### 1. Entrar na pasta da aplicação

```bash
cd projeto
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

O comando inicia o servidor estático `serve`; abra o endereço exibido no terminal (por padrão, `http://localhost:3000`). Encerre o servidor com `Ctrl+C`.

O servidor apenas entrega os arquivos HTML, CSS e JavaScript por HTTP. Ele não é um backend, não oferece API e não sincroniza os dados: os agendamentos continuam restritos ao `localStorage` do navegador.

**Alternativa:** também é possível abrir `index.html` diretamente no navegador, sem iniciar o servidor.

**Observação:** execute os comandos dentro da pasta `projeto` e use Node.js 18 ou superior.

---

## 🧪 Testes automatizados

O projeto utiliza o recurso nativo `node:test` para verificar o comportamento das regras de negócio.

Os testes devem contemplar tanto situações comuns quanto casos extremos, garantindo que os agendamentos respeitem as condições estabelecidas.

### Principais cenários de teste

- Verificação de horários sobrepostos.
- Validação da disponibilidade de horários.
- Respeito ao intervalo de almoço, após a definição desse período.
- Impedimento de agendamentos aos domingos.
- Impedimento de serviços que ultrapassem o horário de funcionamento.
- Verificação da liberação de horários após cancelamentos.

### Executando os testes

No terminal, dentro da pasta `projeto`, utilize:

```bash
node --test
```

A aplicação deverá contar com pelo menos oito testes automatizados passando na entrega final.

**Último resultado confirmado:** ainda não registrado.

---

## 🔄 Fluxo de trabalho e colaboração

O desenvolvimento utiliza Git e GitHub para organizar as contribuições e acompanhar as alterações realizadas pelos integrantes.

### Estratégia de branches

Cada tarefa deve ser desenvolvida em uma branch própria, seguindo uma nomenclatura que identifique sua finalidade.

Exemplo:

```bash
git switch -c feat/rf01-servicos
```

### Pull Requests

Nenhuma alteração deve ser incorporada diretamente à branch `main` sem passar por um Pull Request revisado por outro integrante.

O fluxo estabelecido é:

1. Criar uma branch para a tarefa.
2. Implementar a funcionalidade.
3. Realizar commits pequenos e objetivos.
4. Atualizar a branch com a versão mais recente da `main`.
5. Abrir um Pull Request e solicitar revisão.
6. Corrigir eventuais problemas identificados.
7. Realizar o merge após a aprovação.

### Organização das tarefas

O acompanhamento será realizado por meio de um quadro Kanban, utilizando as seguintes etapas:

- A fazer.
- Fazendo.
- Em revisão.
- Pronto.
- Impedido.

Cada integrante deverá manter, no máximo, um card na coluna "Fazendo".

---

## 📝 Decisões do projeto

As decisões técnicas e organizacionais devem ser registradas no arquivo `projeto/DECISOES.md`.

Cada registro deverá apresentar:

- Identificador da decisão.
- Data.
- Responsável pela proposta.
- Opções consideradas.
- Decisão tomada e justificativa.
- Consequências ou riscos identificados.

O objetivo é documentar as escolhas realizadas durante o desenvolvimento, permitindo compreender os motivos por trás da implementação e facilitar futuras alterações.

**Registro das decisões:** [Consultar projeto/DECISOES.md](projeto/DECISOES.md)

---

## 📁 Estrutura do projeto

Estrutura atual dos arquivos relevantes:

```text
Projeto-Calang.io/
│
├── README.md
└── projeto/
    ├── index.html
    ├── scr/
    │   └── regras/
    │       └── agenda.js
    ├── tests/
    │   └── agenda.test.js
    ├── node_modules/       # dependências instaladas localmente
    ├── package.json
    ├── package-lock.json
    └── DECISOES.md
```

As funcionalidades descritas neste documento representam o escopo do MVP e devem ser atualizadas conforme o desenvolvimento avance.

---

## 👥 Equipe

**Programa:** Trainee 2026.2  
**Setor:** Projetos  
**Empresa:** Calang.io  
**Projeto:** Agenda Studio Rita


### Integrantes: Grupo 2

| Integrante | Responsabilidade | GitHub |
|---|---|---|
| Alexandre Marques Cabral | agenda da rita e testes | [Mestos] |
| Gledson Do Nascimento Silva | agenda.js | [Gledsons7] |
| João Lucas de Siqueira Miranda | index.html | [joa0lucassi] |
| Tadeu Coêlho de Vasconcelos | Organização e documentação | [Dontspar] |

**Facilitador:** Dia 1: _[Dontspar]_; Dia 2: _[Gledsons7]_  
**Guardião da main:** Dia 1: _[Mestos]_; Dia 2: _[Dontspar]_

*Os papéis são rotativos e podem ser atualizados durante o desenvolvimento.*

---

## 📦 Entrega final

A entrega do projeto contempla:

- Aplicação com os requisitos obrigatórios RF01 a RF06 funcionando.
- Repositório com código incorporado por Pull Requests revisados.
- Testes automatizados com pelo menos oito casos passando.
- README com instruções de execução, funcionalidades e limitações.
- Arquivo `DECISOES.md` com pelo menos quatro decisões registradas.
- Quadro Kanban atualizado com o andamento real das tarefas.
- Tag de versão `v1.0`.

**Prazo de entrega:** 31/10/2026, até 23h59.

---

⭐ **Agenda Studio Rita** — simplificando agendamentos e tornando a organização dos atendimentos mais prática e eficiente.
