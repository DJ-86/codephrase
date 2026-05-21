import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { progressAPI, conceptAPI } from '../services/api';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(null);
  const [concepts, setConcepts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(storedUser));

    const fetchData = async () => {
      try {
        const progressResponse = await progressAPI.getUserProgress();
        setProgress(progressResponse.data);

        const conceptsResponse = await conceptAPI.getAllConcepts();
        setConcepts(conceptsResponse.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: '1000px', margin: '50px auto', padding: '20px' }}>
      <h1>CodePhrase Dashboard</h1>
      <h2>Welcome, {user.username}!</h2>

      <div style={{ marginTop: '30px' }}>
        <h3>📊 Progress</h3>
        <p>You've completed {progress?.completed || 0}/{progress?.total || 12} concepts</p>
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

      <div style={{ marginTop: '40px' }}>
        <h3>🎯 Concepts</h3>
        {loading ? (
          <p>Loading concepts...</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {concepts.map((concept) => (
              <div
                key={concept.id}
                onClick={() => navigate(`/concept/${concept.slug}`)}
                style={{
                  padding: '20px',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  border: '2px solid #ddd',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e8e8e8'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
              >
                <h4>{concept.title}</h4>
                <p style={{ fontSize: '14px', color: '#666' }}>{concept.description}</p>
                <p style={{ fontSize: '12px', color: '#999' }}>Difficulty: {concept.difficulty}</p>
              </div>
            ))}
          </div>
        )}
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