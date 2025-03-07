import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';
import { AuthProvider } from './context/AuthContext';
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <AppRoutes />
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
