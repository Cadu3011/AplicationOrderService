import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "../pages/signin/index";
import Home from "../pages/home/Home"
import HomeAdmin from "../pages/homeAdmin/HomeAdmin"
import OrdemService from "../pages/ordemService/OrdemService"
import AdminUser from "../pages/adminUser/AdminUser";
import AdminEstoque from "../pages/adminEstoque/adminProduct"
const Private = ({ Item }) => {
    const signed = false;

    return signed > 0 ? <Item /> : <signed/>
}

const RoutesApp = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Routes>
          <Route path="/" element={<Signin />} />  {/* Página de login padrão */}
          <Route path="/home" element={<Home />} />  {/* A rota para Home */}
          <Route path="/admin-user" element={<AdminUser />} />
          {/* <Route path="/admin-os" element={<AdminOS />} /> */}
          <Route path="/admin-estoque" element={<AdminEstoque />} />
          <Route path="/homeAdmin" element={<HomeAdmin />} />
          <Route path="/ordemService" element={<OrdemService />} />
                </Routes>
            </Fragment>
        </BrowserRouter>
    );
}; 


export default RoutesApp;
