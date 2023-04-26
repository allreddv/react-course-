import './index.css';
import Employee from './components/Employee';
import Header from './components/Header';
import Employees from './pages/Employees';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Customers from './pages/Customers';
import Dictionary from './components/Dictionary';
import Definition from './pages/Definition';
import NotFound from './components/NotFound';
import Customer from './pages/customer';

function App() {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path="/employees" element={<Employees />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/:id" element={<Customer />} />
          <Route path="/dictionary" element={<Dictionary />} />
          <Route path="/definition" element={<Definition />} />
          <Route path="/definition/:search" element={<Definition />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Header>
    </BrowserRouter>
  );
}

export default App;
