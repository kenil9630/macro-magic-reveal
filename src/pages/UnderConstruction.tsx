import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UnderConstruction() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to VBA section after 3 seconds
    const timer = setTimeout(() => {
      navigate('/vba');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Under Construction</h1>
        <p className="text-gray-600 mb-4">This page is currently being built.</p>
        <p className="text-gray-500">Redirecting to VBA section...</p>
      </div>
    </div>
  );
} 