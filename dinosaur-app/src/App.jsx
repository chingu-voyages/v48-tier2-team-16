import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DinosaurProvider } from "./context/DinosaurContext";
import DinosaurList from './components/DinosaurList';
import DinosaurDetails from './components/DinosaurDetails';
import Header from './components/Header'

function App() {
  return (
    <div>
    <Header />
    <Router>
      <DinosaurProvider>
        <Routes>
          <Route path="/" element={<DinosaurList />} />
          <Route path="details/:id" element={<DinosaurDetails />} />
        </Routes>
      </DinosaurProvider>
    </Router>
    </div>
  );
}

export default App;
