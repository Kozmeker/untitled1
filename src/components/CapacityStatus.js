import React from 'react';
import '../assets/styles/CapacityStatus.css';

const CapacityStatus = ({ lesson }) => {
    return (
        <div className="capacity-status">
            <p>Kapacita: {lesson.capacity}</p>
            <p>Přihlášeno: {lesson.registrations.length}</p>
        </div>
    );
};

export default CapacityStatus;
