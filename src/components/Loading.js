// CSS
import "../css/loading.css";

// loading component that displays a spinning animation while data is being fetched
const Loading = () => {
  return (
    <div id="loading">
      <div className="spinner"></div>
    </div>
  );
};

export default Loading;
