import { useState, type JSX } from "react";

import "./EditProfileFormInput.css";

interface EditProfileFormInputProps {
  id: string;
  name: string;
  label: string;
  type: string;
  placeholder: string;
  icon: React.ReactNode;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function EditProfileFormInput({
  id,
  name,
  label,
  type,
  placeholder,
  icon,
  value,
  error,
  onChange,
}: EditProfileFormInputProps): JSX.Element {
  const [focused, setFocused] = useState(false);

  return (
    <div className="edit-profile-form-input-container">
      <label className="edit-profile-form-input-label" htmlFor={id}>
        {label}
      </label>

      <div
        className="edit-profile-form-input-wrapper"
        style={{
          border: `1px solid ${focused ? "#004ac6" : "#ccc"}`,
          color: focused ? "#004ac6" : "#ccc",
        }}
      >
        {icon}

        <input
          id={id}
          name={name}
          className="edit-profile-form-input"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>

      {error && <span className="edit-profile-form-input-error">{error}</span>}
    </div>
  );
}
