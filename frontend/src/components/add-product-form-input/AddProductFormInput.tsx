import { useState, type JSX } from "react";

import "./AddProductFormInput.css";

interface AddProductFormInputProps {
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

export function AddProductFormInput({
  id,
  name,
  label,
  type,
  placeholder,
  icon,
  value,
  error,
  onChange,
}: AddProductFormInputProps): JSX.Element {
  const [focused, setFocused] = useState(false);

  return (
    <div className="add-product-form-input-container">
      <label className="add-product-form-input-label" htmlFor={id}>
        {label}
      </label>

      <div
        className="add-product-form-input-wrapper"
        style={{
          border: `1px solid ${focused ? "#004ac6" : "#ccc"}`,
          color: focused ? "#004ac6" : "#ccc",
        }}
      >
        {icon}

        <input
          id={id}
          name={name}
          className="add-product-form-input"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>

      {error && <span className="add-product-form-input-error">{error}</span>}
    </div>
  );
}
