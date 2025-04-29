import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from '../context/GlobalContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ProductsView = () => {
  const {
    handleCreate,
    handleUpdate,
    modeEdit,
    product,
    setProductId,
    setModeEdit,
  } = useContext(ProductContext);

  const { id } = useParams();
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (id) {
      setProductId(id);
    }
  }, [id, setProductId]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(6, 'Debe tener mínimo 6 caracteres')
      .max(20, 'Debe tener menos de 20 caracteres')
      .required('Nombre es obligatorio'),
    price: Yup.number().required('Precio es obligatorio'),
    stock: Yup.number().required('Stock es obligatorio'),
  });

  const initialValues = modeEdit
    ? product
    : { name: '', price: '', stock: '' };

  return (
    <div className="container my-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">{modeEdit ? "Editar Producto" : "Crear Producto"}</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            if (modeEdit) {
          
              handleUpdate(id, values);
              setAlertMessage("Producto actualizado correctamente."); 
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
            <Form>
              {alertMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  {alertMessage}
                  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
              )}
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="form-floating">
                    <Field name="name" className="form-control" placeholder="Nombre del producto" />
                    <label htmlFor="name">Nombre</label>
                    <ErrorMessage name="name" component="div" className="text-danger small mt-1" />
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="form-floating">
                    <Field name="price" className="form-control" placeholder="Precio" />
                    <label htmlFor="price">Precio</label>
                    <ErrorMessage name="price" component="div" className="text-danger small mt-1" />
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="form-floating">
                    <Field name="stock" className="form-control" placeholder="Stock" />
                    <label htmlFor="stock">Stock</label>
                    <ErrorMessage name="stock" component="div" className="text-danger small mt-1" />
                  </div>
                </div>

                <div className="col-12 d-flex justify-content-between mt-4">
                  <button type="submit" className="btn btn-primary px-4">
                    {modeEdit ? 'Guardar Cambios' : 'Crear Producto'}
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4"
                    onClick={() => {
                      setModeEdit(false);
                      navigate('/productos');
                    }}
                  >
                    Ir a lista de Productos
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProductsView;
