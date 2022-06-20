import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [commits, setCommits] = useState([]);
  const [errors, setErrors] = useState([]);
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
    })
      .then((response) => {
        if (response.status === 200) {
          getCommitsRecursively(response.data);
        } else {
          setErrors((prevState) => {
            return [...prevState, `${response.status}: ${response.statusText}`];
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setErrors((prevState) => {
          return [
            ...prevState,
            `${error.response.status}:  ${error.message}. Please try again.`,
          ];
        });
      });
  }, []);

  return <h1></h1>;
}

export default App;
