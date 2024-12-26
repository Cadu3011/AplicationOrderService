import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "../pages/signin/index";
import Home from "../pages/home/Home"
import HomeAdmin from "../pages/homeAdmin/HomeAdmin"
import OrdemService from "../pages/ordemService/OrdemService"
import AdminUser from "../pages/adminUser/AdminUser";
import AdminOrderService from "../pages/adminOrderService/AdminOS"
import AdminEstoque from "../pages/adminEstoque/adminProduct"
import Layout from '../components/Layout';


const Private = ({ Item }) => {
    const signed = false;

    return signed > 0 ? <Item /> : <signed/>
}

const RoutesApp = () => {
    return (
      <BrowserRouter>
        <Fragment>
          <Routes>
            {/* Página de login que não terá o MenuBar */}
            <Route path="/" element={<Signin />} />
            <Route path="/ordemService" element={<OrdemService />} />
            {/* As rotas abaixo serão renderizadas dentro do Layout, que contém o MenuBar */}
            <Route element={<Layout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/homeAdmin" element={<HomeAdmin />} />
              <Route path="/admin-user" element={<AdminUser />} />
              <Route path="/admin-os" element={<AdminOrderService />} />
              <Route path="/admin-estoque" element={<AdminEstoque />} />
              
            </Route>
          </Routes>
        </Fragment>
      </BrowserRouter>
    );
  };


export default RoutesApp;
