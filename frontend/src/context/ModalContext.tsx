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
  open: (type: ModalType) => void;
  close: () => void;
  toggle: (type: ModalType) => void;
}

type ModalType = "add-product" | "add-movement" | "add-user";

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

  const open = (type: ModalType): void => {
    setType(type);
    setIsOpen(true);
  };

  const close = (): void => {
    setIsOpen(false);
    setType(null);
  };

  const toggle = (type: ModalType): void => {
    setType(type);
    setIsOpen((prev) => !prev);
  };

  return (
    <ModalContext.Provider value={{ isOpen, type, open, close, toggle }}>
      {children}
    </ModalContext.Provider>
  );
}
