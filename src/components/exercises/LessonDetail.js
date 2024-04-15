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

const LessonDetail = ({ onClose, isAdmin, lesson }) => {
    const [isEditing, setIsEditing] = useState(false); // Stav pro určení, zda se má zobrazit formulář pro úpravu

    const { title, date, time, capacity, registrations, isRegistered,description } = lesson;
    const enrolled = registrations !== undefined ? registrations.length : 0;
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
