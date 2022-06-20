import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [commits, setCommits] = useState([]);
  const getCommitsRecursively = (commits, index = 0) => {
    if (commits[index + 1]) {
      getCommitsRecursively(commits, index + 1);
    }
    if (commits[index]) {
      setCommits((prevState) => {
        return [...prevState, commits[index].commit];
      });
    }
  };
  useEffect(() => {
    axios({
      method: "get",
      url: "https://api.github.com/repos/gt1990/crossroads-group/commits",
    }).then((response) => {
      // console.log("STATUS: ", response.status, response.statusText);
      console.log(response.data[0].commit);
      if (response.status === 200) {
        getCommitsRecursively(response.data);
      }
    });
  }, []);

  return <h1></h1>;
}

export default App;
