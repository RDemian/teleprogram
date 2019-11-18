import React from 'react';
import './style.scss';

const Spinner = () => {
    return (
        <div className="lds-css">
            <div className="lds-double-ring">
                <div></div>
                <div></div>
                <div>
                    <div></div>
                </div>
                <div>
                    <div></div>
                </div>
            </div>
        </div>
    );
}

export default Spinner;