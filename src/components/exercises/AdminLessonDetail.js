import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/exercises/AdminLessonDetail.css';

const AdminLessonDetail = ({ lesson, onSave, onCancel, onDelete }) => {
    const [formData, setFormData] = useState({
        title: lesson.title,
        date: lesson.date,
        time: lesson.time,
        capacity: lesson.capacity,
        description: lesson.description,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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
        </div>
    );
};

AdminLessonDetail.propTypes = {
    lesson: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default AdminLessonDetail;
