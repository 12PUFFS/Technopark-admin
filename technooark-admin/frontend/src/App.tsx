import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ItemPage from './pages/ItemPage/ItemPage';
import Header from './components/Header/Header';
// import LoginPage from './pages/LoginPage/LoginPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}></Route>
      <Route element={<HomePage />} />
      <Route path="/item" element={<ItemPage />}></Route>
    </Routes>
  );
}

export default App;
