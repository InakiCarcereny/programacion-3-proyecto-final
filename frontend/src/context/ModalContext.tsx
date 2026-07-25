/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  type JSX,
  type ReactNode,
} from "react";

interface ModalContextType {
  isOpen: boolean;
  type: ModalType | null;
  data: unknown;
  open: (type: ModalType, data?: unknown) => void;
  close: () => void;
  toggle: (type: ModalType) => void;
}

type ModalType =
  "login-form" | "register-form" | "add-product" | "category-form";

const ModalContext = createContext<ModalContextType | null>(null);

export function useModal(): ModalContextType {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
}

export function ModalProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<ModalType | null>(null);
  const [data, setData] = useState<unknown>(null);

  const open = (type: ModalType, data?: unknown): void => {
    setType(type);
    setData(data ?? null);
    setIsOpen(true);
  };

  const close = (): void => {
    setIsOpen(false);
    setType(null);
    setData(null);
  };

  const toggle = (type: ModalType): void => {
    setType(type);
    setIsOpen((prev) => !prev);
  };

  return (
    <ModalContext.Provider value={{ isOpen, type, data, open, close, toggle }}>
      {children}
    </ModalContext.Provider>
  );
}
