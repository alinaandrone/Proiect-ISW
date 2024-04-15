import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import RegisterPage from './pages/RegisterPage';
import { useAuth } from './context/useAuth';
import NotePage from './pages/NotePage';

function App() {
  const { user } = useAuth()

  return (
    <div>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        {user?.role?.role_name === 'admin' && <Route path='/register' element={<RegisterPage />} />}
        {user?.role?.role_name === 'teacher' && <Route path='/note' element={<NotePage />} />}
        {/* <Route path='/' element={<ProtectedRoute><MainPage /></ProtectedRoute>} /> */}
{/* 
        <Route path='/login' element={<RedirectIfLoggedIn><LoginPage /></RedirectIfLoggedIn>} />
     
        <Route path="*" element={<Missing />} /> */}
      </Routes>
    </div>
  );
}

export default App;
