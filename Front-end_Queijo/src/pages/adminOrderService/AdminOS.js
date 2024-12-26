import React, { useState, useEffect } from "react";
import axios from "axios";
import './ServiceOrder.css';
import { useNavigate } from "react-router-dom";


const OS = () => {
 
  const [ordens, setOrdens] = useState([]);
  const [search, setSearch] = useState("");
  const [isHidden, setIsHidden] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [ordensPerPage] = useState(5); 
  const navigate = useNavigate();

  const fetchOrdens = async () => {
    try {
      const response = await axios.get("http://localhost:4000/ordem-servico/OSAdm");
      setOrdens(response.data);
    } catch (error) {
      console.error("Erro ao buscar ordens:", error);
    }
  };
  
  useEffect(() => {
    fetchOrdens();
  }, []);


  const filteredOrdens = ordens.filter((ordem) =>
    ordem.description.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastOrdem = currentPage * ordensPerPage;
  const indexOfFirstOrdem = indexOfLastOrdem - ordensPerPage;
  const currentOrdens = filteredOrdens.slice(indexOfFirstOrdem, indexOfLastOrdem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleVisibility = () => {
    setIsHidden((prevState) => !prevState);
  };


  const handleLogout = () => {
    navigate('/homeAdmin');
  };
  
  return (
    <div className="container">
      <h1>Ordem de Serviço</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar ordens"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="button-container">
          <button onClick={() => fetchOrdens()}>Buscar</button>
        </div>
      </div>

      <div className="ordens-list">
        {currentOrdens.length > 0 ? (
          currentOrdens.map((ordem) => (
            <div className="ordem-item" key={ordem.id}>
              <div className="ordem-header">
             
                <h2>{ordem.description}</h2>

                <span className={`status ${ordem.status}`}>
                  {ordem.status}
                </span>
                <div className="button-group">
          </div>
              </div>
              <div className="operadores">
                <strong>Operadores:</strong>
                {isHidden ? null : (
                  ordem.operadores.map((op) => <p key={op.id}>{op.name}</p>)
                )}
              </div>
              <div className="produtos">
                <strong>Produtos:</strong>
                {isHidden ? null : (
                  <ul>
                    {ordem.estoques.map((estoque) => (
                      <li key={estoque.id}>
                        <span>{estoque.produto.name}</span>
                        <span className="quantity">{estoque.quantidade}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="produtos">
                <strong>Pagamento:</strong>
                {isHidden ? null : (
                  <ul>
                    {ordem.payment.map((payment) => (
                      <li key={payment.id}>
                        <span>{payment.modalidade}</span>
                        <span className="quantity">{payment.valor}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="no-ordens">Nenhuma ordem encontrada</div>
        )}
      </div>

      <button className="toggle-btn" onClick={toggleVisibility}>
        {isHidden ? "Mostrar Operadores e Produtos" : "Ocultar Operadores e Produtos"}
      </button>

      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredOrdens.length / ordensPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={index + 1 === currentPage ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <button className="btn-voltar" onClick={handleLogout}>Voltar</button>
    </div>
  );
};

export default OS;
