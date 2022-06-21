import "../css/commit.css";

const Commit = ({ data, commitNumber }) => {
  const date = new Date(data.commit.author.date);
  const timeStamp = date.toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    timeZoneName: "short",
  });
  console.log("Date: ", date, timeStamp);
  return (
    <div className="card">
      {data.commit.message}
      <div className="details">
        {console.log(data)}
        <img
          className="avatar"
          src={data.author.avatar_url}
          alt="Author's Avatar"
        />
        {data.author.login}
        {}
      </div>
      <span className="commit_number">#{commitNumber}</span>
    </div>
  );
};

export default Commit;
