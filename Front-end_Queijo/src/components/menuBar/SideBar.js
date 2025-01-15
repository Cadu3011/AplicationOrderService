import React, { useState } from 'react';
import './SideBar.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const MenuBar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/');
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="menu-container">
      <button className={`hamburger-button ${isMenuOpen ? 'hidden' : ''}`} onClick={toggleMenu}>
        ➡
      </button>

      <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <button className="close-tab" onClick={toggleMenu}>✖</button>
        
        <ul>
          <li><Link to="/admin-user" className="nav-link" onClick={closeMenu}>Admin User</Link></li>
          <li><Link to="/admin-os" className="nav-link" onClick={closeMenu}>Admin OS</Link></li>
          <li><Link to="/admin-estoque" className="nav-link" onClick={closeMenu}>Admin Estoque</Link></li>
        </ul>

        <button className="to-go-out" onClick={handleLogout}>Sair</button>
      </div>
    </div>
  );
};

export default MenuBar;
