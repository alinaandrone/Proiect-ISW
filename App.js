import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import RegisterPage from './pages/RegisterPage';
import { useAuth } from './context/useAuth';
import NotePage from './pages/NotePage';

function ProtectedRoute({ element, role, ...rest }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role.role_name !== role) {
    return <Navigate to="/" />;
  }

  return element;
}

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<ProtectedRoute element={<MainPage />} />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/note' element={<ProtectedRoute element={<NotePage />} role="teacher" />} />
        <Route path='/register' element={<ProtectedRoute element={<RegisterPage />} role="admin" />} />
      </Routes>
    </div>
  );
}

export default App;