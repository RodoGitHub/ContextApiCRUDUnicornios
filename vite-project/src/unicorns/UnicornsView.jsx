import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UnicornContext } from "../context/GlobalContext";

const UnicornsView = () => {
  const { unicorns, loading, handleDelete, unicornId } = useContext(UnicornContext);
  const navigate = useNavigate();

  const trueUnicorns = unicorns.length === 0 ? "No hay unicornios cargados." : "Listado de Unicornios";
  if (loading) return <div className="text-center my-5"><p>Cargando unicornios...</p></div>;

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">{trueUnicorns}</h2>
      </div>
      <div>
      <button
          className="btn btn-success"
          onClick={() => navigate('/form')}
        >
          Crear Unicornios
        </button>
      </div>
      <div className="table-responsive shadow-sm rounded">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Color</th>
              <th>Power</th>
              <th>Editar</th>
              <th>Borrar</th>
            </tr>
          </thead>
          <tbody>
            {unicorns.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">No hay unicornios disponibles.</td>
              </tr>
            ) : (
              unicorns.map((unicorn) => (
                <tr key={unicorn.id}>
                  <td>{unicorn.id}</td>
                  <td>{unicorn.name}</td>
                  <td>{unicorn.age}</td>
                  <td>{unicorn.colour}</td>
                  <td>{unicorn.power}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        unicornId(unicorn.id);
                        navigate(`/editar/${unicorn.id}`);
                      }}
                    >
                      Editar
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(unicorn.id)}
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

export default UnicornsView;
