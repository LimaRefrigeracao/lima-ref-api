const connection = require("./connection");
const typesProduct = require("./typesProductModel");
const service = require("./servicesModel");

const getCountProductByService = async () => {
  let arrayService = await service.getAll();
  const arrayTypesProduct = await typesProduct.getAll();

  arrayService = arrayService.map((item) => ({
    id: item.id,
    product: item.product,
  }));

  return {
    "service": arrayService,
    "types_product": arrayTypesProduct,
  };
};

module.exports = {
  getCountProductByService,
};
