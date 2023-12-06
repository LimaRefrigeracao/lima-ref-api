const panelControlModel = require("../models/panelControlModel");

const getCountProductByService = async (_req, res) => {
  const product_by_service = await panelControlModel.getCountProductByService();

  const counts = {};
  let length = 0;
  let totalQuant = 0;

  const typesProductMap = {};
  product_by_service.types_product.forEach((type) => {
    typesProductMap[type.id] = type.name;
  });

  product_by_service.service.forEach((service) => {
    const productName = service.product;
    const typeId = product_by_service.types_product.find(
      (type) => type.name === productName
    )?.id;

    if (typeId) {
      const typeName = typesProductMap[typeId];

      if (!counts[typeName]) {
        counts[typeName] = {
          name: typeName,
          count: 0,
        };
      }

      counts[typeName].count++;
      length++;
      totalQuant += 1;
    }
  });

  return res
    .status(200)
    .json({ length: length, quantTotality: totalQuant, values: counts });
};

const getCountStatusByService = async (_req, res) => {
  const status_by_service = await panelControlModel.getCountStatusByService();

  const counts = {};
  let length = 0;
  let totalQuant = 0;

  const statusServiceMap = {};
  status_by_service.status_service.forEach((status) => {
    statusServiceMap[status.cod] = {
      description: status.description,
      color: JSON.parse(status.color).hex,
    };
  });

  status_by_service.service.forEach((service) => {
    const statusCod = service.status;
    const statusInfo = statusServiceMap[statusCod];

    if (statusInfo) {
      if (statusInfo.description !== "Concluído") {
        if (!counts[statusCod]) {
          counts[statusCod] = {
            cod: statusCod,
            description: statusInfo.description,
            color: statusInfo.color,
            count: 0,
          };
        }

        counts[statusCod].count++;
        length++;
        totalQuant += 1;
      }
    }
  });

  const countsArray = Object.values(counts);

  return res
    .status(200)
    .json({ length: length, inProcessing: totalQuant, values: countsArray });
};

const getCountStatusPaymentByService = async (_req, res) => {
  const status_payment_by_service =
    await panelControlModel.getCountStatusPaymentByService();

  const counts = {};
  let length = 0;

  const statusPaymentMap = {};
  status_payment_by_service.status_payment.forEach((status) => {
    statusPaymentMap[status.cod] = {
      description: status.description,
      color: JSON.parse(status.color).hex,
    };
  });

  status_payment_by_service.service.forEach((service) => {
    const statusCod = service.status;
    const statusInfo = statusPaymentMap[statusCod];

    if (statusInfo) {
      if (statusInfo.description !== "Pago") {
        if (!counts[statusCod]) {
          counts[statusCod] = {
            cod: statusCod,
            description: statusInfo.description,
            color: statusInfo.color,
            count: 0,
          };
        }

        counts[statusCod].count++;
        length++;
      }
    }
  });

  const countsArray = Object.values(counts);

  return res.status(200).json({ length: length, values: countsArray });
};

const getInfoPerformaceYearly = async (_req, res) => {
  const info_performace = await panelControlModel.getInfoPerformaceYearly();

  const totalServicesByMonth = new Array(12).fill(0);
  const completedServicesByMonth = new Array(12).fill(0);
  const paidServicesByMonth = new Array(12).fill(0);

  info_performace.service.forEach((service) => {
    const month = service.month;
    totalServicesByMonth[month]++;

    const statusServiceMap = {};
    const statusPaymentMap = {};

    info_performace.status_service.forEach((status) => {
      statusServiceMap[status.cod] = {
        description: status.description,
      };
    });
    info_performace.status_payment.forEach((status) => {
      statusPaymentMap[status.cod] = {
        description: status.description,
      };
    });

    const statusCodService = service.status;
    const statusInfoService = statusServiceMap[statusCodService];
    if (statusInfoService) {
      if (
        statusInfoService.description === "Concluído"
      ) {
        completedServicesByMonth[month]++;
      }
    }

    const statusCodPayment = service.status_payment;
    const statusInfoPayment = statusPaymentMap[statusCodPayment];
    if (statusInfoPayment) {
      if (
        statusInfoPayment.description === "Pago"
      ) {
        paidServicesByMonth[month]++;
      }
    }
  });

  return res.status(200).json({
    requested: totalServicesByMonth,
    concluded: completedServicesByMonth,
    paid: paidServicesByMonth,
  });
};

module.exports = {
  getCountProductByService,
  getCountStatusByService,
  getCountStatusPaymentByService,
  getInfoPerformaceYearly,
};
