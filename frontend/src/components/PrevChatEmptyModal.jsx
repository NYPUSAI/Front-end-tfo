import React from 'react';

const PrevChatEmptyModal = ({ isOpen, onClose }) => {
  return (
    <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box">
        <h2 className="font-bold text-lg">Warning</h2>
        <p className="py-4">The last message is empty. Cannot create a new chat message.</p>
        <div className="modal-action">
          <button className="btn btn-primary" onClick={onClose}>Okay</button>
        </div>
      </div>
    </div>
  );
};

export default PrevChatEmptyModal;

