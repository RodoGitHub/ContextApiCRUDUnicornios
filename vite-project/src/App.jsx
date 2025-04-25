import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalProvider from './context/GlobalProvider';
import UnicornRoutes from './unicorns/index';
import ProductRoutes from './products/index';

function App() {
  return (
    <Router>
      <GlobalProvider>
        <Routes>
          <Route path="/*" element={<UnicornRoutes />} />
          <Route path="/productos/*" element={<ProductRoutes />} />
        </Routes>
      </GlobalProvider>
    </Router>
  );
}

export default App;
