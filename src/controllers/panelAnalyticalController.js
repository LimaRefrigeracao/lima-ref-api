const panelAnalyticalModel = require("../models/panelAnalyticalModel");

const getLabelCards = () => {
  const addZero = num => (num < 10 ? '0' : '') + num;

  const day = String(new Date().getDate()).padStart(2, "0") + '/' + String(new Date().getMonth() + 1).padStart(2, "0")
  const dataAtual = new Date();
  const diaAtual = dataAtual.getDay();

  const primeiroDiaSemana = new Date(dataAtual);
  primeiroDiaSemana.setDate(dataAtual.getDate() - diaAtual + (diaAtual === 0 ? -6 : 1));
  const ultimoDiaSemana = new Date(dataAtual);
  ultimoDiaSemana.setDate(dataAtual.getDate() + (7 - diaAtual));

  const week =
    addZero(primeiroDiaSemana.getDate()) + '/' +
    addZero((ultimoDiaSemana.getMonth() + 1)) + ' a ' +
    addZero(ultimoDiaSemana.getDate()) + '/' +
    addZero((ultimoDiaSemana.getMonth() + 1))

  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  const month = months[new Date().getMonth()];
  const year = new Date().getFullYear();

  return {
    labelDay: day,
    labelWeek: week,
    labelMonth: month,
    labelYear: year
  };
}

const getWeekBounds = (date) => {
  const firstDayOfWeek = new Date(date);
  firstDayOfWeek.setDate(date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1));

  const lastDayOfWeek = new Date(date);
  lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

  return { primeiroDia: firstDayOfWeek, ultimoDia: lastDayOfWeek };
};

const getSumValuesOrdersPaid = async (_req, res) => {

  const { labelDay, labelWeek, labelMonth, labelYear } = getLabelCards();

  const filteredOrderOfService = await panelAnalyticalModel.getOrdersPaid();
  let somaMesmoDia = 0;
  let somaMesmoMes = 0;
  let somaMesmoAno = 0;
  let somaMesmaSemana = 0;

  const dataAtual = new Date();
  const boundsSemanaAtual = getWeekBounds(dataAtual);

  filteredOrderOfService.forEach(order => {
    const dateParts = order.updated_at.split('-');
    const datePayment = new Date(
      parseInt(dateParts[0]),
      parseInt(dateParts[1]) - 1,
      parseInt(dateParts[2].split('T')[0])
    );

    if (
      datePayment.getDate() === dataAtual.getDate() &&
      (datePayment.getMonth() + 1) === (dataAtual.getMonth() + 1) &&
      datePayment.getFullYear() === dataAtual.getFullYear()
    ) {
      somaMesmoDia += order.value ? parseFloat(order.value) : 0;
    }

    if (
      datePayment >= boundsSemanaAtual.primeiroDia &&
      datePayment <= boundsSemanaAtual.ultimoDia
    ) {
      somaMesmaSemana += order.value ? parseFloat(order.value) : 0;
    }

    if (
      (datePayment.getMonth() + 1) === (dataAtual.getMonth() + 1) &&
      datePayment.getFullYear() === dataAtual.getFullYear()
    ) {
      somaMesmoMes += order.value ? parseFloat(order.value) : 0;
    }

    if (datePayment.getFullYear() === dataAtual.getFullYear()) {
      somaMesmoAno += order.value ? parseFloat(order.value) : 0;
    }
  });
  return res
    .status(200)
    .json({
      daily: {
        value: somaMesmoDia,
        day: labelDay
      },
      weekly: {
        value: somaMesmaSemana,
        week: labelWeek
      },
      monthly: {
        value: somaMesmoMes,
        month: labelMonth
      },
      yearly: {
        value: somaMesmoAno,
        year: labelYear
      }
    });

};

const getValuesInvoicingLiquid = async (_req, res) => {
  const { labelMonth, labelYear } = getLabelCards();

  const dataAtual = new Date();

  let valueEntryMonth = 0;
  let valueEntryYear = 0;

  const filteredOrderOfService = await panelAnalyticalModel.getOrdersPaid();

  if (filteredOrderOfService) {
    filteredOrderOfService.forEach(order => {
      const dateParts = order.updated_at.split('-');
      const datePayment = new Date(
        parseInt(dateParts[0]),
        parseInt(dateParts[1]) - 1,
        parseInt(dateParts[2].split('T')[0])
      );
      if (
        (datePayment.getMonth() + 1) === (dataAtual.getMonth() + 1) &&
        datePayment.getFullYear() === dataAtual.getFullYear()
      ) {
        valueEntryMonth += order.value ? parseFloat(order.value) : 0;
      }
      if (datePayment.getFullYear() === dataAtual.getFullYear()) {
        valueEntryYear += order.value ? parseFloat(order.value) : 0;
      }
    });
  }


  let valueExitMonth = 0;
  let valueExitYear = 0;

  const expensesAll = await panelAnalyticalModel.loadExpensesAll()

  if (expensesAll) {
    expensesAll.forEach(expense => {
      const dateParts = expense.date.split('-');
      const datePayment = new Date(
        parseInt(dateParts[0]),
        parseInt(dateParts[1]) - 1,
        parseInt(dateParts[2].split('T')[0])
      );
      if (
        (datePayment.getMonth() + 1) === (dataAtual.getMonth() + 1) &&
        datePayment.getFullYear() === dataAtual.getFullYear()
      ) {
        valueExitMonth += expense.value ? parseFloat(expense.value) : 0;
      }
      if (datePayment.getFullYear() === dataAtual.getFullYear()) {
        valueExitYear += expense.value ? parseFloat(expense.value) : 0;
      }
    });
  }

  return res
    .status(200)
    .json({
      monthly: {
        label: labelMonth,
        entry: valueEntryMonth,
        exit: valueExitMonth,
        totality: (valueEntryMonth - valueExitMonth)
      },
      yearly: {
        label: labelYear,
        entry: valueEntryYear,
        exit: valueExitYear,
        totality: (valueEntryYear - valueExitYear)
      }
    });

};

module.exports = {
  getSumValuesOrdersPaid,
  getValuesInvoicingLiquid
};
