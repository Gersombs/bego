
import React, { useState } from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import OrderList from './pages/OrderList';
import './index.css';

function App() {
  // Estado para la pestaña activa
  const [activeTab, setActiveTab] = useState('upcoming');
  // Estado para la búsqueda
  const [searchQuery, setSearchQuery] = useState('');

  // Cuando el usuario cambie de pestaña
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Cuando el usuario escriba en el buscador
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="App">
      <div className="main-container">
        <Header />
        <Navbar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onSearch={handleSearch}
        />
        <OrderList
          activeTab={activeTab}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
}

export default App;
