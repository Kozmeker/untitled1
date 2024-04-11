// EditLessonButton.js
import React from 'react';
import '../../assets/styles/exercises/LessonButtons.css';

const EditLessonButton = ({ onClick }) => (
    <button className="register-button" onClick={onClick}>Upravit lekci</button>
);

export default EditLessonButton;
