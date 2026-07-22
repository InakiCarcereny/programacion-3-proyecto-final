import { useState, type JSX } from "react";

import "./RegisterFormInput.css";

interface RegisterFormInputProps {
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

export function RegisterFormInput({
  id,
  name,
  label,
  type,
  placeholder,
  icon,
  value,
  error,
  onChange,
}: RegisterFormInputProps): JSX.Element {
  const [focused, setFocused] = useState(false);

  return (
    <div className="register-form-input-container">
      <label className="register-form-input-label" htmlFor={id}>
        {label}
      </label>

      <div
        className="register-form-input-wrapper"
        style={{
          border: `1px solid ${focused ? "#004ac6" : "#ccc"}`,
          color: focused ? "#004ac6" : "#ccc",
        }}
      >
        {icon}

        <input
          id={id}
          name={name}
          className="register-form-input"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>

      {error && <span className="register-form-input-error">{error}</span>}
    </div>
  );
}
