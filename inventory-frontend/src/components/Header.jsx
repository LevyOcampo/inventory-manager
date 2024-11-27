import React from 'react';

export default function Header({ title, onAddNew }) {
  return (
    <div className="d-flex justify-content-between align-items-center p-3 bg-light border-bottom">
      <h2>{title}</h2>
      <div>
        <button className="btn btn-primary" onClick={onAddNew}>Add New Item</button>
      </div>
    </div>
  );
}
