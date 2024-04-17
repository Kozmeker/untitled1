import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import LessonPreview from '../components/exercises/LessonPreview';
import Modal from '../components/Modal';
import LessonDetail from '../components/exercises/LessonDetail';
import AdminLessonDetail from '../components/exercises/AdminLessonDetail';
import '../assets/styles/pages/exercises.css';
import { UserContext } from "../App";

const Exercises = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState(null);
    const { loggedInUser } = useContext(UserContext);
    const [isAdmin] = useState(loggedInUser && loggedInUser.admin);
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/exercises');
                setLessons(response.data);
            } catch (error) {
                console.error('Error fetching lessons:', error);
            }
        })();
    }, [isModalOpen]);


    const openModal = (lesson) => {
        setSelectedLesson(lesson);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedLesson(null);
        setIsModalOpen(false);
    };

    const handleCreateLesson = async () => {
        try {
            // Vytvoření nové lekce na serveru
            const response = await axios.post('http://localhost:8080/api/exercises', {
                title: '',
                date: '',
                time: '',
                capacity: 0,
                description: '',
                registrations: []
            });

            // Získání id nově vytvořené lekce z odpovědi
            const newLessonId = response.data;
            const newExercise = await axios.get(`http://localhost:8080/api/exercises/${newLessonId}`);
            // Aktualizace stavu nově vytvořené lekce s id
            setSelectedLesson(newExercise.data);

            // Otevření modálního okna pro editaci nové lekce
            setIsModalOpen(true);
        } catch (error) {
            console.error('Chyba při vytváření lekce:', error);
        }

    };


    const handleDeleteLesson = async () => {
        try {
            // Volání API pro odebrání uživatele z lekce
            await axios.delete(`http://localhost:8080/api/exercises/${selectedLesson.id}`);
            console.log('Lekce byla úspěšně smazána');
            setIsModalOpen(false);
        } catch (error) {
            console.error('Chyba při odebírání lekce:', error);
        }
    };


    const handleSaveLesson = (lessonData) => {
        // Zde bychom měli odeslat data na backend pomocí Axiosu a poté aktualizovat seznam lekcí
        axios.put(`http://localhost:8080/api/exercises/${lessonData.id}`, lessonData)
            .then(response => {
                // Po úspěšném uložení lekce zavřeme modal a aktualizujeme seznam lekcí
                setIsModalOpen(false);
            })
            .catch(error => {
                console.error('Error saving lesson:', error);
            });
    };

    return (
        <div className="container">
            <h1>Přihlášení na cvičení</h1>
            {isAdmin && <button className="create-lesson-button" onClick={handleCreateLesson}>Vytvořit lekci</button>}
            <p>Pokud jste u nás registrováni, můžete se zapsat na některou z našich lekcí.</p>
            <div className={"lessons"}>
            {lessons.map((lesson) => (
                <div className={"lesson"}>
                <LessonPreview key={lesson.id} lesson={lesson} onClick={() => openModal(lesson)}/>
                </div>
            ))}
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {/* Podle stavu vybrané lekce zobrazit buď LessonDetail nebo AdminLessonDetail */}
                {isAdmin ? (
                    <AdminLessonDetail initialLesson={selectedLesson} onSave={handleSaveLesson} onCancel={closeModal}
                                       onDelete={handleDeleteLesson}/>
                ) : (
                    <LessonDetail isAdmin={isAdmin} lesson={selectedLesson} onClose={closeModal}/>
                )}
            </Modal>


        </div>
    );
};

export default Exercises;
