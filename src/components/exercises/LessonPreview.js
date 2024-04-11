import React from 'react';
import '../../assets/styles/exercises/LessonPreview.css';

const LessonPreview = ({ lesson, onClick }) => {
    const { title, date, time, capacity, registrations } = lesson;

    // Určení, zda je kapacita rovna počtu přihlášených
    const isFull = capacity === registrations.length;

    return (
        <div className="lesson-preview" onClick={onClick}> {/* Přidání onClick události pro otevření modálního okna */}
            <h3>{title}</h3>
            <div className="lesson-info">
                <p>Datum: {date}</p>
                <p>Čas: {time}</p>
                <p className={isFull ? "full" : ""}>Kapacita: {capacity}</p>
                <p className={isFull ? "full" : ""}>Přihlášeno: {registrations.length}</p>
            </div>
        </div>
    );
};

export default LessonPreview;
