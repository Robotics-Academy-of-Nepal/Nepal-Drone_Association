import "./App.css";
import Homepage from "./Homepage";
import MembershipForm from "./MemberShip";
import { Routes, Route } from "react-router-dom"; // Remove BrowserRouter import
import About from "./About";
import Login from "./Login";
import TeamPage from "./Team";
import NewsList from "./News";
import UserList from "./UserData";
import ImageUploadManager from "./GalleryUpload";
import ImageGallery from "./GalleryDisplay";
import Homepage2 from "./Admin";
import Slider from "./Slider3";
import AdminNews from "./AdminNews";
import GalleryGrid from "./GalleryGrid";
import NewsGrid from "./NewsGrid";
import AdminNewsGrid from "./AdminNewsGrid";
import AdminGalleryGrid from "./AdminGalleryGrid";

import NewsAndEventForm from "./NewsAndEventForm";
import GalleryForm from "./GalleryForm";
import AddOrganization from "./AddOrganization";
import AddExecutiveMember from "./AddExecutiveMember";
import AddGeneralMembers from "./AddGeneralMembers";
import AdminRoute from "./routes/AdminRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<ImageGallery />} />
        <Route path="/gallery1" element={<GalleryGrid />} />
        <Route path="/member" element={<MembershipForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/admin" element={<Homepage2 />} />
        <Route path="/admindashboard" element={<UserList />} />
        <Route path="/newslist" element={<NewsList />} />
        <Route path="/newslist1" element={<NewsGrid />} />
        <Route path="/adminnewslist" element={<AdminNewsGrid />} />
        <Route path="/admingallerylist" element={<AdminGalleryGrid />} />
        <Route path="/slider" element={<Slider />} />
        <Route path="/galleryupload" element={<ImageUploadManager />} />
        <Route path="/AdminNews" element={<AdminNews />} />
        <Route path="*" element={<div>Page not found</div>} />

        <Route
          path="/AddNewsEvents"
          element={
            <AdminRoute>
              <NewsAndEventForm />
            </AdminRoute>
          }
        />
        <Route
          path="/AddGallery"
          element={
            <AdminRoute>
              <GalleryForm />
            </AdminRoute>
          }
        />
        <Route
          path="/add_organization"
          element={
            <AdminRoute>
              <AddOrganization />
            </AdminRoute>
          }
        />
        <Route
          path="/add_general_member"
          element={
            <AdminRoute>
              <AddGeneralMembers />
            </AdminRoute>
          }
        />
        <Route
          path="/add_executive_member"
          element={
            <AdminRoute>
              <AddExecutiveMember />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
