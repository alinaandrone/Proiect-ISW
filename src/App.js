import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';

function App() {


  return (
    <div>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        {/* <Route path='/' element={<ProtectedRoute><MainPage /></ProtectedRoute>} /> */}
{/* 
        <Route path='/login' element={<RedirectIfLoggedIn><LoginPage /></RedirectIfLoggedIn>} />
     
        <Route path="*" element={<Missing />} /> */}
      </Routes>
    </div>
  );
}

export default App;
