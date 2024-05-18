import React, { useState } from 'react';
import './InputBox.css';

function InputBox({ label, name, val, onChange, required, width }) {
  const [value, setValue] = useState('');
  // const handleChange = (event) => {
  //   if (onChange) {
  //     setValue(event.target.value);
  //   }
  // }

  return (
    <div className="input-component">
      <label className="input-label">{label}</label>
      <input 
        className="input-field"
        style={{width: width}}
        type="text" 
        name={name}
        value={val} 
        onChange={onChange} 
        {...(required && { required: true })}
      />
    </div>
  );
}

export default InputBox;