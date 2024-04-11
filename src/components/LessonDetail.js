import React from 'react';
import LessonInfo from './LessonInfo';
import CapacityStatus from './CapacityStatus';
import RegisterButton from './RegisterButton';
import UnregisterButton from './UnregisterButton';
import LessonDescription from './LessonDescription'; // Import komponenty LessonDescription
import '../assets/styles/LessonDetail.css'; // Import CSS pro stylizaci

const LessonDetail = () => {
    // Definice informací o lekci
    const lesson = {
        id: 1,
        title: "Pilates",
        date: "2024-04-10",
        time: "15:00",
        capacity: 10,
        registrations: ["Alice", "Bob", "Charlie", "Charlie", "Charlie", "Charlie", "Charlie", "Charlie", "Charlie", "Charlie"], // Seznam přihlášených účastníků
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tristique eu justo at maximus. Nulla facilisi. Donec id mi at nibh ultricies cursus. Fusce non sapien a risus sollicitudin maximus vel a turpis. Sed non odio a eros bibendum vehicula. Sed vulputate erat quis enim rhoncus, at interdum magna interdum. Sed vel ante at velit tempor vestibulum. Nam eu purus vel nisi pellentesque suscipit. Donec at laoreet odio."
    };

    // Extrahování potřebných informací z objektu lekce
    const { title, date, time, capacity, registrations, isRegistered } = lesson;

    // Počet registrovaných účastníků
    const enrolled = registrations.length;

    // Funkce pro určení stavu kapacity lekce
    const isFull = enrolled >= capacity;

    return (
        <div className="lesson-detail-container">
            {/* Zobrazení informací o lekci */}
            <h3>{title}</h3>
            <div className="lesson-info">
                <LessonInfo lesson={lesson}/>
                {/* Zobrazení stavu kapacity lekce */}
                <CapacityStatus lesson={lesson}/>
            </div>

            {/* Zobrazení popisu lekce */}
            <div className="lesson-description">
                <LessonDescription description={lesson.description}/>
            </div>

            {/* Kontejner pro tlačítka */}
            <div className="lesson-buttons">
                {/* Podle stavu kapacity a registrace zobrazit tlačítko pro přihlášení/odhlášení */}
                {isFull ? (
                    <p className="full-message">Kapacita této lekce je již plná.</p>
                ) : isRegistered ? (
                    <UnregisterButton/>
                ) : (
                    <RegisterButton/>
                )}
            </div>
        </div>
    );
};

export default LessonDetail;
