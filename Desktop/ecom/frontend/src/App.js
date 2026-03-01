import './App.css';
import Login from './login_firebse/login';
import Signup from './login_firebse/signup';
import AdminDashboard from './login_firebse/admindashboard';
import AdminRoute from './login_firebse/adminroute';
import Dashboard from './login_firebse/dashboard';
import Adizero from './Home/adizero';
import AddressPage from './Home/address';
import VerifyPurchase from './Home/verifypurchase';
import Cart from './Home/cart';
import Success from './Home/success';
import Shoes from './Home/shoes';
import Men from './otherpages/men';
import Women from './otherpages/women';
import Kids from './otherpages/kids';
import Outlet from './otherpages/outlet';
import Order from './Home/order';
import ProtectedRoute from './login_firebse/protectroute'; // Import the guard
import { Route, Routes, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes - Anyone can see these */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />


          <Route 
        path="/admin" 
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } 
      />
      
        {/* Protected Routes - Only logged-in users can see these */}
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        
        <Route path="/adizero" element={
          <ProtectedRoute><Adizero /></ProtectedRoute>
        } />
        
        <Route path="/address" element={
          <ProtectedRoute><AddressPage /></ProtectedRoute>
        } />
        <Route path="/shoes" element={
          <ProtectedRoute><Shoes /></ProtectedRoute>
        } />
        
        <Route path="/cart" element={
          <ProtectedRoute><Cart /></ProtectedRoute>
        } />
        
        <Route path="/success" element={
          <ProtectedRoute><Success /></ProtectedRoute>
        } />
        
          <Route path="/men" element={
            <ProtectedRoute><Men /></ProtectedRoute>
          } />
          <Route path="/women" element={
            <ProtectedRoute><Women /></ProtectedRoute>
          } />
          <Route path="/kids" element={
            <ProtectedRoute><Kids /></ProtectedRoute>
          } />
          <Route path="/outlet" element={
            <ProtectedRoute><Outlet /></ProtectedRoute>
          } />
       
        <Route path="/orders" element={
          <ProtectedRoute><Order /></ProtectedRoute>
        } />

        
        <Route path="/verify-purchase" element={
          <ProtectedRoute><VerifyPurchase /></ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;