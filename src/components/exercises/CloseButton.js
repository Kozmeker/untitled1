import React from 'react';
import '../../assets/styles/exercises/LessonButtons.css';

const CloseButton = ({ onClose }) => {
    return (
        <button className="close-button" onClick={onClose}>Zavřít</button>
    );
};

export default CloseButton;
