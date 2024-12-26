import React, { useState, useEffect } from "react";
import axios from "axios";
import './ServiceOrder.css';
import { useNavigate } from 'react-router-dom';
import { jwtDecode  } from 'jwt-decode';

const App = () => {
  const access_token = localStorage.getItem('access_token');
  const decoded = jwtDecode(access_token)
 
  const [ordens, setOrdens] = useState([]);
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false); 
  const [editOrdem, setEditOrdem] = useState(null); 
  const [isHidden, setIsHidden] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [ordensPerPage] = useState(5); 
  const [isCreating, setIsCreating] = useState(false); 
  const [newOrdem, setNewOrdem] = useState({ description: "", status: "PENDENTE", operadores:{
    connect: [
      { id: decoded.sub }  // Conectando o operador com o ID extraído do token
    ]
  }});
  const [isProductModalOpen, setIsProductModalOpen] = useState(false); 
  const [productSearch, setProductSearch] = useState(""); 
  const [products, setProducts] = useState([]); 
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [quantity, setQuantity] = useState(1); 
  const navigate = useNavigate();
  const [paymentValue, setPaymentValue] = useState(""); 
  const [paymentMethod, setPaymentMethod] = useState(""); 
  const [showPaymentForm, setShowPaymentForm] = useState(false); // Estado para controle do formulário de pagamento

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
    setSelectedProduct(product); 
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/product/nome/${productSearch}`);
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const addProductToOrder = async () => {
    const { id: ordemId } = editOrdem;
    if (selectedProduct && quantity > 0) {
      try {
        await axios.post(`http://localhost:4000/ordem-servico/${ordemId}/produtos/${selectedProduct.id}`, { quantidade: quantity });
        setIsProductModalOpen(false);
        setProductSearch("");
        setSelectedProduct(null);
        setQuantity(1);
        fetchOrdens();
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

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    if (name === "valor") {
      setPaymentValue(value);
    } else if (name === "modalidade") {
      setPaymentMethod(value);
    }
  };

  const saveEdit = async () => {
   
      // Criar o objeto de pagamento
      if(showPaymentForm === true){const paymentData = {
        valor: Number(paymentValue),  // Garantir que o valor seja um número
        modalidade: paymentMethod,
        ordemId: editOrdem.id,
      };
  
      try {
        // Enviar o pagamento para a API
        const response = await fetch("http://localhost:4000/payment", {
          method: "POST", // Método de requisição
          headers: {
            "Content-Type": "application/json", // Enviar dados em formato JSON
          },
          body: JSON.stringify(paymentData), // Converte os dados para JSON
        });
  
        // Verificar se a requisição foi bem-sucedida
        if (response.ok) {
          const result = await response.json(); // Opcional: pegar resposta da API
          console.log("Pagamento salvo:", result);
          setShowPaymentForm(false); // Fechar o formulário de pagamento
        } else {
          throw new Error("Erro ao salvar o pagamento");
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
      }
    try {
      const operadoresExistentes = editOrdem.operadores || [];
      const produtosExistentes = editOrdem.estoques || []; // Produtos existentes (estoques)
  
      const operadoresAtualizados = [
        ...operadoresExistentes.map(op => ({ id: op.id })), 
        { id: decoded.sub } 
      ];
      const updateData = {
        status: editOrdem.status,
        description: editOrdem.description,
        operadores: {
          connect: operadoresAtualizados, 
        },
      };
  
      if (produtosExistentes.length > 0) {
        const produtosAtualizados = produtosExistentes.filter(estoque => estoque.id).map(estoque => ({ id: estoque.id }));
        updateData.estoques = {
          connect: produtosAtualizados, 
        };
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        }
      };

      const edit = await axios.patch(`http://localhost:4000/ordem-servico/${editOrdem.id}`, updateData, config);
  
      console.log("Ordem de serviço editada:", edit);
      setIsEditing(false);
      setIsCreating(false);
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
      const response = await axios.post("http://localhost:4000/ordem-servico", newOrdem);
      const novaOrdem = response.data;
      setNewOrdem({ description: "", status: "PENDENTE" });
      setEditOrdem(novaOrdem); 
      setIsCreating(false);
      setIsEditing(true); 
      fetchOrdens(); 
    } catch (error) {
      console.error("Erro ao criar ordem:", error);
    }
  };

  const handlePaymentFormToggle = () => {
    setShowPaymentForm(prevState => !prevState);
  };

  const handleLogout = () => {
    navigate('/');
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

                <span className={`status ${ordem.status}`}>
                  {ordem.status}
                </span>
                <div className="button-group">
            <button className="edit-btn" onClick={() => startEditing(ordem)}>
              Editar
            </button>
            {ordem.status === "CONFIRMED" && !showPaymentForm && (
              <button className="edit-btn" onClick={handlePaymentFormToggle}>
                FINALIZAR
              </button>
            )}
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
            <input
              type="text"
              placeholder="Buscar produto"
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
            />
            <button onClick={fetchProducts}>Buscar</button>
            {products.length > 0 && (
              <ul>
                {products.map((product) => (
                  <li
                    key={product.id}
                    onClick={() => handleProductSelect(product)}
                    className={selectedProduct && selectedProduct.id === product.id ? 'selected' : ''}
                  >
                    {product.name}
                  </li>
                ))}
              </ul>
            )}
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
            {isEditing && (
              <button onClick={openProductModal}>Adicionar Produto</button>
            )}
          </div>
        </div>
      )}
      {showPaymentForm && (
                <div className="create-modal-overlay">
                  <div className="create-modal">
                  <label>Valor:</label>
                  <input
                    type="number"
                    name="valor"
                    value={paymentValue}
                    onChange={handlePaymentChange}
                    required
                  />
                  <label>Modalidade de Pagamento:</label>
                  <select
                    name="modalidade"
                    value={paymentMethod}
                    onChange={handlePaymentChange}
                    required
                  >
                    <option value="">Selecione...</option>
                    <option value="DINHEIRO">Dinheiro</option>
                    <option value="CREDITO">Credito</option>
                    <option value="PARCELADO">Parcelado</option>
                    <option value="DEBITO">Debito</option>
                    <option value="PIX">Pix</option>
                  </select>
                  <button onClick={saveEdit}>Salvar Pagamento</button>
                  <button onClick={() => { setShowPaymentForm(false)}}>
                Cancelar
              </button>
                </div>
              </div>
              )}
    </div>
  );
};

export default App;
