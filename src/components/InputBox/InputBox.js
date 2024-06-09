import './InputBox.css';

function InputBox({ label, name, val, onChange, required, width }) {

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