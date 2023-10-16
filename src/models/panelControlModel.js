const connection = require("./connection");
const typesProduct = require("./typesProductModel");
const statusService = require("./statusServiceModel");
const service = require("./servicesModel");

const getCountProductByService = async () => {
  let arrayService = await service.getAll();
  const arrayTypesProduct = await typesProduct.getAll();

  arrayService = arrayService.map((item) => ({
    id: item.id,
    product: item.product,
  }));

  return {
    service: arrayService,
    types_product: arrayTypesProduct,
  };
};

const getCountStatusByService = async () => {
  let arrayService = await service.getAll();
  const arrayStatusService = await statusService.getAll();

  arrayService = arrayService.map((item) => ({
    id: item.id,
    status: item.status,
  }));

  return {
    service: arrayService,
    status_service: arrayStatusService,
  };
};

module.exports = {
  getCountProductByService,
  getCountStatusByService,
};
