export const db = [];

export function insertProduct(name, price, stock) {
  const newProduct = {
    id: Date.now(),
    name,
    price: parseFloat(price),
    stock: parseInt(stock)
  };
  db.push(newProduct);
}

export function updateProduct(id, data) {
  const index = db.findIndex(p => p.id ===  parseInt(id));
  
  if (index !== -1) {
    
    db[index] = {
      ...db[index],
      name: data.name,
      price: parseFloat(data.price),
      stock: parseInt(data.stock)
    };
  }
}

export function deleteProduct(id) {
  const index = db.findIndex(p => p.id === parseInt(id));
  if (index !== -1) {
    db.splice(index, 1);
  }
}
