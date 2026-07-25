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
  onSuccess?: () => void;
  open: (type: ModalType, onSuccess?: () => void) => void;
  close: () => void;
  toggle: (type: ModalType) => void;
}

type ModalType = "add-product" | "add-movement";

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
  const [onSuccess, setOnSuccess] = useState<(() => void) | undefined>(
    undefined,
  );

  const open = (type: ModalType, onSuccess?: () => void): void => {
    setType(type);
    setOnSuccess(() => onSuccess);
    setIsOpen(true);
  };

  const close = (): void => {
    setIsOpen(false);
    setType(null);
    setOnSuccess(undefined);
  };

  const toggle = (type: ModalType): void => {
    setType(type);
    setIsOpen((prev) => !prev);
  };

  return (
    <ModalContext.Provider
      value={{ isOpen, type, onSuccess, open, close, toggle }}
    >
      {children}
    </ModalContext.Provider>
  );
}
