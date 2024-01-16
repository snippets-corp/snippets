import React from "react";
import './ColorChanger.css';

const ColorChanger = ({handleChange}) => {

    // for light and dark mode

    const setDarkMode = () => {
      document.querySelector('body').setAttribute('data-theme', 'dark');
    };

    const setLightMode = () => {
      document.querySelector('body').setAttribute('data-theme', 'light');
    };

    const toggleMode = (e) => {
      if (e.target.checked) setDarkMode();
      else setLightMode();
    };

  return(
    <>
      <div className="toggle-container">
        <input 
          type="checkbox"
          id="check"
          className="toggle"
          onChange={toggleMode}
        />
        <label htmlFor="check">Dark</label>
      </div>
    </>
  );
};

export default ColorChanger;