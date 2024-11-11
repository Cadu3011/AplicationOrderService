import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode  } from 'jwt-decode';


const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica se o token está presente no localStorage
    const access_token = localStorage.getItem('access_token');
    console.log(access_token)
    if (access_token) {
      setIsLoggedIn(true);
      const decoded =jwtDecode (access_token)
      console.log(decoded)
      if(decoded.roles === "ADMIN"){
        navigate('/homeAdmin')
      }else if(decoded.roles === "OPERATOR"){
        navigate('/ordemService')
      }
    } else {
      navigate('/');  // Se não estiver logado, redireciona para o login
    }
  }, [navigate]);

  return (
    <div className="home-container">
      
    </div>
  );
};

export default Home;