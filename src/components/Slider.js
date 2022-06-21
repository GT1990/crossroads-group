// CSS
import "../css/slider.css";

// Slider component uses and html range input element to slide through the commit cards
const Slider = ({ numberOfCommits, changeCommit }) => {
  /**
   * Takes the input element to grab its value
   * Then uses the changeCommit function, passed in as a prop, to change parent state.
   * The parent state contains the index of the commit that will be displayed
   * @param {element} e
   */
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
        onChange={(e) => handleSliderChange(e)}
      />
    </div>
  );
};

export default Slider;
