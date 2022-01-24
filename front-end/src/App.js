import './App.css';
import HomePage from './HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (  
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
      </Routes> 
    </BrowserRouter>
  );
}

export default App;