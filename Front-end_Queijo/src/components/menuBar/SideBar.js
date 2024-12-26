import React from 'react';
import './SideBar.css'; // Importando o arquivo de CSS
import {  Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const MenuBar = () => {
  const navigate = useNavigate();
    const handleLogout = () => {
      // Remove o token do localStorage e redireciona para a página de login
      localStorage.removeItem('access_token');
      navigate('/');
    };
  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <button onClick={handleLogout}>Sair</button>
      <ul>
        <li> <Link to="/admin-user" className="nav-link">Admin User</Link></li>
        <li><Link to="/admin-os" className="nav-link">Admin OS</Link></li>
        <li><Link to="/admin-estoque" className="nav-link">Admin Estoque</Link></li>
      </ul>
    </div>
  );
};

export default MenuBar;