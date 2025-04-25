import { useEffect, useState } from "react";
import { ProductContext } from "../context/GlobalContext";
import {
  insertProduct,
  updateProduct,
  deleteProduct,
  db
} from "./productsData";
import {
  saveLocalObjects,
  getLocalObjects,
} from "../hooks/localStorage";

const ProductProvider = ({ children }) => {
  const [listProduct, setListProduct] = useState([]);
  const [modeEdit , setModeEdit] = useState(false)
  const [productId , setProductId] = useState(null)
  const [product , setProduct] = useState({
    id: "id",
    name:"name",
    price: "price",
    stock: "stock"
  });

  useEffect(() => {
    const localData = getLocalObjects();
    db.length = 0;
    db.push(...localData);
    setListProduct([...db]);
  }, []);

  const handleCreate = (data) => {
    insertProduct(data.name, data.price, data.stock);
    saveLocalObjects(db);
    setListProduct([...db]);
  };

  const handleUpdate = async (id, data) => {
    updateProduct(id, data);
    saveLocalObjects(db);
    setListProduct([...db]);
    setModeEdit(false)
    setProductId(null);
    
  };

  const handleDelete = (id) => {
    deleteProduct(id);
    saveLocalObjects(db);
    setListProduct([...db]);
  };

  return (
    <ProductContext.Provider
      value={{
        db,
        listProduct,
        handleCreate,
        handleUpdate,
        handleDelete,
        modeEdit,
        product,
        productId, 
        setProduct,
        setProductId,
        setModeEdit
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
