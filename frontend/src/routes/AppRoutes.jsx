import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ServiceListPage from '../pages/ServiceListPage';
import ServiceDetailPage from '../pages/ServiceDetailPage';
import DashboardUser from '../pages/DashboardUser';
import DashboardProfessional from '../pages/DashboardProfessional';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/services" element={<ServiceListPage />} />
      <Route path="/services/:id" element={<ServiceDetailPage />} />
      <Route path="/dashboard/user" element={<DashboardUser />} />
      <Route path="/dashboard/professional" element={<DashboardProfessional />} />
    </Routes>
  );
};

export default AppRoutes;
