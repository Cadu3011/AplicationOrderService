import React, { useState } from 'react';
import './SideBar.css'; 
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// não mexe nas rotas

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
      
      <button className="hamburger-button" onClick={toggleMenu}>
        {isMenuOpen ? '✖' : '☰'} 
      </button>

      
      <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        
        <button className="close-tab" onClick={toggleMenu}>
          ✖ 
        </button>
        <br></br>
        <h2></h2>
        <h2></h2>
        
        
        <ul>
          <li><Link to="/admin-user" className="nav-link" onClick={closeMenu}>Admin User</Link></li>
          <br></br>
          <li><Link to="/admin-os" className="nav-link" onClick={closeMenu}>Admin OS</Link></li>
          <br></br>
          <li><Link to="/admin-estoque" className="nav-link" onClick={closeMenu}>Admin Estoque</Link></li>
        </ul>

        <button className='to-go-out' onClick={handleLogout}>Sair</button>
      


      </div>
    </div>
  );
};

export default MenuBar;