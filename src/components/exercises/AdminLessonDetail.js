import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../../assets/styles/exercises/AdminLessonDetail.css';

const AdminLessonDetail = ({ initialLesson, onSave, onCancel, onDelete }) => {
    const [formData, setFormData] = useState({
        id: initialLesson.id || '',
        title: initialLesson.title || '',
        date: initialLesson.date || '',
        time: initialLesson.time || '',
        capacity: initialLesson.capacity || 0,
        description: initialLesson.description || '',
        registrations: initialLesson.registrations ||  []
    });
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [exerciseusers, setExerciseusers] = useState(initialLesson.registrations);
    const [lessonUsersObjects, setLessonUsersObjects] = useState([]);

    // Načtení uživatelů při načtení komponenty
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/users`);
                setUsers(response.data);
            } catch (error) {
                console.error('Chyba při načítání uživatelů:', error);
            }
        };
        fetchUsers();
    }, [initialLesson.id]); // Zde přidáme initialLesson.id jako závislost, aby se načetli uživatelé při změně lekce.

    useEffect(() => {
        const fetchExerciseUsers = async () => {
            try {
                const usersIds = exerciseusers; // Seznam id uživatelů
                const fetchedUsers = [];
                for (const userId of usersIds) {
                    const userResponse = await axios.get(`http://localhost:8080/api/users/${userId}`);
                    fetchedUsers.push(userResponse.data);
                }
                // Aktualizace stavu lessonUsersObjects s načtenými uživateli
                setLessonUsersObjects(fetchedUsers);
            } catch (error) {
                console.error('Chyba při načítání uživatelů:', error);
            }
        };

        fetchExerciseUsers();
    }, [exerciseusers]); // Zde přidáme exerciseusers jako závislost, aby se načetli uživatelé při jejich změně.


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddUser = async (user) => {
        try {
            // Přidání uživatele k lekci v lokální stavu formuláře
            const updatedFormData = { ...formData };
            updatedFormData.registrations.push(user.id);
            setFormData(updatedFormData);

            // Vytvoření objektu pro aktualizaci lekce
            const updatedExercise = {
                id: formData.id,
                title: formData.title,
                date: formData.date,
                time: formData.time,
                capacity: formData.capacity,
                registrations: updatedFormData.registrations,
                description: formData.description
            };

            // Aktualizace lekce na backendu
            await axios.put(`http://localhost:8080/api/exercises/${formData.id}`, updatedExercise);

            console.log('Uživatel byl úspěšně přidán k lekci');

            // Aktualizace seznamu uživatelů
            setUsers([...users, user]);
        } catch (error) {
            console.error('Chyba při přidávání uživatele k lekci:', error);
        }
    };


    const handleRemoveUser = async (userId) => {
        try {
            // Volání API pro odebrání uživatele z lekce
            await axios.delete(`http://localhost:8080/api/exercises/${initialLesson.id}/users/${userId}`);
            console.log('Uživatel byl úspěšně odebrán z lekce');
            // Aktualizace seznamu uživatelů
            setUsers(users.filter(id => id !== userId));
        } catch (error) {
            console.error('Chyba při odebírání uživatele z lekce:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };


    return (
        <div className="admin-lesson-detail-container">
            <h3>Upravit lekci</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Název:</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Datum:</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Čas:</label>
                    <input type="time" name="time" value={formData.time} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Kapacita:</label>
                    <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Popis:</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required />
                </div>
                <div className="button-group">
                    <button type="submit" className="save-button">Uložit</button>
                    <button type="button" className="delete-button" onClick={onDelete}>Zrušit lekci</button>
                    <button type="button" className="cancel-button" onClick={onCancel}>Odejít</button>
                </div>
            </form>
            <div className="registered-users">
                <h4>Přihlášení uživatelé:</h4>
                <ul>
                    {lessonUsersObjects.map((user) => (
                        <li key={user.id}>
                            {user.username}
                            <button onClick={() => handleRemoveUser(user.id)}>Odebrat</button>
                        </li>
                    ))}
                </ul>
                <div className="users-not-registered">
                    <h4>Uživatelé k přidání:</h4>
                    <ul>
                        {users
                            .filter(user => users.find(u => u.id === user.id)) // Filtruj uživatele, kteří nejsou přihlášení na lekci
                            .map((user) => (
                                <li key={user.id}>
                                    {user.username}
                                    <button onClick={() => handleAddUser(user)}>Přidat</button>
                                </li>
                            ))}
                    </ul>
                </div>

            </div>
        </div>
    );
};

AdminLessonDetail.propTypes = {
    initialLesson: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};


export default AdminLessonDetail;
