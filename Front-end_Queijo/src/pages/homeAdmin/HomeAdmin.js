import React from 'react';
import {  Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './apps.css'; // Importa o arquivo CSS para o estilo

function App() {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Remove o token do localStorage e redireciona para a página de login
    localStorage.removeItem('access_token');
    navigate('/');
  };
  return (
   
      <div className="app-container">
        
          
          <button onClick={handleLogout}>Sair</button>
        
        <nav className="navigation">
          <button className="nav-button">
            <Link to="/admin-user" className="nav-link">Admin User</Link>
          </button>
          <button className="nav-button">
            <Link to="/admin-os" className="nav-link">Admin OS</Link>
          </button>
          <button className="nav-button">
            <Link to="/admin-estoque" className="nav-link">Admin Estoque</Link>
          </button>
        </nav>
      </div>
    
  );
}

export default App;
