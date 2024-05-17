import React from 'react';

function InputBox({ label, name, value = '', onChange, required, width }) {
  const handleChange = (event) => {
    if (onChange) {
      onChange(event.target.value);
    }
  }

  return (
    <div>
      <label className="input-label">{label}</label>
      <input 
        type="text" 
        name={name}
        value={value} 
        onChange={handleChange} 
        className={`input-field ${required ? 'required' : ''}`} 
        {...(required && { required: true })}
      />
    </div>
  );
}

export default InputBox;