import { CloudUpload } from "lucide-react";
import { useRef, type JSX } from "react";

import "./ImageUploadInput.css";

interface ImageUploadInputProps {
  onChange: (file: File) => void;
  error?: string;
}

export function ImageUploadInput({
  onChange,
  error,
}: ImageUploadInputProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = (): void => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) onChange(file);
  };

  return (
    <div>
      <div
        className={`image-upload ${error ? "image-upload--error" : ""}`}
        onClick={handleClick}
      >
        <input
          ref={inputRef}
          id="image"
          name="image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="image-upload-input"
          onChange={handleChange}
        />

        <CloudUpload color="#cccccc" />

        <div className="image-upload-text">
          <span>Subir imagen del producto</span>

          <span className="image-upload-hint">
            Formatos soportados: JPG, PNG, WEBP. Máx 2MB.
          </span>
        </div>
      </div>

      {error && <p className="input-error">{error}</p>}
    </div>
  );
}
