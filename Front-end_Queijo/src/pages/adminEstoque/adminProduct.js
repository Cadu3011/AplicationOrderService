import React, { useState, useEffect } from "react";
import axios from "axios";
import './adminProduct.css';
import { useNavigate } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [productForm, setProductForm] = useState({ name: "", price: "", quantity: "", isActive: true });
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;
  
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/product");
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const openModalForEdit = (product) => {
    setProductForm({ ...product });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const openModalForCreate = () => {
    setProductForm({ name: "", price: "", quantity: "", isActive: true });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const saveProduct = async () => {
    try {
      if (isEditing) {
        await axios.patch(`http://localhost:4000/product/${productForm.id}`, {
          name: productForm.name,
          price: productForm.price,
          quantity: productForm.quantity,
          isActive: productForm.isActive,
        });
      } else {
        await axios.post("http://localhost:4000/product", productForm);
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    if (name === "isActive") {
    setProductForm((prevState) => ({
      ...prevState,
      [name]: value === "true", // Converte a string "true" ou "false" para booleano
    }));
  } else {
    setProductForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  };

  const handleLogout = () => {
    navigate('/homeAdmin');
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container">
      <h1>Produtos</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar produtos"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="create-btn" onClick={openModalForCreate}>
          Criar Produto
        </button>
      </div>

      <div className="products-list">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <div className="product-item" key={product.id}>
              <div className="product-header">
                <h2>{product.name}</h2>
                <span className="price">R$ {product.price}</span>
                <span className="quantity">{product.quantity} unidades</span>
                <span className={`status ${product.isActive ? 'active' : 'inactive'}`}>{product.isActive ? 'Ativo' : 'Inativo'}</span>
                <button className="edit-btn" onClick={() => openModalForEdit(product)}>
                  Editar
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-products">Nenhum produto encontrado</div>
        )}
      </div>

      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Próxima
        </button>
      </div>

      <button className="btn-voltar" onClick={handleLogout}>Voltar</button>

      {/* Modal de criação/edição */}
      {isModalOpen && (
        <div className="create-modal-overlay">
          <div className="create-modal">
            <h2>{isEditing ? "Editar Produto" : "Criar Produto"}</h2>
            <div>
              <label>Nome:</label>
              <input
                type="text"
                name="name"
                value={productForm.name}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <label>Preço:</label>
              <input
                type="number"
                name="price"
                value={productForm.price}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <label>Quantidade:</label>
              <input
                type="number"
                name="quantity"
                value={productForm.quantity}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <label>Ativo:</label>
              <select
                name="isActive"
                value={productForm.isActive}
                onChange={handleFormChange}
              >
                <option value={true}>Ativo</option>
                <option value={false}>Inativo</option>
              </select>
            </div>
            <button onClick={saveProduct}>{isEditing ? "Salvar" : "Criar"}</button>
            <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
