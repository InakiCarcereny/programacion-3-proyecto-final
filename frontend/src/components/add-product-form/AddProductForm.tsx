import { useState, type JSX } from "react";

import "./AddProductForm.css";
import { AddProductFormInput } from "../add-product-form-input/AddProductFormInput";
import { ALargeSmall, DollarSign, Layers, ShoppingCart } from "lucide-react";
import { AddProductFormSelectInput } from "../add-product-form-select-input/AddProductFormSelectInput";
import { ImageUploadInput } from "../image-upload-input/ImageUploadInput";
import { useModal } from "../../context/ModalContext";
import { validateAddProductForm } from "../../utils/validateAddProductForm";
import { createProductService } from "../../services/product";
import { useAuth } from "../../context/AuthContext";

export function AddProductForm(): JSX.Element {
  const { token } = useAuth();
  const { close } = useModal();
  const [error, setError] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    image: null as File | null,
    description: "",
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

    const validationErrors = validateAddProductForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("stock", formData.stock);
      data.append("categoryId", formData.category);
      data.append("description", formData.description);
      if (formData.image) {
        data.append("image", formData.image);
      }

      await createProductService(token, data);
      close();
    } catch (err) {
      if (err instanceof Error) {
        setError({ general: err.message });
      }
    }
  };

  return (
    <form className="add-product-form" onSubmit={onSubmit}>
      <AddProductFormInput
        id="name"
        name="name"
        type="text"
        placeholder="Router Industrial VPN 4G LTE"
        label="NOMBRE DEL PRODUCTO"
        icon={<ShoppingCart />}
        value={formData.name}
        onChange={handleChange}
        error={error.name}
      />

      <div className="add-product-form-row">
        <AddProductFormInput
          id="price"
          name="price"
          type="number"
          placeholder="0.00"
          label="PRECIO ($)"
          icon={<DollarSign />}
          value={formData.price}
          onChange={handleChange}
          error={error.price}
        />

        <AddProductFormInput
          id="stock"
          name="stock"
          type="number"
          placeholder="0"
          label="STOCK INICIAL"
          icon={<Layers />}
          value={formData.stock}
          onChange={handleChange}
          error={error.stock}
        />

        <AddProductFormSelectInput
          value={formData.category}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, category: e.target.value }))
          }
          error={error.category}
        />
      </div>

      <ImageUploadInput
        onChange={(file) => setFormData((prev) => ({ ...prev, image: file }))}
      />

      <AddProductFormInput
        id="description"
        name="description"
        type="text"
        placeholder="Descripción breve de las características del producto..."
        label="DESCRIPCIÓN DEL PRODUCTO"
        icon={<ALargeSmall />}
        value={formData.description}
        onChange={handleChange}
        error={error.description}
      />

      <div className="add-product-form-footer">
        <button
          onClick={close}
          type="button"
          className="add-product-form-cancel-button"
        >
          Cancelar
        </button>

        <button type="submit" className="add-product-form-submit-button">
          Guardar Producto
        </button>
      </div>
    </form>
  );
}
