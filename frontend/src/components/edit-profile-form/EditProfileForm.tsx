import { useState, type JSX } from "react";
import { useAuth } from "../../context/AuthContext";

import "./EditProfileForm.css";
import { EditProfileFormInput } from "../edit-profile-form-input/EditProfileFormInput";
import { validateEditProfileForm } from "../../utils/validateEditProfileForm";
import { updateUserDetailsService } from "../../services/user-details";
import { updateUserService } from "../../services/user";

interface EditProfileFormProps {
  setIsEditing: (editing: boolean) => void;
  avatarFile: File | null;
}

export function EditProfileForm({
  setIsEditing,
  avatarFile,
}: EditProfileFormProps): JSX.Element {
  const { user, token, updateUser } = useAuth();
  const [error, setError] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    fullName: `${user?.profile?.firstName} ${user?.profile?.lastName}`,
    email: user?.email || "",
    phone: user?.profile?.phone || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.SubmitEvent): Promise<void> => {
    e.preventDefault();
    setError({});

    const [firstName, ...rest] = formData.fullName.trim().split(" ");
    const lastName = rest.join(" ");

    const validationErrors = validateEditProfileForm(
      { firstName, lastName, phone: formData.phone },
      avatarFile,
    );
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    try {
      const data = new FormData();
      data.append("firstName", firstName);
      data.append("lastName", lastName);
      data.append("phone", formData.phone);
      if (avatarFile) {
        data.append("avatar", avatarFile);
      }

      await updateUserDetailsService(token!, user!.id, data);
      await updateUserService(token!, user!.id, { email: formData.email });

      updateUser({
        email: formData.email,
        profile: {
          firstName,
          lastName,
          phone: formData.phone,
          avatarUrl: avatarFile
            ? URL.createObjectURL(avatarFile)
            : user?.profile?.avatarUrl,
        },
      });

      setIsEditing(false);
    } catch (err) {
      if (err instanceof Error) {
        setError({ general: err.message });
      }
    }

    setIsEditing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="profile-page-info-details">
      <div>
        <dl className="profile-page-info-details-column">
          <EditProfileFormInput
            id="fullName"
            name="fullName"
            label="NOMBRE COMPLETO"
            type="text"
            placeholder="Nombre completo"
            icon={null}
            value={formData.fullName}
            onChange={handleChange}
            error={error.fullName}
          />

          <EditProfileFormInput
            id="email"
            name="email"
            label="CORREO ELECTRÓNICO"
            type="email"
            placeholder="Correo electrónico"
            icon={null}
            value={formData.email}
            onChange={handleChange}
            error={error.email}
          />
        </dl>
      </div>

      <div className="profile-page-info-details-separator">
        <dl className="profile-page-info-details-column">
          <div>
            <dt className="profile-page-info-name-edit">ROL</dt>

            <dd className="profile-page-info-name-value-edit">
              {`${user?.role}`[0].toUpperCase() + `${user?.role}`.slice(1)}
            </dd>
          </div>

          <EditProfileFormInput
            id="phone"
            name="phone"
            label="TELÉFONO"
            type="text"
            placeholder="Teléfono"
            icon={null}
            value={formData.phone}
            onChange={handleChange}
            error={error.phone}
          />
        </dl>

        {error.avatar && <p className="input-error">{error.avatar}</p>}

        <div className="profile-page-edit-actions">
          <button
            type="button"
            className="profile-page-cancel-button"
            onClick={() => setIsEditing(false)}
          >
            Cancelar
          </button>

          <button type="submit" className="profile-page-save-button">
            Guardar
          </button>
        </div>
      </div>
    </form>
  );
}
