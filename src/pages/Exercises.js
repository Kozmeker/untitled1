import React, { useState } from 'react';
import LessonPreview from '../components/exercises/LessonPreview';
import Modal from '../components/Modal';
import LessonDetail from '../components/exercises/LessonDetail';

const Exercises = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState(null);

    const openModal = (lesson) => {
        setSelectedLesson(lesson);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedLesson(null);
        setIsModalOpen(false);
    };

    // Simulace dat o lekcích
    const lessons = [
        { id: 1, title: 'Pilates', date: '2024-04-10', time: '15:00', capacity: 10, registrations: ['Alice', 'Bob', 'Charlie', 'Charlie', 'Charlie', 'Charlie', 'Charlie', 'Charlie', 'Charlie', 'Charlie'] },
        // Další lekce...
    ];

    return (
        <div>
            <h1>Cvičení!</h1>
            {/* Zobrazení všech budoucích lekcí */}
            {lessons.map((lesson) => (
                <LessonPreview key={lesson.id} lesson={lesson} onClick={() => openModal(lesson)} />
            ))}

            {/* Modální okno s podrobnostmi o lekci */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <LessonDetail isAdmin={true} onClose={closeModal} /> {/* Předání prop onClose do LessonDetail */}
            </Modal>
        </div>
    );
};

export default Exercises;
