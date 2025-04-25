const nameKey = 'objetos';

export const getLocalObjects = () => {
  const data = localStorage.getItem(nameKey);
  return data ? JSON.parse(data) : [];
};

export const saveLocalObjects = (data) => {
  localStorage.setItem(nameKey, JSON.stringify(data));
};

export const removeLastObjectId = () => {
  localStorage.removeItem(nameKey);
};
