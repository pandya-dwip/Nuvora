import usersData from '../data/users.json';

export const getUsers = () => {
  return usersData;
};

export const getUserById = (id) => {
  return usersData.find((user) => user.id === Number(id));
};
