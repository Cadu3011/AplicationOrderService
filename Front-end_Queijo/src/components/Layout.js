import React from 'react';
import MenuBar from '../components/menuBar/SideBar'; // Componente do MenuBar
import { Outlet } from 'react-router-dom'; // Usado para renderizar o conteúdo da página de acordo com a rota

const Layout = () => {
  return (
    <div className="layout-container">
      <MenuBar /> {/* MenuBar ficará visível em todas as páginas */}
      <div className="content">
        <Outlet /> {/* Aqui o conteúdo das páginas será renderizado */}
      </div>
    </div>
  );
};

export default Layout;
