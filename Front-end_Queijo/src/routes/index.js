import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "../pages/signin/index";
import Home from "../pages/home/Home"

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
                </Routes>
            </Fragment>
        </BrowserRouter>
    );
}; 


export default RoutesApp;
