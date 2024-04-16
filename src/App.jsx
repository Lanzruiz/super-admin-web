import {
  Routes,
  Route,
  Navigate,
  BrowserRouter as Router,
} from 'react-router-dom';
import { Dashboard, Auth, Violation } from '@/layouts';
import { AuthProvider } from './context/AuthContext';
import Admin from './layouts/admin';
import ViolationAdmin from './layouts/violation-admin';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
        <Route path="/violation/*" element={<Violation />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/violation-admin/*" element={<ViolationAdmin />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
