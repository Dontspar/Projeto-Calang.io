const test = require('node:test');
const assert = require('node:assert')
const agenda = require('../scr/regras/agenda')

agenda.agendar('Pedro Henrique', '888888888', '2026-11-05', 540, 'Corte');

test('O pacote principal exporta a agenda corretamente', () => {
    const agendaDoPacote = require('..');
    assert.strictEqual(typeof agendaDoPacote.agendar, 'function');
    assert.strictEqual(typeof agendaDoPacote.verificarFuncionamento, 'function');
});

test('Validação de formato de datas', () => {
    assert.strictEqual(agenda.verificarFuncionamento('2026-10-31', 600, 60), true); 
    assert.strictEqual(agenda.verificarFuncionamento('Dia treze de outubro de 2026', 600, 60), false);
});

test('Validação do horário de funcionamento', () => {
    assert.strictEqual(agenda.verificarFuncionamento('2026-10-31', 650, 60), true); 
    assert.strictEqual(agenda.verificarFuncionamento('2026-10-11', 650, 60), false); // Domingo 
    assert.strictEqual(agenda.verificarFuncionamento('2026-10-31', 720, 60), false); // Almoço
});

test('Nome e telefone são obrigatórios', () =>{
    const erro1 = agenda.agendar('', '888888888', '2026-10-28', 540, 'Manicure');
    const erro2 = agenda.agendar('José', '', '2026-11-03', 600, 'Coloração');
    const sucesso = agenda.agendar('Maria', '888888888', '2026-11-03', 620, 'Escova');
    assert.strictEqual(erro1, false)
    assert.strictEqual(erro2, false)
    assert.strictEqual(sucesso, true)
});

test('Não pode existir horários simultâneos', () => {
    const data1 = '2026-11-02';
    const data2 = '2026-11-05';
    const simultaneo = agenda.agendar('Maria', '888888888', data2, 540, 'Escova');
    const nao_simultaneo = agenda.agendar('João', '888888888', data1, 540, 'Escova');
    assert.strictEqual(simultaneo, false);
    assert.strictEqual(nao_simultaneo, true);

});

test('Não pode haver sobreposição de datas', () => {
    const data = '2026-11-05';
    const simultaneo = agenda.agendar('Maria', '888888888', data, 540, 'Escova');
    const lista = agenda.listarAgendamentos(data)
    assert.strictEqual(lista[0].nome, 'Pedro Henrique');

});


test('O cancelamento deve liberar o horário correspondente', () => {
    const lista_teste = agenda.listarAgendamentos('2026-11-05')
    const cancelado = agenda.cancelarAgendamento(lista_teste[0].id);
    assert.strictEqual(cancelado, true);
    assert.strictEqual(agenda.listarAgendamentos('2026-11-05').length, 0);
    assert.strictEqual(agenda.verificarDisponibilidade('2026-11-05', 540, 60), true)
});