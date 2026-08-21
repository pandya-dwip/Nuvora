import ordersData from '../data/orders.json';

export const getOrders = () => {
  return ordersData;
};

export const getOrderById = (id) => {
  return ordersData.find((order) => order.id === String(id));
};
