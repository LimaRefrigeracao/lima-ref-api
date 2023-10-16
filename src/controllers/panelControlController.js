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

const getInfoGeneralService = async (_req, res) => {
  const status_by_service = await panelControlModel.getCountStatusByService();
  const status_payment_by_service =
    await panelControlModel.getCountStatusPaymentByService();

  let inProgress = 0;
  let inProcessing = 0;
  const statusServiceMap = {};
  const statusPaymentMap = {};

  status_by_service.status_service.forEach((status) => {
    statusServiceMap[status.cod] = {
      description: status.description,
      color: JSON.parse(status.color).hex,
    };
  });
  status_payment_by_service.status_payment.forEach((status) => {
    statusPaymentMap[status.cod] = {
      description: status.description,
      color: JSON.parse(status.color).hex,
    };
  });

  status_by_service.service.forEach((service) => {
    const statusCod = service.status;
    const statusInfo = statusServiceMap[statusCod];

    if (statusInfo) {
      if (statusInfo.description !== "Concluído" || statusInfo.status !== 13) {
        inProgress += 1;
      }
    }
  });
  status_payment_by_service.service.forEach((service) => {
    const statusCod = service.status;
    const statusInfo = statusPaymentMap[statusCod];

    if (statusInfo) {
      if (statusInfo.description !== "Pago" || statusInfo.status !== 3) {
        inProcessing += 1;
      }
    }
  });

  return res.status(200).json({service_in_progress: inProgress, payment_in_processing: inProcessing});
};

module.exports = {
  getCountProductByService,
  getCountStatusByService,
  getCountStatusPaymentByService,
  getInfoGeneralService,
};
