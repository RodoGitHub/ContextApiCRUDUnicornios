import { Routes, Route } from 'react-router-dom';
import UnicornsProvider from './UnicornsProvider';
import UnicornsView from './UnicornsView';
import UnicornsForm from "./UnicornsForm"

const UnicornRoutes = () => {
  return (
    <UnicornsProvider> 
      <Routes>
            <Route path="/" element={<UnicornsView />} />
            <Route path="/editar/:id" element={<UnicornsForm />} />
            <Route path="/form" element={<UnicornsForm />} /> 
      </Routes>
    </UnicornsProvider>
  );
};

export default UnicornRoutes;