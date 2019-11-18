import React from 'react';
import './style.css';
import iconUrl from './ic_error.png';

const ErrorIndicator = ({err = ''}) => {
    return (
        <div className="error-indicator">
            <img src={iconUrl} alt="error-icon" />
            <div>{`Ошибка: ${err}`}</div>
        </div>
    );
}

export default ErrorIndicator;