import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Button = ({ children, onClick, disabled }) => {
    return (
        <button className="Button" onClick={onClick} disabled={disabled}>
            { children }
        </button>
    )
}

Button.propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
}

Button.defaultProps = {
    onClick: () => {},
    disabled: false,
    children: null,
}

export default Button;
