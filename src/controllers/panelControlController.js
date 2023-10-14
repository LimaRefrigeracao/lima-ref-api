const panelControlModel = require("../models/panelControlModel");

const getCountProductByService = async (_req, res) => {
  const product_by_service = await panelControlModel.getCountProductByService();

  const counts = {};
  let length = 0;

  const colors = [
    "orange-500",
    "cyan-500",
    "pink-500",
    "green-500",
    "purple-500",
    "teal-500",
  ];

  const typesProductMap = {};
  product_by_service.types_product.forEach((type) => {
    typesProductMap[type.id] = type.name;
  });

  const colorIndexMap = {};

  product_by_service.service.forEach((service) => {
    const productName = service.product;
    const typeId = product_by_service.types_product.find(
      (type) => type.name === productName
    )?.id;

    if (typeId) {
      const typeName = typesProductMap[typeId];

      if (!counts[typeName]) {
        const colorIndex = Object.keys(counts).length % colors.length;
        counts[typeName] = {
          name: typeName,
          count: 0,
          color: colors[colorIndex],
        };
      }

      counts[typeName].count++;
      length++;
    }
  });

  return res.status(200).json({length: length, values: counts });
};


module.exports = {
  getCountProductByService,
};
