import axios from "axios"; // fetching api data
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Commit from "./components/Commit";
import Loading from "./components/Loading";
import Slider from "./components/Slider";

import "./css/app.css";

function App() {
  console.log("APP");
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]); // storing errors from api request

  const [data, setData] = useState([]); // storing array of github commit objects
  const [currentCommitIndex, setCurrentCommitIndex] = useState(0);

  /**
   * getCommitsRecursively():
   * - recursive function that goes through all commits
   * - takes in an array of commit objects and saves them in state
   * @param {object[]} commitsData
   * @param {number} index
   */
  const getCommitsRecursively = (commitsData, index = 0) => {
    if (commitsData[index + 1]) {
      getCommitsRecursively(commitsData, index + 1);
    }
    if (commitsData[index]) {
      setData((prevState) => {
        return [...prevState, commitsData[index]];
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

  /**
   * useEffect()
   * - gets called when the commits state changes
   * - this triggers the loading state to become false
   * - and sets the currentCommitIndex to the last index in the commits array
   */
  useEffect(() => {
    if (data.length) {
      setCurrentCommitIndex(data.length - 1);
      // using setTimeout just to show the loading spinner for a second
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [data]);

  return (
    <main id="main">
      {loading ? <Loading /> : <Header numberOfCommits={data.length} />}
      {!loading && data.length ? (
        <>
          <Commit
            data={data[currentCommitIndex]}
            commitNumber={currentCommitIndex}
          />
          <Slider
            numberOfCommits={data.length}
            changeCommit={setCurrentCommitIndex}
          />
        </>
      ) : null}
    </main>
  );
}

export default App;
