const BASE_URL = 'https://crudcrud.com/api/487c5f23af1f48a98559414db9647424/unicorns';

export const createObject = async (data) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.ok;
};

export const updateObject = async (id, data) => {
  console.log("update",id);
  console.log("data",data);
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.ok;
};

export const deleteObject = async (id) => {
  console.log("borrar",id);
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  return response.ok;
};

export const getObjects = async () => {
  const response = await fetch(`${BASE_URL}`);
  if (!response.ok) {
    throw new Error('Error fetching data');
  }
  return await response.json();
};

