import { useState, type JSX } from "react";

import "./AddUserForm.css";
import { useModal } from "../../context/ModalContext";
import { AddUserFormInput } from "../add-user-form-input/AddUserFormInput";
import { LockKeyhole, Mail, User } from "lucide-react";
import { AddUserFormSelectInput } from "../add-user-form-select-input/AddUserFormSelectInput";
import { useAuth } from "../../context/AuthContext";
import { validateAddUserForm } from "../../utils/validateAddUserForm";
import { createUserService } from "../../services/user";

export function AddUserForm(): JSX.Element {
  const { token } = useAuth();
  const { close } = useModal();
  const [error, setError] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    profileId: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (
    e: React.SubmitEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    setError({});

    const validationErrors = validateAddUserForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    const [firstName, ...rest] = formData.fullName.trim().split(" ");
    const lastName = rest.join(" ");

    try {
      await createUserService(token, {
        firstName,
        lastName,
        email: formData.email,
        password: formData.password,
        profileId: Number(formData.profileId),
      });
      window.dispatchEvent(new CustomEvent("user-created"));
      close();
    } catch (err) {
      if (err instanceof Error) {
        setError({ general: err.message });
      }
    }
  };

  return (
    <form className="add-user-form" onSubmit={onSubmit}>
      <div className="add-user-form-body">
        <AddUserFormInput
          id="fullName"
          name="fullName"
          label="NOMBRE COMPLETO"
          type="text"
          placeholder="Juan Pérez"
          icon={<User />}
          value={formData.fullName}
          onChange={handleChange}
          error={error.fullName}
        />

        <AddUserFormInput
          id="email"
          name="email"
          label="EMAIL"
          type="email"
          placeholder="juan.perez@example.com"
          icon={<Mail />}
          value={formData.email}
          onChange={handleChange}
          error={error.email}
        />

        <AddUserFormInput
          id="password"
          name="password"
          label="CONTRASEÑA"
          type="password"
          placeholder="********"
          icon={<LockKeyhole />}
          value={formData.password}
          onChange={handleChange}
          error={error.password}
        />

        <AddUserFormSelectInput
          value={formData.profileId}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, profileId: e.target.value }))
          }
          error={error.profileId}
        />
      </div>

      {error.general && (
        <p className="add-user-form-general-error">{error.general}</p>
      )}

      <div className="add-user-form-footer">
        <button
          onClick={close}
          type="button"
          className="add-user-form-cancel-button"
        >
          Cancelar
        </button>

        <button type="submit" className="add-user-form-submit-button">
          Guardar Usuario
        </button>
      </div>
    </form>
  );
}
