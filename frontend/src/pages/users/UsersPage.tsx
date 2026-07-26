import { useState, useEffect, type JSX } from "react";
import "./UsersPage.css";
import { useAuth } from "../../context/AuthContext";
import { getUsersService } from "../../services/user";
import { useModal } from "../../context/ModalContext";
import { type UserListItem } from "../../types/user";
import { Plus } from "lucide-react";
import { UsersTable } from "../../components/users-table/UsersTable";

function UsersPage(): JSX.Element {
  const { token, user: currentUser } = useAuth();
  const { open } = useModal();
  const [users, setUsers] = useState<UserListItem[]>([]);

  useEffect(() => {
    if (!token) return;
    getUsersService(token)
      .then((users) => setUsers(users.filter((u) => u.id !== currentUser?.id)))
      .catch(console.error);
  }, [token, currentUser?.id]);

  useEffect(() => {
    const handleUserCreated = async (): Promise<void> => {
      if (!token) return;
      const updatedUsers = await getUsersService(token);
      setUsers(updatedUsers.filter((u) => u.id !== currentUser?.id));
    };

    window.addEventListener("user-created", handleUserCreated);
    return (): void =>
      window.removeEventListener("user-created", handleUserCreated);
  }, [token, currentUser?.id]);

  return (
    <>
      <header className="users-page-header">
        <div className="users-page-header-container">
          <h2 className="users-page-title">Gestión de Usuarios</h2>

          <p className="users-page-subtitle">
            Administrá los accesos y permisos de los miembros de tu empresa.
          </p>
        </div>

        <button
          className="users-page-add-button"
          onClick={() => open("add-user")}
        >
          <Plus size={20} />
          Agregar Usuario
        </button>
      </header>

      <UsersTable users={users} onUsersChange={setUsers} />
    </>
  );
}

export default UsersPage;
