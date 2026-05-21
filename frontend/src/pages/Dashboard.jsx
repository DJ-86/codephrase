import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { progressAPI } from '../services/api';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(storedUser));

    // Fetch progress
    const fetchProgress = async () => {
      try {
        const response = await progressAPI.getUserProgress();
        setProgress(response.data);
      } catch (error) {
        console.error('Failed to fetch progress:', error);
      }
    };
    fetchProgress();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px' }}>
      <h1>CodePhrase Dashboard</h1>
      <h2>Welcome, {user.username}!</h2>

      <div style={{ marginTop: '30px' }}>
        <h3>📊 Progress</h3>
        <p>You've completed {progress?.completed || 0}/{progress?.total || 3} concepts</p>
        <div style={{
          width: '100%',
          height: '20px',
          backgroundColor: '#f0f0f0',
          borderRadius: '4px',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${progress ? (progress.completed / progress.total) * 100 : 0}%`,
            backgroundColor: '#1F4E78',
          }}></div>
        </div>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h3>🎯 Start Learning</h3>
        <button
          onClick={() => navigate('/challenge')}
          style={{
            padding: '15px 20px',
            backgroundColor: '#1F4E78',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '100%',
            fontSize: '16px',
          }}
        >
          Start First Challenge
        </button>
      </div>

      <div style={{ marginTop: '30px' }}>
        <button
          onClick={handleLogout}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}