import { useState } from "react";
import { useNavigate} from 'react-router-dom';
import { authAPI} from '../services/api';

export default function Login () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await authAPI.login(email, password);
            const {user, token } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            navigate ('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed' );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style ={{ maxWidth: '400px', margin: '100px auto', padding: '20px' }}>
            <h1>CodePhrase</h1>
            <h2>Login</h2>

            {error && <p style = {{ color: 'red'}}>{error}</p>}

            <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#1F4E78',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p>
        Don't have an account? <a href="/register">Sign up</a>
      </p>
    </div>
  );
}

