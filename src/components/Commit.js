import "../css/commit.css";

import ReactMarkdown from "react-markdown";

const Commit = ({ data, commitNumber }) => {
  console.log("COMMIT");
  const date = new Date(data.commit.author.date);
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
