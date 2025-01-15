import React, { useState, useEffect } from "react";
import axios from "axios";
import './adminUser.css';
import { useNavigate } from "react-router-dom";

const User = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userForm, setUserForm] = useState({ name: "", pasword: "", roles: "OPERATOR" });
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 4;
  
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/user");
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const openModalForEdit = (user) => {
    setUserForm({ ...user, pasword: "" });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const openModalForCreate = () => {
    setUserForm({ name: "", pasword: "", roles: "OPERATOR" });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const saveUser = async () => {
    try {
      if (isEditing) {
        await axios.patch(`http://localhost:4000/user/${userForm.id}`, {
          name: userForm.name,
          pasword: userForm.pasword,
          roles: userForm.roles,
        });
      } else {
        await axios.post("http://localhost:4000/user", userForm);
      }
      setIsModalOpen(false);
      fetchUsers();
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setUserForm((prevState) => ({ ...prevState, [name]: value }));
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
      <h1>Usuários</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar usuários"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="create-btn" onClick={openModalForCreate}>
          Criar Usuário
        </button>
      </div>

      <div className="users-list">
        {currentUsers.length > 0 ? (
          currentUsers.map((user) => (
            <div className="user-item" key={user.id}>
              <div className="user-header">
                <h2>{user.name}</h2>
                <span className="role">{user.roles}</span>
                <button className="edit-btn" onClick={() => openModalForEdit(user)}>
                  Editar
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-users">Nenhum usuário encontrado</div>
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

      {isModalOpen && (
        <div className="create-modal-overlay">
          <div className="create-modal">
            <h2>{isEditing ? "Editar Usuário" : "Criar Usuário"}</h2>
            <div>
              <label>Nome:</label>
              <input
                type="text"
                name="name"
                value={userForm.name}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <label>Senha:</label>
              <input
                type="password"
                name="pasword"
                value={userForm.pasword}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <label>Função:</label>
              <select
                name="roles"
                value={userForm.roles}
                onChange={handleFormChange}
              >
                <option value="ADMIN">Admin</option>
                <option value="OPERATOR">Operator</option>
              </select>
            </div>
            <button onClick={saveUser}>{isEditing ? "Salvar" : "Criar"}</button>
            <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
