import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import AllProjects from './pages/AllProjects';
import AllCertificates from './pages/AllCertificates';
import { trackVisit } from './utils/api';

function App() {
  useEffect(() => {
    // Track page visit
    const track = async () => {
      try {
        await trackVisit();
      } catch (error) {
        console.error('Failed to track visit:', error);
      }
    };
    track();
  }, []);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1f2937',
            color: '#fff',
            border: '1px solid #374151',
          },
          success: {
            iconTheme: {
              primary: '#8B5CF6',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<AllProjects />} />
          <Route path="/certificates" element={<AllCertificates />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
