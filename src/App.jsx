import './App.css';
import Homepage from './Homepage';
import Gallery from './Gallery/Gallery';
import MembershipForm from './MemberShip';
import { Routes, Route } from 'react-router-dom';  // Remove BrowserRouter import
import About from './About';
import Login from './Login';
import TeamPage from './Team';
import AdminPanel from './Admin';
import AdminDashboard from './UserData';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/member" element={<MembershipForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </>
  )
}

export default App