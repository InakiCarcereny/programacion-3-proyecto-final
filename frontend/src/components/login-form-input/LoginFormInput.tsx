import { useState, type JSX } from "react";

import "./LoginFormInput.css";

interface LoginFormInputProps {
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

export function LoginFormInput({
  id,
  name,
  label,
  type,
  placeholder,
  icon,
  value,
  error,
  onChange,
}: LoginFormInputProps): JSX.Element {
  const [focused, setFocused] = useState(false);

  return (
    <div className="login-form-input-container">
      <label className="login-form-input-label" htmlFor={id}>
        {label}
      </label>

      <div
        className="login-form-input-wrapper"
        style={{
          border: `1px solid ${focused ? "#004ac6" : "#ccc"}`,
          color: focused ? "#004ac6" : "#ccc",
        }}
      >
        {icon}

        <input
          id={id}
          name={name}
          className="login-form-input"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>

      {error && <span className="login-form-input-error">{error}</span>}
    </div>
  );
}
