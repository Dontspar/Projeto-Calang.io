const agenda = require('../../scr/regras/agenda');

if (typeof window !== 'undefined') {
  window.Agenda = agenda;
}

module.exports = agenda;
