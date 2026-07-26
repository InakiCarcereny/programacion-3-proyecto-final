import { useEffect, useState, type JSX } from "react";
import { useAuth } from "../../context/AuthContext";

import "./AddUserFormSelectInput.css";
import type { Profile } from "../../types/profile";
import { getProfilesService } from "../../services/profile";

interface AddUserFormSelectInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}

export function AddUserFormSelectInput({
  value,
  onChange,
  error,
}: AddUserFormSelectInputProps): JSX.Element {
  const { token } = useAuth();
  const [roles, setRoles] = useState<Profile[]>([]);

  useEffect(() => {
    if (!token) return;

    getProfilesService(token).then(setRoles).catch(console.error);
  }, [token]);

  return (
    <div className="add-user-form-select-container">
      <label htmlFor="role" className="add-user-form-label">
        ROLES
      </label>

      <select
        id="role"
        name="role"
        className={`add-user-form-select ${error ? "add-user-form-select--error" : ""}`}
        value={value}
        onChange={onChange}
      >
        <option value="">Selecciona un rol</option>

        {roles.map((role) => (
          <option key={role.id} value={role.id}>
            {role.name}
          </option>
        ))}
      </select>

      {error && <p className="input-error">{error}</p>}
    </div>
  );
}
