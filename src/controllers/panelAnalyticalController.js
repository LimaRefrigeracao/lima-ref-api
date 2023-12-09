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

const getValueCards = async () => {
  const filteredOrderOfService = await panelAnalyticalModel.getOrdersPaid();
  let somaMesmoDia = 0;
  let somaMesmoMes = 0;
  let somaMesmoAno = 0;
  let somaMesmaSemana = 0;

  const dataAtual = new Date();

  filteredOrderOfService.forEach(async order => {
    const dateParts = order.updated_at.split('-');
    const datePayment = new Date(
      parseInt(dateParts[0]),
      parseInt(dateParts[1]) - 1,
      parseInt(dateParts[2].split('T')[0])
    );

    /* const getWeekBounds = async (date) => {
      const firstDayOfWeek = new Date(date);
      firstDayOfWeek.setDate(date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1));

      const lastDayOfWeek = new Date(date);
      lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

      return { primeiroDia: firstDayOfWeek, ultimoDia: lastDayOfWeek };
    };

    const boundsSemanaAtual = await getWeekBounds(datePayment); */

    if (
      datePayment.getDate() === dataAtual.getDate() &&
      (datePayment.getMonth() + 1) === (dataAtual.getMonth() + 1) &&
      datePayment.getFullYear() === dataAtual.getFullYear()
    ) {
      somaMesmoDia += parseFloat(order.value);
    }

/*     if (
      datePayment >= boundsSemanaAtual.primeiroDia &&
      datePayment <= boundsSemanaAtual.ultimoDia
    ) {
      somaMesmaSemana += parseFloat(order.value);
    } */

    if (
      (datePayment.getMonth() + 1) === (dataAtual.getMonth() + 1) &&
      datePayment.getFullYear() === dataAtual.getFullYear()
    ) {
      somaMesmoMes += parseFloat(order.value);
    }

    if (datePayment.getFullYear() === dataAtual.getFullYear()) {
      somaMesmoAno += parseFloat(order.value);
    }
  });

  return {
    valueDay: somaMesmoDia,
    valueWeek: somaMesmaSemana,
    valueMonth: somaMesmoMes,
    valueYear: somaMesmoAno
  }

}

const getSumValuesOrdersPaid = async (_req, res) => {

  const { labelDay, labelWeek, labelMonth, labelYear } = getLabelCards();

  const values = await getValueCards();

  if (values) {
    return res
      .status(200)
      .json({
        daily: {
          value: values.valueDay,
          day: labelDay
        },
        weekly: {
          value: values.valueWeek,
          week: labelWeek
        },
        monthly: {
          value: values.valueMonth,
          month: labelMonth
        },
        yearly: {
          value: values.valueYear,
          year: labelYear
        }
      });
  }
  else {
    return res
      .status(403)
      .json({
        daily: {
          value: 0,
          day: labelDay
        },
        weekly: {
          value: 0,
          week: labelWeek
        },
        monthly: {
          value: 0,
          month: labelMonth
        },
        yearly: {
          value: 0,
          year: labelYear
        }
      });
  }


};

module.exports = {
  getSumValuesOrdersPaid,
};
