import React, { useState } from 'react';
import LessonInfo from './LessonInfo';
import CapacityStatus from './CapacityStatus';
import RegisterButton from './RegisterButton';
import UnregisterButton from './UnregisterButton';
import LessonDescription from './LessonDescription';
import CloseButton from './CloseButton';
import AdminLessonDetail from './AdminLessonDetail'; // Import komponenty AdminLessonDetail
import EditLessonButton from './EditLessonButton'; // Import komponenty EditLessonButton
import '../../assets/styles/exercises/LessonDetail.css';

const LessonDetail = ({ onClose, isAdmin }) => {
    const [isEditing, setIsEditing] = useState(false); // Stav pro určení, zda se má zobrazit formulář pro úpravu

    const lesson = {
        id: 1,
        title: "Pilates",
        date: "2024-04-10",
        time: "15:00",
        capacity: 10,
        registrations: ["Alice", "Bob", "Charlie", "Charlie", "Charlie", "Charlie", "Charlie", "Charlie", "Charlie", "Charlie"],
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tristique eu justo at maximus. Nulla facilisi. Donec id mi at nibh ultricies cursus. Fusce non sapien a risus sollicitudin maximus vel a turpis. Sed non odio a eros bibendum vehicula. Sed vulputate erat quis enim rhoncus, at interdum magna interdum. Sed vel ante at velit tempor vestibulum. Nam eu purus vel nisi pellentesque suscipit. Donec at laoreet odio."
    };

    const { title, date, time, capacity, registrations, isRegistered } = lesson;
    const enrolled = registrations.length;
    const isFull = enrolled >= capacity;

    const handleEditClick = () => {
        // Změna stavu na true, aby se zobrazil formulář pro úpravu
        setIsEditing(true);
    };

    return (
        <>
            {/* Zobrazení formuláře pro úpravu, pokud je uživatel administrátor a isEditing je true */}
            {isAdmin && isEditing ? (
                <AdminLessonDetail lesson={lesson} onCancel={() => setIsEditing(false)} />
            ) : (
        <div className="lesson-detail-container">

                <>
                    {/* Zobrazení informací o lekci */}
                    <h3>{title}</h3>
                    <div className="lesson-info">
                        <LessonInfo lesson={lesson}/>
                        <CapacityStatus lesson={lesson}/>
                    </div>
                    <div className="lesson-description">
                        <LessonDescription description={lesson.description}/>
                    </div>
                    <div className="lesson-buttons">
                        {isFull ? (
                            <p className="full-message">Kapacita této lekce je již plná.</p>
                        ) : isRegistered ? (
                            <UnregisterButton/>
                        ) : (
                            <RegisterButton/>
                        )}
                        <CloseButton onClose={onClose} />
                        {isAdmin && (
                            <EditLessonButton onClick={handleEditClick} /> // Zobrazení tlačítka pro administrátora
                        )}
                    </div>
                </>

        </div>
            )}
        </>
    );
};

export default LessonDetail;
