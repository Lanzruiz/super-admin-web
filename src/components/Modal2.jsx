import { Typography } from '@material-tailwind/react';
import React from 'react';
import '../../public/css/modal.css';

const Modal2 = ({ isOpen, onClose, children, title }) => {
  return (
    <div className={`modal ${isOpen ? 'is-open' : ''}`}>
      <div className="modal-content p-4 rounded-xl">
        <span className="close" onClick={onClose}>
          &times;
        </span>

        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal2;
