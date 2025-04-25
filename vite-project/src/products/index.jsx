import { Routes, Route } from 'react-router-dom';
import ProductProvider from './ProductsProvider';
import ProductsView from './ProductsView';
import ProductsForm from './ProductsForm';

const ProductRoutes = () => {
  return (
    <ProductProvider>
      <Routes>
          <Route path="/" element={<ProductsView />} />
          <Route path="/editar/:id" element={<ProductsForm />} />
          <Route path="/form" element={<ProductsForm />} /> 
      </Routes>
    </ProductProvider>
  );
};

export default ProductRoutes;
