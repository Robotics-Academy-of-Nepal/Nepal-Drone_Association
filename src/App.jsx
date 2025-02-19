import './App.css';
import Homepage from './Homepage';
import MembershipForm from './MemberShip';
import { Routes, Route } from 'react-router-dom';  // Remove BrowserRouter import
import About from './About';
import Login from './Login';
import TeamPage from './Team';
import NewsList from './News';
import UserList from './UserData';
import ImageUploadManager from './GalleryUpload';
import ImageGallery from './GalleryDisplay';
import Homepage2 from './Admin';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<ImageGallery />} />
        <Route path="/member" element={<MembershipForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/admin" element={<Homepage2 />} />
        <Route path="/admindashboard" element={<UserList />} />
        <Route path="/newslist" element={<NewsList />} />
        <Route path="/galleryupload" element={<ImageUploadManager />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </>
  )
}

export default App