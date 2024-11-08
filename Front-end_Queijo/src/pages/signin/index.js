// src/components/Signin.js
import React, { useState } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const [name, setname] = useState('');
  const [pasword, setPasword] = useState('');  
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const credentials = {
      name,
      pasword  
    };

    try {
      const response = await fetch('https://2bbc-177-67-172-52.ngrok-free.app/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });

      console.log(credentials)
      const data = await response.json();
      console.log('Response:', response);
      console.log('Data:', data);

      if (response.ok) {
        console.log(data.access_token)
        // Sucesso! Salve o JWT, por exemplo, em localStorage
        localStorage.setItem('access_token', data.access_token);
        alert('Login bem-sucedido!');
        navigate('../home');
        // Redirecionar ou atualizar o estado da aplicação conforme necessário
      } else {
        setError(data.message || 'Erro ao fazer login');
      }
    } catch (error) {
      setError('Erro de conexão. Tente novamente mais tarde.');
    }
  };

  return (
    <div className="signin-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Usuário</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={pasword}  // Corrigido para password
            onChange={(e) => setPasword(e.target.value)}  // Corrigido para setPassword
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Signin;