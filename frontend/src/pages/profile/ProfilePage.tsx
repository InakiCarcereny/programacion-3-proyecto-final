import { useState, type JSX } from "react";
import "./ProfilePage.css";
import { useAuth } from "../../context/AuthContext";
import { Pencil } from "lucide-react";
import { EditProfileForm } from "../../components/edit-profile-form/EditProfileForm";
import { UserProfileDetails } from "../../components/user-profile-details/UserProfileDetails";

function ProfilePage(): JSX.Element {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleChangeEditing = (editing: boolean): void => {
    setIsEditing(editing);
    if (!editing) {
      setAvatarFile(null);
      setAvatarPreview(null);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const currentAvatar = avatarPreview ?? user?.profile?.avatarUrl;

  return (
    <>
      <header className="profile-page-header">
        <h2 className="profile-page-header-title">Perfil de Usuario</h2>

        <p className="profile-page-header-subtitle">
          Maneja tu información personal y preferencias de cuenta desde esta
          sección.
        </p>
      </header>

      <section className="profile-page-container">
        <figure className="profile-page-avatar-container">
          {isEditing ? (
            <label htmlFor="avatar" className="profile-page-avatar-edit">
              {currentAvatar ? (
                <img
                  src={currentAvatar}
                  alt={`${user?.profile?.firstName} ${user?.profile?.lastName} avatar`}
                  className="profile-page-avatar"
                />
              ) : (
                <div className="profile-page-avatar-placeholder">
                  {user?.profile?.firstName?.[0].toUpperCase()}
                  {user?.profile?.lastName?.[0].toUpperCase()}
                </div>
              )}
              <div className="profile-page-avatar-overlay">
                <Pencil size={16} color="#ffffff" />
              </div>

              <input
                id="avatar"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                style={{ display: "none" }}
                onChange={handleAvatarChange}
              />
            </label>
          ) : (
            <>
              {user?.profile?.avatarUrl ? (
                <img
                  src={user?.profile?.avatarUrl}
                  alt={`${user?.profile?.firstName} ${user?.profile?.lastName} avatar`}
                  className="profile-page-avatar"
                />
              ) : (
                <div className="profile-page-avatar-placeholder">
                  {user?.profile?.firstName?.[0].toUpperCase()}
                  {user?.profile?.lastName?.[0].toUpperCase()}
                </div>
              )}
            </>
          )}
        </figure>

        <div className="profile-page-info">
          <h3 className="profile-page-info-title">Información Personal</h3>
          {isEditing ? (
            <EditProfileForm
              setIsEditing={handleChangeEditing}
              avatarFile={avatarFile}
            />
          ) : (
            <UserProfileDetails />
          )}
        </div>

        {!isEditing && (
          <button
            className="profile-page-edit-button"
            type="button"
            onClick={() => setIsEditing(true)}
          >
            <Pencil />
            Editar Perfil
          </button>
        )}
      </section>
    </>
  );
}

export default ProfilePage;
