import React from 'react';
import '../assets/styles/LessonInfo.css';

const LessonInfo = ({ lesson }) => {
    const { title, date, time } = lesson;

    return (
        <div className="lesson-info">
            <p>Datum: {date}</p>
            <p>Čas: {time}</p>
        </div>
    );
};

export default LessonInfo;
