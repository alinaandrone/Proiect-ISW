import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

function App() {


  return (
    <div>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        {/* <Route path='/' element={<ProtectedRoute><MainPage /></ProtectedRoute>} /> */}
{/* 
        <Route path='/login' element={<RedirectIfLoggedIn><LoginPage /></RedirectIfLoggedIn>} />
     
        <Route path="*" element={<Missing />} /> */}
      </Routes>
    </div>
  );
}

export default App;
