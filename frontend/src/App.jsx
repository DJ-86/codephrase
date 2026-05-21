import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Challenge from './pages/Challenge';
import ConceptDetail from './pages/ConceptDetail';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/challenge/:id" element={<Challenge />} />
        <Route path="/challenge" element={<Challenge />} />
        2<Route path="/concept/:slug" element={<ConceptDetail />} />
      </Routes>
    </Router>
  );
}

export default App
