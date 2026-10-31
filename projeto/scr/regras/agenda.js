
const servicos = [
    { nome: "Corte", duracao: 60, preco: 50 },
    { nome: "Escova", duracao: 30, preco: 35 },
    { nome: "Manicure", duracao: 30, preco: 25 },
    { nome: "Coloração", duracao: 90, preco: 120 }
];

const CHAVE = "agendamentos";

function carregarAgendamentos() {
    try {
        if (typeof localStorage === "undefined") return [];

        return JSON.parse(localStorage.getItem(CHAVE)) || [];
    } catch {
        return [];
    }
}

let agendamentos = carregarAgendamentos();

function salvarAgendamentos() {
    if (typeof localStorage !== "undefined") {
        localStorage.setItem(CHAVE, JSON.stringify(agendamentos));
    }
}

function dataValida(data) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data)) return false;

    const d = new Date(data + "T12:00:00");

    return !isNaN(d.getTime()) &&
        d.toISOString().slice(0, 10) === data;
}

function verificarFuncionamento(data, inicio, duracao) {
    if (!dataValida(data)) return false;

    const dia = new Date(data + "T12:00:00").getDay();
    const fim = inicio + duracao;

    if (dia === 0 || inicio < 540 || fim > 1080) {
        return false;
    }

    if (inicio < 780 && fim > 720) {
        return false;
    }

    return true;
}

function verificarDisponibilidade(data, inicio, duracao) {
    if (!Number.isInteger(inicio) ||
        !Number.isInteger(duracao) ||
        duracao <= 0) {
        return false;
    }

    if (!verificarFuncionamento(data, inicio, duracao)) {
        return false;
    }

    const fim = inicio + duracao;

    return !agendamentos.some(a =>
        a.data === data &&
        inicio < a.fim &&
        fim > a.inicio
    );
}

function agendar(nome, telefone, data, inicio, nomeServico) {
    const servico = servicos.find(s => s.nome === nomeServico);

    if (!nome || !nome.trim() ||
        !telefone || !telefone.trim() ||
        !servico) {
        return false;
    }

    if (!verificarDisponibilidade(data, inicio, servico.duracao)) {
        return false;
    }

    agendamentos.push({
        id: Date.now().toString() + agendamentos.length,
        nome: nome.trim(),
        telefone: telefone.trim(),
        data,
        inicio,
        fim: inicio + servico.duracao,
        servico: servico.nome
    });

    salvarAgendamentos();

    return true;
}

function listarAgendamentos(data) {
    return agendamentos
        .filter(a => a.data === data)
        .sort((a, b) => a.inicio - b.inicio);
}

function cancelarAgendamento(id) {
    const indice = agendamentos.findIndex(a => a.id === id);

    if (indice === -1) return false;

    agendamentos.splice(indice, 1);
    salvarAgendamentos();

    return true;
}

const agenda = {
    servicos,
    verificarFuncionamento,
    verificarDisponibilidade,
    agendar,
    listarAgendamentos,
    cancelarAgendamento
};

if (typeof module !== "undefined") {
    module.exports = agenda;
}

if (typeof window !== "undefined") {
    window.Agenda = agenda;
}

