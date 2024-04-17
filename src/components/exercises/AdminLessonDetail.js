import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../../assets/styles/exercises/AdminLessonDetail.css';

const AdminLessonDetail = ({ initialLesson, onSave, onCancel, onDelete }) => {
    const [formData, setFormData] = useState(initialLesson);
    const [users, setUsers] = useState([]);
    const [lessonUsersObjects, setLessonUsersObjects] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersResponse, exerciseUsersResponse] = await Promise.all([
                    axios.get('http://localhost:8080/api/users'),
                    Promise.all(formData.registrations.map(userId => axios.get(`http://localhost:8080/api/users/${userId}`)))
                ]);

                setUsers(usersResponse.data);
                setLessonUsersObjects(exerciseUsersResponse.map(response => response.data));

                // Filtrace uživatelů tak, aby zahrnovali pouze ty, kteří nejsou registrováni v lekci
                const filteredUsers = usersResponse.data.filter(user => !formData.registrations.includes(user.id));
                setFilteredUsers(filteredUsers);
            } catch (error) {
                console.error('Chyba při načítání dat:', error);
            }
        };

        fetchData();
    }, [initialLesson.id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddUser = async (user) => {
        try {
            const updatedRegistrations = [...formData.registrations, user.id];
            const updatedExercise = { ...formData, registrations: updatedRegistrations };

            await axios.put(`http://localhost:8080/api/exercises/${formData.id}`, updatedExercise);

            setLessonUsersObjects([...lessonUsersObjects, user]);
            setFilteredUsers(filteredUsers.filter(filteredUser => filteredUser.id !== user.id));
            setFormData({ ...formData, registrations: updatedRegistrations });
        } catch (error) {
            console.error('Chyba při přidávání uživatele k lekci:', error);
        }
    };

    const handleRemoveUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:8080/api/exercises/${initialLesson.id}/users/${userId}`);

            setLessonUsersObjects(lessonUsersObjects.filter(user => user.id !== userId));
            setFilteredUsers([...filteredUsers, users.find(user => user.id === userId)]);
            setFormData({ ...formData, registrations: formData.registrations.filter(regId => regId !== userId) });
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
                        {filteredUsers.map((user) => (
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
