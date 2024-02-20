import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Search from './components/Search';
import Create from './components/Create';
import Check from './components/Check';
import MyPalettes from './components/MyPalettes';
import Login from './components/Login';
import Signup from './components/Signup';
import './style_components/fonts/font.css';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <header>
          <Navbar />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/create" element={<Create />} />
            <Route path="/check" element={<Check />} />
            <Route path="/my_palettes" element={<MyPalettes />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
      </div>
    </Router>
    
  );
}

export default App;