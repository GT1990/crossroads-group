// IMPORTS
import ReactMarkdown from "react-markdown"; // used for styling
// CSS
import "../css/commit.css";

// Component displays a card with commit message and info
const Commit = ({ data, commitNumber }) => {
  // creating a date object using the commit timestamp
  const date = new Date(data.commit.author.date);
  // converting date and time to PST with formating to shorten time and date
  const timeStamp = date.toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    dateStyle: "short",
    timeStyle: "short",
  });
  return (
    <div className="card">
      <span className="commit_number">#{commitNumber}</span>
      <div className="commit_message">
        <ReactMarkdown>{data.commit.message}</ReactMarkdown>
      </div>
      <div className="details">
        <img
          className="avatar"
          src={data.author.avatar_url}
          alt="Author's Avatar"
        />
        {data.author.login}
        <br />
        {timeStamp}
      </div>
    </div>
  );
};

export default Commit;
