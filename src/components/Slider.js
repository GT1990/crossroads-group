import { useRef } from "react";

import "../css/slider.css";

const Slider = ({ numberOfCommits, changeCommit }) => {
  console.log("SLIDER RENDERING");
  const sliderRef = useRef();
  const handleSliderChange = (e) => {
    console.log(e.target.value);
    const value = e.target.value;
    if (value >= 0 && value <= numberOfCommits - 1) {
      changeCommit(value);
    }
  };
  return (
    <div className="slide_wrapper">
      <input
        type="range"
        min="0"
        max={numberOfCommits}
        defaultValue={numberOfCommits}
        step="1"
        className="slider_input"
        ref={sliderRef}
        onChange={(e) => handleSliderChange(e)}
      />
    </div>
  );
};

export default Slider;
