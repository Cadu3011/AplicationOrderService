import React from 'react';
import MenuBar from '../components/menuBar/SideBar'; 
import { Outlet } from 'react-router-dom'; 

const Layout = () => {
  return (
    <div className="layout-container">
      <MenuBar /> 
      <div className="content">
        <Outlet /> 
      </div>
    </div>
  );
};

export default Layout;