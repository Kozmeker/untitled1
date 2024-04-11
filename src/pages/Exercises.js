import React, { useState } from 'react';
import LessonPreview from '../components/exercises/LessonPreview';
import Modal from '../components/Modal';
import LessonDetail from '../components/exercises/LessonDetail';
import AdminLessonDetail from '../components/exercises/AdminLessonDetail';
import '../assets/styles/pages/exercises.css';

const Exercises = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [isAdmin, setIsAdmin] = useState(true); // Uživatel je administrátor

    const openModal = (lesson) => {
        setSelectedLesson(lesson);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedLesson(null);
        setIsModalOpen(false);
    };

    const handleCreateLesson = () => {
        openModal({ isAdmin: true }); // Otevřít modální okno s AdminLessonDetail
    };

    // Simulace dat o lekcích
    const lessons = [
        { id: 1, title: 'Pilates', date: '2024-04-10', time: '15:00', capacity: 10, registrations: ['Alice', 'Bob', 'Charlie', 'Charlie', 'Charlie', 'Charlie', 'Charlie', 'Charlie', 'Charlie', 'Charlie'] },
        // Další lekce...
    ];

    return (
        <div className="container">
            <h1>Cvičení!</h1>
            {/* Zobrazení všech budoucích lekcí */}
            {lessons.map((lesson) => (
                <LessonPreview key={lesson.id} lesson={lesson} onClick={() => openModal(lesson)} />
            ))}

            {/* Modální okno s podrobnostmi o lekci */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {/* Podle stavu vybrané lekce zobrazit buď LessonDetail nebo AdminLessonDetail */}
                {selectedLesson && selectedLesson.isAdmin ? (
                    <AdminLessonDetail lesson={selectedLesson} onCancel={closeModal} />
                ) : (
                    <LessonDetail isAdmin={isAdmin} lesson={selectedLesson} onClose={closeModal} />
                )}
            </Modal>

            {/* Tlačítko "Vytvořit lekci" pro admina */}
            {isAdmin && <button className="create-lesson-button" onClick={handleCreateLesson}>Vytvořit lekci</button>}
        </div>
    );
};

export default Exercises;
