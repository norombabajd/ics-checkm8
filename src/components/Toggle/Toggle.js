import React, { useState } from 'react';
import './Toggle.css';

const Toggle = () => {
    const [isToggled, setIsToggled] = useState(false);
  
    const toggle = () => {
      setIsToggled(!isToggled);
    };
  
    return (
      <div className={`toggle ${isToggled ? 'active' : ''}`} onClick={toggle}>
        <div className="circle"></div>
      </div>
    );
  };
  
  export default Toggle;