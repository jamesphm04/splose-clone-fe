import { ConfigProvider } from 'antd';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer, Bounce } from 'react-toastify';
import { AuthProvider } from './contexts/AuthContext';
import Auth from './pages/auth/Auth';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Dashboard from './pages/dashboard/Dashboard';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/molecules/layout/Layout';
import Patients from './pages/patients/Patients';
import { NewPatient } from './pages/patients/new/NewPatient';
import { Details } from './pages/patients/id/details/Details';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '8250ff',
          borderRadius: 6,
        },
      }}
    >
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Auth />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route path="/patients" element={
              <ProtectedRoute>
                <Layout>
                  <Patients />
                </Layout>
              </ProtectedRoute>}
            />
            <Route path="/patients/:id/details" element={
              <ProtectedRoute>
                <Layout>
                  <Details />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/patients/new" element={
              <ProtectedRoute>
                <Layout>
                  <NewPatient />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </ConfigProvider>
  )
}

export default App
