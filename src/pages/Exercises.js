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
        axios.get('http://localhost:8080/api/exercises')
            .then(response => {
                setLessons(response.data);
            })
            .catch(error => {
                console.error('Error fetching lessons:', error);
            });
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

            // Získání nově vytvořené lekce z odpovědi
            const newLesson = response.data;
            console.log(newLesson)
            // Aktualizace selectedLesson
            setSelectedLesson(newLesson);

            // Otevření modálního okna pro editaci nové lekce
            setIsModalOpen(true);
        } catch (error) {
            console.error('Chyba při vytváření lekce:', error);
        }
    };

    const handleSaveLesson = (lessonData) => {
        // Zde bychom měli odeslat data na backend pomocí Axiosu a poté aktualizovat seznam lekcí
        axios.post('http://localhost:8080/api/exercises', lessonData)
            .then(response => {
                // Po úspěšném uložení lekce zavřeme modal a aktualizujeme seznam lekcí
                setIsModalOpen(false);
                setLessons([...lessons, response.data]);
            })
            .catch(error => {
                console.error('Error saving lesson:', error);
            });
    };

    return (
        <div className="container">
            <h1>Cvičení!</h1>
            {isAdmin && <button className="create-lesson-button" onClick={handleCreateLesson}>Vytvořit lekci</button>}
            {lessons.map((lesson) => (
                <LessonPreview key={lesson.id} lesson={lesson} onClick={() => openModal(lesson)} />
            ))}

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {/* Podle stavu vybrané lekce zobrazit buď LessonDetail nebo AdminLessonDetail */}
                {selectedLesson && loggedInUser.admin ? (
                    <AdminLessonDetail initialLesson={selectedLesson} onSave={handleSaveLesson} onCancel={closeModal} />
                ) : (
                    <LessonDetail isAdmin={isAdmin} lesson={selectedLesson} onClose={closeModal} />
                )}
            </Modal>


        </div>
    );
};

export default Exercises;
