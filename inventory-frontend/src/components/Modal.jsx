import React from "react";

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null; // Only render if open

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{title}</h2>
        {children}
        <button onClick={onClose} className="btn btn-secondary">Close</button>
      </div>
    </div>
  );
}
