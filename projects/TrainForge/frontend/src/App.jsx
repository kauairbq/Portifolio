import { Navigate, Route, Routes } from 'react-router-dom';
import { useMemo, useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Challenges from './pages/Challenges';
import Students from './pages/Students';
import Feedback from './pages/Feedback';
import Settings from './pages/Settings';

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('trainforge_user');
    return saved ? JSON.parse(saved) : null;
  });

  const isAuthenticated = useMemo(() => Boolean(user), [user]);

  const onAuth = (authPayload) => {
    setUser(authPayload.user);
    localStorage.setItem('trainforge_user', JSON.stringify(authPayload.user));
    localStorage.setItem('trainforge_access_token', authPayload.accessToken);
    localStorage.setItem('trainforge_refresh_token', authPayload.refreshToken);
  };

  const onLogout = () => {
    setUser(null);
    localStorage.removeItem('trainforge_user');
    localStorage.removeItem('trainforge_access_token');
    localStorage.removeItem('trainforge_refresh_token');
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
            <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="/challenges" element={<Challenges user={user} />} />
            <Route path="/students" element={<Students user={user} />} />
            <Route path="/feedback" element={<Feedback user={user} />} />
            <Route path="/settings" element={<Settings user={user} />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

