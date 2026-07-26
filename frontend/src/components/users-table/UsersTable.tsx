import { useEffect, useState, type JSX } from "react";
import { type UserListItem } from "../../types/user";
import { useAuth } from "../../context/AuthContext";
import { deleteUserService, updateUserService } from "../../services/user";
import "./UsersTable.css";
import { Pencil, Trash2 } from "lucide-react";
import type { Profile } from "../../types/profile";
import { getProfilesService } from "../../services/profile";

interface UsersTableProps {
  users: UserListItem[];
  onUsersChange: (users: UserListItem[]) => void;
}

export function UsersTable({
  users,
  onUsersChange,
}: UsersTableProps): JSX.Element {
  const { token } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profileId: "",
    isActive: true,
  });

  useEffect(() => {
    if (!token) return;
    getProfilesService(token).then(setProfiles).catch(console.error);
  }, [token]);

  const handleDelete = async (userId: number): Promise<void> => {
    if (!token) return;

    try {
      await deleteUserService(token, userId);
      onUsersChange(users.filter((u) => u.id !== userId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (user: UserListItem): void => {
    setEditingId(user.id);
    setEditFormData({
      firstName: user.details?.firstName ?? "",
      lastName: user.details?.lastName ?? "",
      email: user.email,
      profileId: String(user.profile?.id ?? ""),
      isActive: user.isActive,
    });
  };

  const handleSave = async (userId: number): Promise<void> => {
    if (!token) return;
    try {
      await updateUserService(token, userId, {
        email: editFormData.email,
        profileId: Number(editFormData.profileId),
        isActive: editFormData.isActive,
      });
      onUsersChange(
        users.map((u) =>
          u.id === userId
            ? {
                ...u,
                email: editFormData.email,
                isActive: editFormData.isActive,
                profile:
                  profiles.find(
                    (p) => p.id === Number(editFormData.profileId),
                  ) ?? u.profile,
                details: {
                  ...u.details,
                  firstName: editFormData.firstName,
                  lastName: editFormData.lastName,
                },
              }
            : u,
        ),
      );
      setEditingId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = (): void => {
    setEditingId(null);
  };

  return (
    <section className="users-table-container">
      <table className="users-table">
        <thead>
          <tr>
            <th>NOMBRE</th>
            <th>EMAIL</th>
            <th>ROL</th>
            <th>ESTADO</th>
            <th>ACCIONES</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={5} className="users-empty">
                No hay usuarios registrados en tu empresa.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="users-table-name">
                    <div className="users-table-avatar">
                      {user.details?.avatarUrl ? (
                        <img
                          src={user.details.avatarUrl}
                          alt=""
                          className="users-table-avatar-img"
                        />
                      ) : (
                        <span className="users-table-avatar-placeholder">
                          {user.details?.firstName?.[0].toUpperCase()}
                          {user.details?.lastName?.[0].toUpperCase()}
                        </span>
                      )}
                    </div>
                    {editingId === user.id ? (
                      <div className="users-table-edit-inputs">
                        <input
                          value={editFormData.firstName}
                          onChange={(e) =>
                            setEditFormData((prev) => ({
                              ...prev,
                              firstName: e.target.value,
                            }))
                          }
                          placeholder="Nombre"
                        />

                        <input
                          value={editFormData.lastName}
                          onChange={(e) =>
                            setEditFormData((prev) => ({
                              ...prev,
                              lastName: e.target.value,
                            }))
                          }
                          placeholder="Apellido"
                        />
                      </div>
                    ) : (
                      <span className="users-table-fullname">
                        {user.details?.firstName} {user.details?.lastName}
                      </span>
                    )}
                  </div>
                </td>

                <td>
                  {editingId === user.id ? (
                    <input
                      className="users-table-edit-input"
                      value={editFormData.email}
                      onChange={(e) =>
                        setEditFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      placeholder="Email"
                    />
                  ) : (
                    user.email
                  )}
                </td>

                <td>
                  {editingId === user.id ? (
                    <select
                      value={editFormData.profileId}
                      onChange={(e) =>
                        setEditFormData((prev) => ({
                          ...prev,
                          profileId: e.target.value,
                        }))
                      }
                      className="users-table-select"
                    >
                      {profiles.map((profile) => (
                        <option key={profile.id} value={profile.id}>
                          {profile.name === "admin" ? "Admin" : "Empleado"}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span
                      className={`users-table-role ${user.profile?.name === "admin" ? "users-table-role--admin" : "users-table-role--employee"}`}
                    >
                      {user.profile?.name === "admin" ? "Admin" : "Empleado"}
                    </span>
                  )}
                </td>

                <td>
                  {editingId === user.id ? (
                    <select
                      className="users-table-select"
                      value={String(editFormData.isActive)}
                      onChange={(e) =>
                        setEditFormData((prev) => ({
                          ...prev,
                          isActive: e.target.value === "true",
                        }))
                      }
                    >
                      <option value="true">Activo</option>
                      <option value="false">Inactivo</option>
                    </select>
                  ) : (
                    <span
                      className={`users-table-status ${user.isActive ? "users-table-status--active" : "users-table-status--inactive"}`}
                    >
                      {user.isActive ? "Activo" : "Inactivo"}
                    </span>
                  )}
                </td>

                <td>
                  <div className="users-table-actions">
                    {editingId === user.id ? (
                      <>
                        <button
                          className="users-table-cancel-button"
                          onClick={handleCancel}
                        >
                          Cancelar
                        </button>

                        <button
                          className="users-table-save-button"
                          onClick={() => handleSave(user.id)}
                        >
                          Guardar
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="users-table-edit-button"
                          onClick={() => handleEdit(user)}
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          className="users-table-delete-button"
                          onClick={() => handleDelete(user.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
}
