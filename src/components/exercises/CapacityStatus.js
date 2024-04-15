import React from 'react';
import '../../assets/styles/exercises/CapacityStatus.css';

const CapacityStatus = ({ lesson }) => {
    const { capacity, registrations } = lesson;

    // Počet registrovaných účastníků
    const enrolled = registrations !== undefined ? registrations.length : 0;

    // Determinovat, zda je kapacita plná
    const isFull = enrolled === capacity;

    return (
        <div className={`capacity-status ${isFull ? 'full' : ''}`}>
            <p>Kapacita: {capacity}</p>
            <p>Přihlášeno: {enrolled}</p>
        </div>
    );
};

export default CapacityStatus;
