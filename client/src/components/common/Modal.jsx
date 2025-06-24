import React from 'react';

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-surface p-4 rounded shadow-lg">
        {children}
        <button
          onClick={onClose}
          className="mt-2 text-sm bg-red-500 px-2 py-1 w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
