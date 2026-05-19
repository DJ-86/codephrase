import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { challengeAPI } from '../services/api';

export default function Challenge() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [challenge, setChallengeData] = useState(null);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const response = await challengeAPI.getChallenge(id || 'first');
        setChallengeData(response.data);
        setCode(response.data.starter_code);
      } catch (err) {
        setError('Failed to load challenge');
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [id]);

  const handleSubmit = async () => {
    // TODO: verify code here
    console.log('Submitting code:', code);
  };

  if (loading) return <p>Loading challenge...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!challenge) return <p>No challenge found</p>;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <button onClick={() => navigate('/dashboard')} style={{ marginBottom: '20px' }}>
        ← Back to Dashboard
      </button>

      <h1>{challenge.concept_title}</h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        marginBottom: '20px'
      }}>
        {/* Left side - instructions */}
        <div style={{ borderRight: '1px solid #ccc', paddingRight: '20px' }}>
          <h2>📘 Concept</h2>
          <p>{challenge.concept_description}</p>

          <h3>💡 Use Case</h3>
          <p>{challenge.use_case}</p>

          <h3>📋 Challenge</h3>
          <p>{challenge.description}</p>

          <h3>✏️ Your Task</h3>
          <p>Write code that uses <strong>.{challenge.expected_method}()</strong> to solve this.</p>
        </div>

        {/* Right side - code editor */}
        <div>
          <h3>Code Editor</h3>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{
              width: '100%',
              height: '300px',
              padding: '10px',
              fontFamily: 'monospace',
              fontSize: '14px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              marginBottom: '10px'
            }}
          />
          <button
            onClick={handleSubmit}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#1F4E78',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}