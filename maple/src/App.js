import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MapleStoryHome from './MapleStoryHome';
import MapleStoryLogin from './MapleStoryLogin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MapleStoryHome />} />
        <Route path="/login" element={<MapleStoryLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;