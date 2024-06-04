import React from 'react';
import './create.css'; // Import your CSS file for modal styles

const Modal = ({ isOpen, onClose, children }) => {
    const closeModal = () => {
        console.log("inside")
        onClose();
    };

    return isOpen ? (
        <div className="modal-overlay">
            <div className="modal">
                {children}
            </div>
        </div>
    ) : null;
};

export default Modal;
