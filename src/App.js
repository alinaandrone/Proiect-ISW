import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import RegisterPage from './pages/RegisterPage';

function App() {


  return (
    <div>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        {/* <Route path='/' element={<ProtectedRoute><MainPage /></ProtectedRoute>} /> */}
{/* 
        <Route path='/login' element={<RedirectIfLoggedIn><LoginPage /></RedirectIfLoggedIn>} />
     
        <Route path="*" element={<Missing />} /> */}
      </Routes>
    </div>
  );
}

export default App;
