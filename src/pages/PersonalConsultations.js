import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '../components/Modal';
import { UserContext } from "../App";
import '../assets/styles/pages/PersonalConsultations.css';

const PersonalConsultations = () => {
    const { loggedInUser } = useContext(UserContext);
    const [trainers, setTrainers] = useState([]);
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newConsultationData, setNewConsultationData] = useState({
        title: '',
        date: '',
        time: '',
        description: '',
        trainer: '',
        registered: loggedInUser ? loggedInUser.id : '' // Předávání ID přihlášeného uživatele
    });
    const [userConsultations, setUserConsultations] = useState([]);

    useEffect(() => {
        // Načtení seznamu trenérů při prvním načtení stránky
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
        // Načtení seznamu trenérů při prvním načtení stránky
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching trainers:', error);
            }
        };

        fetchUsers();
    }, []);

    const fetchUserConsultations = async () => {
        try {
            if(loggedInUser.admin){
                const response = await axios.get(`http://localhost:8080/api/consultations`);
                setUserConsultations(response.data);
            }
            else {
                const response = await axios.get(`http://localhost:8080/api/consultations/registered/${loggedInUser.id}`);
                setUserConsultations(response.data);
            }
        } catch (error) {
            console.error('Error fetching user consultations:', error);
            setUserConsultations([]);
        }
    };

    useEffect(() => {
        const fetchUserConsultations = async () => {
            try {
                if(loggedInUser.admin){
                    const response = await axios.get(`http://localhost:8080/api/consultations`);
                    setUserConsultations(response.data);
                }
                else {
                    const response = await axios.get(`http://localhost:8080/api/consultations/registered/${loggedInUser.id}`);
                    setUserConsultations(response.data);
                }
            } catch (error) {
                console.error('Error fetching user consultations:', error);
                setUserConsultations([]);
            }
        };

        if (loggedInUser) {
            fetchUserConsultations();
        }
    }, [loggedInUser]); // Tento useEffect načte konzultace po změně přihlášeného uživatele

    const handleCreateConsultation = async () => {
        if (!checkAttributes(newConsultationData)){
            return alert("Vyberte Všechny pole");
        }
        try {
            await axios.post('http://localhost:8080/api/consultations', newConsultationData);
            setIsModalOpen(false);
            fetchUserConsultations(); // Aktualizace seznamu konzultací po vytvoření nové konzultace
        } catch (error) {
            console.error('Error creating consultation:', error);
        }
    };

    const handleDeleteConsultation = async (consultationId) => {
        try {
            await axios.delete(`http://localhost:8080/api/consultations/${consultationId}`);
            // Aktualizujeme seznam konzultací po smazání
            fetchUserConsultations();
        } catch (error) {
            console.error('Error deleting consultation:', error);
        }
    };


    const getTrainerName = (trainerId) => {
        const trainer = trainers.find(trainer => trainer.id === trainerId);
        return trainer ? trainer.name : "";
    };


    function checkAttributes(data) {
        for (let key in data) {
            if (key !== 'registered' && data[key].trim() === '') {
                return false; // Pokud je některý atribut prázdný kromě 'registered', vrátí false
            }
        }
        return true; // Všechny atributy kromě 'registered' nejsou prázdné
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewConsultationData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };


    function getUserName(userId) {
        const user = users.find(user => user.id === userId);
        return user ? user.username : "";
    }

    return (
        <div>
            <h1>Osobní konzultace</h1>
            {loggedInUser && (
                <button onClick={() => setIsModalOpen(true)}>Vytvořit novou konzultaci</button>
            )}
            {userConsultations.map((consultation) => (
                <div className="consultation-container" key={consultation.id}>
                    <h3 className="consultation-title">{consultation.title}</h3>
                    <div className="consultation-info">
                        <p>Datum: {consultation.date}</p>
                        <p>Čas: {consultation.time}</p>
                        <p>Popis: {consultation.description}</p>
                        <p>Trenér: {getTrainerName(consultation.trainer)}</p>
                        {loggedInUser && loggedInUser.admin && (
                            <div>
                                <p>Registrovaný uživatel:</p>
                                <p>{getUserName(consultation.registered)}</p>
                            </div>
                        )}
                    </div>
                    {loggedInUser && (
                        <div className="consultation-actions">
                            <button onClick={() => handleDeleteConsultation(consultation.id)}>Smazat</button>
                        </div>
                    )}
                </div>
            ))}

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2>Vytvořit novou konzultaci</h2>
                <label>
                    Název:
                    <input type="text" name="title" value={newConsultationData.title} onChange={handleChange} />
                </label>
                <label>
                    Datum:
                    <input type="date" name="date" value={newConsultationData.date} onChange={handleChange} />
                </label>
                <label>
                    Čas:
                    <input type="time" name="time" value={newConsultationData.time} onChange={handleChange} />
                </label>
                <label>
                    Popis:
                    <textarea name="description" value={newConsultationData.description} onChange={handleChange} />
                </label>
                <label>
                    Trenér:
                    <select name="trainer" value={newConsultationData.trainer} onChange={handleChange}>
                        <option value="">Vyberte trenéra</option>
                        {trainers.map((trainer) => (
                            <option key={trainer.id} value={trainer.id}>{trainer.name}</option>
                        ))}
                    </select>
                </label>
                <button onClick={handleCreateConsultation}>Vytvořit konzultaci</button>
                <button onClick={() => setIsModalOpen(false)}>Zavřít</button>
            </Modal>
        </div>
    );

};

export default PersonalConsultations;
