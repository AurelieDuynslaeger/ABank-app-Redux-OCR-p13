// src/components/Input.jsx
import PropTypes from 'prop-types';

const Input = ({ id, label, type, checked, onChange, value, autocomplete }) => {
    return (
        <div className={`input-wrapper ${type === 'checkbox' ? 'input-remember' : ''}`}>
            <label htmlFor={id}>{label}</label>
            {type === 'checkbox' ? (
                <>
                    <input 
                    type={type} 
                    id={id} 
                    checked={checked} 
                    onChange={onChange} 
                    autoComplete={autocomplete}
                    />
                    <label htmlFor={id}>{label}</label>
                </>
            ) : (
                <input 
                type={type} 
                id={id} 
                value={value} 
                onChange={onChange} 
                autoComplete={autocomplete}
                />
            )}
        </div>
    );
};

Input.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.string,
    autocomplete: PropTypes.string,
};


export default Input;
