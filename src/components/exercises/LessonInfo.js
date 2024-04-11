import React from 'react';
import moment from 'moment'; // Importovat moment.js pro manipulaci s daty
import '../../assets/styles/exercises/LessonInfo.css';

const LessonInfo = ({ lesson }) => {
    const { date, time } = lesson;

    // Formátování data do požadovaného formátu (např. 23.4.2024)
    const formattedDate = moment(date).format('D.M.YYYY');

    return (
        <div className="lesson-info">
            <p>Datum: {formattedDate}</p>
            <p>Čas: {time}</p>
        </div>
    );
};

export default LessonInfo;
