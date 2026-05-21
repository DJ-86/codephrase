import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { conceptAPI } from '../services/api';

export default function ConceptDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [concept, setConcept] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConcept = async () => {
      try {
        const conceptsResponse = await conceptAPI.getAllConcepts();
        const found = conceptsResponse.data.find(c => c.slug === slug);
        setConcept(found);

        const challengesResponse = await conceptAPI.getChallengesByConcept(slug);
        setChallenges(challengesResponse.data);
      } catch (error) {
        console.error('Failed to fetch:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConcept();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (!concept) return <p>Concept not found</p>;

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px' }}>
      <button onClick={() => navigate('/dashboard')} style={{ marginBottom: '20px' }}>
        ← Back to Dashboard
      </button>

      <h1>{concept.title}</h1>
      <p>{concept.description}</p>
      <p style={{ fontSize: '14px', color: '#666' }}>Difficulty: {concept.difficulty}</p>

      <h2 style={{ marginTop: '30px' }}>Challenges ({challenges.length})</h2>
      <div style={{ display: 'grid', gap: '15px' }}>
        {challenges.map((challenge, index) => (
          <div
            key={challenge.id}
            onClick={() => navigate(`/challenge/${challenge.id}`)}
            style={{
              padding: '15px',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
              cursor: 'pointer',
              border: '1px solid #ddd',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e8e8e8'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
          >
            <h4>{index + 1}. {challenge.title}</h4>
            <p style={{ fontSize: '14px', color: '#666' }}>{challenge.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}