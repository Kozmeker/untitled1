import React from 'react';

const LessonDescription = ({ description }) => {
    return (
        <div className="lesson-description">
            <h3>Podrobný popis lekce:</h3>
            <p>{description}</p>
        </div>
    );
};

export default LessonDescription;
