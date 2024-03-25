import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DinosaurProvider } from "./context/DinosaurContext";
import DinosaurList from './components/DinosaurList';
import DinosaurDetails from './components/DinosaurDetails';

function App() {
  return (
    <Router>
      <DinosaurProvider>
        <Routes>
          <Route path="/" element={<DinosaurList />} />
          <Route path="details/:id" element={<DinosaurDetails />} />
        </Routes>
      </DinosaurProvider>
    </Router>
  );
}

export default App;
