import React, {useContext, useEffect, useState} from 'react';
import LessonInfo from './LessonInfo';
import CapacityStatus from './CapacityStatus';
import LessonDescription from './LessonDescription';
import CloseButton from './CloseButton';
import AdminLessonDetail from './AdminLessonDetail'; // Import komponenty AdminLessonDetail
import EditLessonButton from './EditLessonButton'; // Import komponenty EditLessonButton
import '../../assets/styles/exercises/LessonDetail.css';
import {UserContext} from "../../App";
import axios from "axios";

const LessonDetail = ({ onClose, isAdmin, lesson }) => {
    const [isEditing, setIsEditing] = useState(false); // Stav pro určení, zda se má zobrazit formulář pro úpravu
    const [updatedLesson, setUpdatedLesson] = useState(lesson); // Stav pro uchování aktualizované verze lekce
    const [enrolled, setEnrolled] = useState(0);
    const isFull = enrolled >= updatedLesson.capacity;
    const { loggedInUser } = useContext(UserContext);
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        // Zkontrolovat, zda je uživatel přihlášen na lekci
        if (loggedInUser) {
            setIsRegistered(updatedLesson.registrations.includes(loggedInUser.id));
            setEnrolled(updatedLesson.registrations ? updatedLesson.registrations.length : 0);
        }
    }, [updatedLesson, loggedInUser]);
    const handleEditClick = () => {
        // Změna stavu na true, aby se zobrazil formulář pro úpravu
        setIsEditing(true);
    };

    const handleRegister = async () => {
        try {
            const updatedRegistrations = [...updatedLesson.registrations, loggedInUser.id];
            const updatedExercise = { ...updatedLesson, registrations: updatedRegistrations };

            await axios.put(`http://localhost:8080/api/exercises/${updatedLesson.id}`, updatedExercise);
            // Po úspěšné registraci získáme aktualizovanou verzi lekce zpět z databáze a aktualizujeme stav
            const response = await axios.get(`http://localhost:8080/api/exercises/${updatedLesson.id}`);
            setUpdatedLesson(response.data);
            setIsRegistered(true);
        } catch (error) {
            console.error('Chyba při registraci uživatele na lekci:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/exercises/${updatedLesson.id}/users/${loggedInUser.id}`);
            const response = await axios.get(`http://localhost:8080/api/exercises/${updatedLesson.id}`);
            setUpdatedLesson(response.data);
            setIsRegistered(false);
            console.log('Uživatel odhlášen z lekce');
        } catch (error) {
            console.error('Chyba při odhlašování z lekce:', error);
        }
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
                    <h3>{updatedLesson.title}</h3>
                    <div className="lesson-info">
                        <LessonInfo lesson={updatedLesson}/>
                        <CapacityStatus lesson={updatedLesson}/>
                    </div>
                    <div className="lesson-description">
                        <LessonDescription description={updatedLesson.description}/>
                    </div>
                    <div className="lesson-buttons">
                        {isFull ? (
                            isRegistered ? (
                                <button className="unregister-button" onClick={handleLogout}>Odhlásit se</button>
                            ) : (
                                <p className="full-message">Kapacita této lekce je již plná.</p>
                            )
                        ) : loggedInUser ? (
                            isRegistered ? (
                                <button className="unregister-button" onClick={handleLogout}>Odhlásit se</button>
                            ) : (
                                <button className="register-button" onClick={handleRegister}>Přihlásit se</button>
                            )
                        ) : null}


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
