// import { useState } from 'react';
// import { LandingPage } from './components/LandingPage';
// import { Dashboard } from './components/Dashboard';
// import { SettingsPage } from './components/SettingsPage';

// export type Page = 'landing' | 'dashboard' | 'settings';

// export default function App() {
//   const [currentPage, setCurrentPage] = useState<Page>('landing');

//   return (
//     <div className="min-h-screen bg-[#F9FAFB]">
//       {currentPage === 'landing' && (
//         <LandingPage onGetStarted={() => setCurrentPage('dashboard')} />
//       )}
//       {currentPage === 'dashboard' && (
//         <Dashboard onNavigate={setCurrentPage} />
//       )}
//       {currentPage === 'settings' && (
//         <SettingsPage onNavigate={setCurrentPage} />
//       )}
//     </div>
//   );
// }

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { SettingsPage } from './components/SettingsPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#F9FAFB]">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
