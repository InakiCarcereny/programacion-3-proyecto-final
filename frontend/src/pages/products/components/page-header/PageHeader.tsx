import type { JSX } from "react/jsx-runtime";
import "./PageHeader.css";

function ChevronRightIcon(): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="14px"
      viewBox="0 -960 960 960"
      width="14px"
      fill="currentColor"
    >
      <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
    </svg>
  );
}

function DownloadIcon(): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="20px"
      viewBox="0 -960 960 960"
      width="20px"
      fill="currentColor"
    >
      <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
    </svg>
  );
}

function PlusIcon(): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="20px"
      viewBox="0 -960 960 960"
      width="20px"
      fill="currentColor"
    >
      <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
    </svg>
  );
}

export function PageHeader(): JSX.Element {
  return (
    <div className="page-header">
      <div>
        <nav className="breadcrumb">
          <span>Inventory</span>
          <ChevronRightIcon />
          <span className="breadcrumb-current">Products</span>
        </nav>
        <h1 className="page-title">Product Catalog</h1>
      </div>
      <div className="header-actions">
        <button className="btn-outline">
          <DownloadIcon />
          Export CSV
        </button>
        <button className="btn-primary">
          <PlusIcon />
          Add New Product
        </button>
      </div>
    </div>
  );
}
