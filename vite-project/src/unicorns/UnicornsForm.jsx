import React, { useContext, useEffect ,useState} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { UnicornContext } from '../context/GlobalContext';

const UnicornsView = () => {
  const {
    handleCreate,
    handleUpdate,
    unicornEdit,
    unicornId,
    setModeEdit,
    modeEdit
  } = useContext(UnicornContext);

  const { id } = useParams();
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (id) {
      unicornId(id);
    }
  }, [id, unicornId]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(6, 'Debe tener mínimo 6 caracteres')
      .max(20, 'Debe tener menos de 20 caracteres')
      .required('Nombre es obligatorio'),
    age: Yup.number().required('Edad es obligatoria'),
    colour: Yup.string().required('Color es obligatorio'),
    power: Yup.string().required('Poder es obligatorio'),
  });

  const initialValues = modeEdit
    ? unicornEdit
    : { name: '', age: '', colour: '', power: '' };

  return (
    <div className="container my-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">{modeEdit ? "Editar Unicornio" : "Crear Unicornio"}</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            if (modeEdit) {
              handleUpdate(unicornEdit._id, values);
              console.log("aca estoy", unicornEdit._id);
              setAlertMessage("Unicornio actualizado correctamente.");
            } else {
              handleCreate(values);
              setAlertMessage("Producto creado correctamente."); 
            }
            resetForm();
            setModeEdit(false);
          }}
          enableReinitialize
        >
          {() => (
            <Form className="row g-3">
              {alertMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  {alertMessage}
                  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
              )}
              <div className="col-md-6">
                <div className="form-floating">
                  <Field name="name" className="form-control" placeholder="Nombre" />
                  <label htmlFor="name">Nombre</label>
                  <ErrorMessage name="name" component="div" className="text-danger small mt-1" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <Field name="age" className="form-control" placeholder="Edad" />
                  <label htmlFor="age">Edad</label>
                  <ErrorMessage name="age" component="div" className="text-danger small mt-1" />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating">
                  <Field name="colour" className="form-control" placeholder="Color" />
                  <label htmlFor="colour">Color</label>
                  <ErrorMessage name="colour" component="div" className="text-danger small mt-1" />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating">
                  <Field name="power" className="form-control" placeholder="Poder" />
                  <label htmlFor="power">Poder</label>
                  <ErrorMessage name="power" component="div" className="text-danger small mt-1" />
                </div>
              </div>

              <div className="d-flex justify-content-between mt-4">
                <button type="submit" className="btn btn-primary px-4">
                  {modeEdit ? 'Guardar Cambios' : 'Crear Unicornio'}
                </button>

                <button
                  type="button"
                  className="btn btn-outline-secondary px-4"
                  onClick={() => navigate('/')}
                >
                  Ir a lista de Unicornios
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UnicornsView;
