import { Navigate, Route, Routes } from 'react-router-dom';
import { useMemo, useState } from 'react';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Challenges from './pages/Challenges';
import Students from './pages/Students';
import Services from './pages/Services';
import Feedback from './pages/Feedback';
import Settings from './pages/Settings';
import Admin from './pages/Admin';

import { api, saveAuth, clearAuth } from './services/api';

function canSeeAdmin(role) {
  return role === 'admin' || role === 'trainer';
}

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('trainforge_user');
    return saved ? JSON.parse(saved) : null;
  });

  const isAuthenticated = useMemo(() => Boolean(user), [user]);

  const onAuth = (authPayload) => {
    setUser(authPayload.user);
    saveAuth(authPayload);
  };

  const onLogout = async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // no-op
    } finally {
      setUser(null);
      clearAuth();
    }
  };

  if (!isAuthenticated) {
    return <Home onAuth={onAuth} />;
  }

  return (
    <div className="tf-shell">
      <Sidebar role={user.role} />
      <div className="tf-content">
        <Header user={user} onLogout={onLogout} />
        <main className="container-fluid py-4">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="/challenges" element={<Challenges user={user} />} />
            <Route path="/services" element={<Services user={user} />} />
            <Route path="/students" element={<Students user={user} />} />
            <Route path="/feedback" element={<Feedback user={user} />} />
            <Route path="/settings" element={<Settings user={user} onUserUpdate={setUser} />} />
            <Route
              path="/admin"
              element={canSeeAdmin(user.role) ? <Admin /> : <Navigate to="/dashboard" replace />}
            />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}
