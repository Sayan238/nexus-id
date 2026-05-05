import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IdentityPage from './pages/IdentityPage';
import ProjectsPage from './pages/ProjectsPage';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IdentityPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
