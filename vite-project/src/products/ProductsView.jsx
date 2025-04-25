import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/GlobalContext";

const ProductsView = () => {
  const { 
    listProduct,
    setProductId, 
    setProduct, 
    setModeEdit,
    handleDelete 
  } = useContext(ProductContext);
  const navigate = useNavigate();

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Lista de Productos</h2>
      </div>
      <div>
        <button
            className="btn btn-success"
            onClick={() => navigate(`/form`)}
          >
            Crear un Producto
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {listProduct.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  No hay productos cargados.
                </td>
              </tr>
            ) : (
              listProduct.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>${p.price}</td>
                  <td>{p.stock}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        setProduct({
                          name: p.name,
                          price: p.price,
                          stock: p.stock
                        });
                        setProductId(p.id);
                        setModeEdit(true);
                        navigate(`editar/${p.id}`);
                      }}
                    >
                      Editar
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(p.id)}
                    >
                      Borrar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsView;
