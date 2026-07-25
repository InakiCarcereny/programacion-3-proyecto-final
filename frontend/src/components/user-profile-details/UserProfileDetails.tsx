import type { JSX } from "react";
import { useAuth } from "../../context/AuthContext";

import "./UserProfileDetails.css";

export function UserProfileDetails(): JSX.Element {
  const { user } = useAuth();

  return (
    <div className="profile-page-info-details">
      <div>
        <dl className="profile-page-info-details-column">
          <div>
            <dt className="profile-page-info-name">NOMBRE COMPLETO</dt>

            <dd className="profile-page-info-name-value">
              {user?.profile?.firstName} {user?.profile?.lastName}
            </dd>
          </div>

          <div>
            <dt className="profile-page-info-name">CORREO ELECTRÓNICO</dt>

            <dd className="profile-page-info-name-value">{user?.email}</dd>
          </div>
        </dl>
      </div>

      <div>
        <dl className="profile-page-info-details-column">
          <div>
            <dt className="profile-page-info-name">ROL</dt>

            <dd className="profile-page-info-name-value">
              {user?.role
                ? user.role[0].toUpperCase() + user.role.slice(1)
                : ""}
            </dd>
          </div>

          <div>
            <dt className="profile-page-info-name">TELÉFONO</dt>

            <dd className="profile-page-info-name-value">
              {user?.profile?.phone ? user?.profile?.phone : "No proporcionado"}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
