
import './App.css'
import Homepage from './Homepage'
import Gallery from './Gallery/Gallery'
import { Routes, Route } from 'react-router-dom'  // Remove BrowserRouter import

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<Homepage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/member" element={<Homepage />} />
        <Route path="/login" element={<Homepage />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </>
  )
}

export default App