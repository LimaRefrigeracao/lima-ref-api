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
    .json({ length: length, totalQuant: totalQuant, values: counts });
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
  });

  // Converta o objeto de contagem em um array
  const countsArray = Object.values(counts);

  console.log(countsArray);

  return res
    .status(200)
    .json({ length: length, totalQuant: totalQuant, values: countsArray });
};



module.exports = {
  getCountProductByService,
  getCountStatusByService,
};
