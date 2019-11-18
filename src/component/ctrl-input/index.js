import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const CtrlInput = ({ currentValue, onChange }) => {
    return <input type="text" className="CtrlInput" value={currentValue} onChange={onChange}/>
}

CtrlInput.propTypes = {
    currentValue: PropTypes.string,
    onChange: PropTypes.func,
}

CtrlInput.defaultProps = {
    currentValue: '',
    onChange: () => {},
}

export default CtrlInput;
