import axios from "axios"; // fetching api data
import { useState, useEffect } from "react";

function App() {
  const [commits, setCommits] = useState([]); // storing array of github commit objects
  const [errors, setErrors] = useState([]); // storing errors from api request

  /**
   * getCommitsRecursively():
   * - recursive function that goes through all commits
   * - takes in an array of commit objects and saves them in state
   * @param {object[]} commits
   * @param {number} index
   */
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

  /**
   * useEffect()
   * - gets called once, like componentDidMount()
   * - makes the api request using axios
   */
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
