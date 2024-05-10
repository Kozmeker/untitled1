import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '../components/Modal';
import { UserContext } from "../App";
import '../assets/styles/pages/Trainers.css';

const Trainers = () => {
    const [trainers, setTrainers] = useState([]);
    const { loggedInUser } = useContext(UserContext);
    const [isAdmin] = useState(loggedInUser && loggedInUser.admin);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTrainerData, setNewTrainerData] = useState({
        name: '',
        email: '',
        age: 0
    });
    const [selectedTrainer, setSelectedTrainer] = useState(null);

    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/trainers');
                setTrainers(response.data);
            } catch (error) {
                console.error('Error fetching trainers:', error);
            }
        };

        fetchTrainers();
    }, []);

    useEffect(() => {
        // Pokud je vybrán existující trenér, nastavíme nová data na hodnoty vybraného trenéra
        if (selectedTrainer) {
            setNewTrainerData({
                name: selectedTrainer.name,
                email: selectedTrainer.email,
                age: selectedTrainer.age
            });
        } else {
            // Pokud není vybrán žádný trenér, resetujeme nová data na prázdné hodnoty
            setNewTrainerData({
                name: '',
                email: '',
                age: 0
            });
        }
    }, [selectedTrainer]);

    const handleCreateTrainer = async () => {
        try {
            await axios.post('http://localhost:8080/api/create', newTrainerData);
            const response = await axios.get('http://localhost:8080/api/trainers');
            setTrainers(response.data);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error creating trainer:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTrainerData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleTrainerClick = (trainer) => {
        setSelectedTrainer(trainer);
        setIsModalOpen(true);
    };

    const handleEditTrainer = async () => {
        try {
            await axios.put(`http://localhost:8080/api/trainers/${selectedTrainer.id}`, newTrainerData);
            const response = await axios.get('http://localhost:8080/api/trainers');
            setTrainers(response.data);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error updating trainer:', error);
        }
    };

    const handleDeleteTrainer = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/trainers/${selectedTrainer.id}`);
            const response = await axios.get('http://localhost:8080/api/trainers');
            setTrainers(response.data);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error deleting trainer:', error);
        }
    };

    return (
        <div>
            <h1>Seznam trenérů</h1>
            {isAdmin && <button onClick={() => {setSelectedTrainer(null); setIsModalOpen(true);}}>Vytvořit nového trenéra</button>}
            <div className="trainer-list">
                {trainers.map((trainer) => (
                    <div key={trainer.id} className="trainer-card" onClick={()  => isAdmin && handleTrainerClick(trainer)}>
                        <p className="trainer-property trainer-name">Jméno: {trainer.name}</p>
                        <p className="trainer-property trainer-email">Email: {trainer.email}</p>
                        <p className="trainer-property trainer-age">Věk: {trainer.age}</p>
                    </div>
                ))}
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2>{selectedTrainer ? "Upravit trenéra" : "Vytvořit nového trenéra"}</h2>
                <label>
                    Jméno:
                    <input type="text" name="name" value={newTrainerData.name} onChange={handleChange} />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={newTrainerData.email} onChange={handleChange} />
                </label>
                <label>
                    Věk:
                    <input type="number" name="age" value={newTrainerData.age} onChange={handleChange} />
                </label>
                {selectedTrainer ? (
                    <div>
                        <button onClick={handleEditTrainer}>Upravit trenéra</button>
                        <button onClick={handleDeleteTrainer}>Smazat trenéra</button>
                    </div>
                ) : (
                    <button onClick={handleCreateTrainer}>Vytvořit trenéra</button>
                )}
                <button onClick={() => setIsModalOpen(false)}>Zavřít</button>
            </Modal>
        </div>
    );
};

export default Trainers;
