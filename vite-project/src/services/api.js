// const BASE_URL = 'https://crudcrud.com/api/487c5f23af1f48a98559414db9647424/unicorns';

// export const createObject = async (data) => {
//   const response = await fetch(BASE_URL, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//   });
//   return response.ok;
// };

// export const updateObject = async (id, data) => {
//   console.log("update",id);
//   console.log("data",data);
//   const response = await fetch(`${BASE_URL}/${id}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//   });
//   return response.ok;
// };

// export const deleteObject = async (id) => {
//   console.log("borrar",id);
//   const response = await fetch(`${BASE_URL}/${id}`, {
//     method: 'DELETE',
//   });
//   return response.ok;
// };

// export const getObjects = async () => {
//   const response = await fetch(`${BASE_URL}`);
//   if (!response.ok) {
//     throw new Error('Error fetching data');
//   }
//   return await response.json();
// };

import axios from 'axios';

const BASE_URL = 'https://crudcrud.com/api/1d287b78ddb443d7b92912b6df04c5fc/unicorns';

export const createObject = async (data) => {
  try {
    const response = await axios.post(BASE_URL, data);
    return response.status === 201; 
  } catch (error) {
    console.error("Error creando unicornio:", error);
    return false;
  }
};

export const updateObject = async (id, data) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, data);
    return response.status === 200; 
  } catch (error) {
    console.error("Error actualizando unicornio:", error);
    return false;
  }
};

export const deleteObject = async (id) => {
  console.log("borrar", id);
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.status === 200; 
  } catch (error) {
    console.error("Error borrando unicornio:", error);
    return false;
  }
};

export const getObjects = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetch data:", error);
  
  }
};


