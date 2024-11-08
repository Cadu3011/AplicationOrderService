import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica se o token está presente no localStorage
    const access_token = localStorage.getItem('access_token');
    console.log(access_token)
    if (access_token) {
      setIsLoggedIn(true);
    } else {
      navigate('/');  // Se não estiver logado, redireciona para o login
    }
  }, [navigate]);

  const handleLogout = () => {
    // Remove o token do localStorage e redireciona para a página de login
    localStorage.removeItem('access_token');
    navigate('/');
  };

  return (
    <div className="home-container">
      {isLoggedIn ? (
        <>
          <h1>Bem-vindo à Página Inicial!</h1>
          <p>Você está logado e pode acessar seu conteúdo aqui.</p>
          <button onClick={handleLogout}>Sair</button>
        </>
      ) : (
        <p>Redirecionando para a página de login...</p>
      )}
    </div>
  );
};

export default Home;