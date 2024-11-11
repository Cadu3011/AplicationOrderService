import React, { useState, useEffect } from "react";
import axios from "axios";
import './ServiceOrder.css';
import { useNavigate } from 'react-router-dom';
import { jwtDecode  } from 'jwt-decode';

const App = () => {
  const access_token = localStorage.getItem('access_token');
  const decoded =jwtDecode (access_token)
 
  const [ordens, setOrdens] = useState([]);
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false); 
  const [editOrdem, setEditOrdem] = useState(null); 
  const [isHidden, setIsHidden] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [ordensPerPage] = useState(5); 
  const [isCreating, setIsCreating] = useState(false); 
  const [newOrdem, setNewOrdem] = useState({ description: "", status: "PENDENTE",operadores:{
    connect: [
      { id: decoded.sub }  // Conectando o operador com o ID extraído do token
    ]
  }});
  const [isProductModalOpen, setIsProductModalOpen] = useState(false); // Estado para controle do modal de produto
  const [productSearch, setProductSearch] = useState(""); // Busca de produto
  const [products, setProducts] = useState([]); // Lista de produtos buscados
  const [selectedProduct, setSelectedProduct] = useState(null); // Produto selecionado
  const [quantity, setQuantity] = useState(1); // Quantidade do produto
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false)
 
  const fetchOrdens = async () => {
    try {
      const response = await axios.get("http://localhost:4000/ordem-servico");
      setOrdens(response.data);
    } catch (error) {
      console.error("Erro ao buscar ordens:", error);
    }
  };
  
  useEffect(() => {
    fetchOrdens();
   
  }, []);
  const handleProductSelect = (product) => {
    setSelectedProduct(product); // Marca o produto como selecionado
  };
  

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/product/nome/${productSearch}`);
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const addProductToOrder = async (orderId, productId) => {
     const { id: ordemId } = editOrdem;
    if (selectedProduct && quantity > 0) {
      try {
        // Usando os IDs da ordem de serviço e do produto dinamicamente
        await axios.post(`http://localhost:4000/ordem-servico/${ordemId}/produtos/${selectedProduct.id}`, { quantidade: quantity }, {
          headers: {
            'Content-Type': 'application/json',  // Especifica que o conteúdo é JSON
          }}
      );
        setIsProductModalOpen(false); // Fecha o modal de adicionar produto
        setProductSearch(""); // Limpa a busca
        setSelectedProduct(null); // Limpa o produto selecionado
        setQuantity(1); // Reseta a quantidade
        fetchOrdens(); // Atualiza as ordens de serviço
      } catch (error) {
        console.error("Erro ao adicionar produto:", error);
      }
    } else {
      console.log("Selecione um produto válido e insira uma quantidade.");
    }
  };
  

  const openProductModal = () => {
    setIsProductModalOpen(true);
    setProductSearch("");
    setSelectedProduct(null);
  };

  const filteredOrdens = ordens.filter((ordem) =>
    ordem.description.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastOrdem = currentPage * ordensPerPage;
  const indexOfFirstOrdem = indexOfLastOrdem - ordensPerPage;
  const currentOrdens = filteredOrdens.slice(indexOfFirstOrdem, indexOfLastOrdem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const startEditing = (ordem) => {
    setEditOrdem({ ...ordem });
    setIsEditing(true);
    setIsCreating(true); // Para usar o mesmo layout de criação
  };

  const handleLogout = () => {
    navigate('/');
  };
  

  const saveEdit = async () => {
    try {
      const operadoresExistentes = editOrdem.operadores || [];  // Se não houver operadores, retorna um array vazio

      // Cria o array de operadores com o operador atual (não duplicando)
      const operadoresAtualizados = [
        ...operadoresExistentes,  // Mantém os operadores atuais
        { id: decoded.sub }  // Adiciona o operador atual
      ];
      await axios.patch(`http://localhost:4000/ordem-servico/${editOrdem.id}`, {
        status: editOrdem.status,
        description: editOrdem.description,
        operadores: {
          connect: operadoresAtualizados  // Conecta todos os operadores (os existentes + o atual)
        } // Certifique-se de salvar a descrição editada
      });
      setIsEditing(false);
      setIsCreating(false); // Fecha a tela de edição
      fetchOrdens();
    } catch (error) {
      console.error("Erro ao salvar edição:", error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditOrdem((prevState) => ({ ...prevState, [name]: value }));
  };

  const toggleVisibility = () => {
    setIsHidden((prevState) => !prevState);
  };

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setNewOrdem((prevState) => ({ ...prevState, [name]: value }));
  };

  const createOrdem = async () => {
    try {
      await axios.post("http://localhost:4000/ordem-servico", newOrdem);
      setIsCreating(false);
      setNewOrdem({ description: "", status: "PENDENTE" });
      fetchOrdens();
    } catch (error) {
      console.error("Erro ao criar ordem:", error);
    }
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
          <button className="create-btn" onClick={() => setIsCreating(true)}>
            Criar Ordem 
          </button>
        </div>
      </div>

      <div className="ordens-list">
        {currentOrdens.length > 0 ? (
          currentOrdens.map((ordem) => (
            <div className="ordem-item" key={ordem.id}>
              <div className="ordem-header">
                <h2>{ordem.description}</h2>
                <span className={`status ${ordem.status}`}>{ordem.status}</span>
                <button className="edit-btn" onClick={() => startEditing(ordem)}>
                  Editar
                </button>
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

      {/* Modal para adicionar produto */}
      {isProductModalOpen && (
        <div className="product-modal-overlay">
          <div className="product-modal">
            <h3>Adicionar Produto</h3>
            
            {/* Campo de busca de produto */}
            <input
              type="text"
              placeholder="Buscar produto"
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)} // Atualiza a busca
            />
            
            <button onClick={fetchProducts}>Buscar</button> {/* Aciona a busca */}
            
            {/* Exibe a lista de produtos */}
            {products.length > 0 && (
              <ul>
                {products.map((product) => (
                  <li
                    key={product.id}
                    onClick={() => handleProductSelect(product)} // Marca o produto como selecionado
                    className={selectedProduct && selectedProduct.id === product.id ? 'selected' : ''}
                  >
                    {product.name}
                  </li>
                ))}
              </ul>
            )}
            
            {/* Caso não tenha produto selecionado */}
            {selectedProduct && (
              <div>
                <p>Produto selecionado: {selectedProduct.name}</p>
                <input
                  type="number"
                  min="1"
                  placeholder="Quantidade"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <button onClick={addProductToOrder}>Adicionar Produto à Ordem</button>
              </div>
            )}

            <button onClick={() => setIsProductModalOpen(false)}>Cancelar</button>
          </div>
        </div>
      )}

      {/* Tela de criação e edição */}
      {(isCreating || isEditing) && (
        <div className="create-modal-overlay">
          <div className="create-modal">
            <div>
              <label>Descrição:</label>
              <input
                type="text"
                name="description"
                value={isEditing ? editOrdem.description : newOrdem.description}
                onChange={isEditing ? handleEditChange : handleCreateChange}
              />
            </div>
            <div>
              <label>Status:</label>
              <select
                name="status"
                value={isEditing ? editOrdem.status : newOrdem.status}
                onChange={isEditing ? handleEditChange : handleCreateChange}
              >
                <option value="PENDENTE">Pendente</option>
                <option value="CONFIRMED">Confirmada</option>
              </select>
            </div>
            <div>
              <button onClick={isEditing ? saveEdit : createOrdem}>
                {isEditing ? "Salvar Alterações" : "Criar Ordem"}
              </button>
              <button onClick={() => { setIsCreating(false); setIsEditing(false); }}>
                Cancelar
              </button>
            </div>
            <button onClick={openProductModal}>Adicionar Produto</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
