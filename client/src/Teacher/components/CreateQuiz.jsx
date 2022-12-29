import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  useTheme,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import { tokens, ColorModeContext, useMode } from "../../Student/theme";
import { useState } from "react";
import Question from "./Question";
const CreateQuiz = () => {
  const [theme, colorMode] = useMode();
  const [number, setNumber] = useState(0);
  const [name, setName] = useState("");
  const [rows, setRows] = useState([]);
  const [quiz, setQuiz] = useState();
  const handleChange = (event) => {
    setNumber(event.target.value);
  };
  const handlenameChange = (event) => {
    setName(event.target.value);
  };
  const assignRows = () => {
    const value = number;
    console.log(name);
    if (name) {
      const newQuiz = {
        name: name,
      };
      fetch("http://127.0.0.1:8000/api/teacher/addquiz/", {
        method: "POST",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        }),
        body: JSON.stringify(newQuiz),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.quizId);
          setQuiz(data.quizId);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    setRows([...Array(Number(value)).keys()]);
  };
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <form>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Typography variant="h1" fontWeight="bold" color="white">
                Create Quiz
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={4} justifyContent="center" marginTop="5vh">
            <Grid item justifyContent="center">
              <Typography color="grey">
                Quiz Name:
                <input
                  style={{ margin: 5 }}
                  type="text"
                  onChange={handlenameChange}
                />
              </Typography>
            </Grid>
            <Grid item justifyContent="center">
              <Typography color="grey">
                Number of questions:
                <input
                  style={{ margin: 5 }}
                  type="number"
                  onChange={handleChange}
                />
              </Typography>
            </Grid>
            <Grid item>
              <Button
                style={{ margin: 5 }}
                onClick={assignRows}
                variant="contained"
                color="success"
                size="small"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
          <br />
          <br />
          <br />
          {rows.map((row) => (
            <div
              key={row}
              style={{
                paddingRight: "1.6%",
                paddingLeft: "1.6%",
                paddingBottom: "0.6%",
              }}
            >
              {/* <Grid container spacing={2} justifyContent="center">
                <Grid item marginTop="2vh">
                  <Typography>
                    Question:
                    <input type="text" name="question" />
                  </Typography>
                </Grid>
                <Grid item marginTop="2vh">
                  <Typography>
                    Answer:
                    <input type="text" name="answer" />
                  </Typography>
                </Grid>
              </Grid> */}
              <Question number={row + 1} quizId={quiz} />
            </div>
          ))}
          <br />
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              // onClick={assignRows}
              variant="contained"
              color="success"
              size="large"
            >
              Create Quiz
            </Button>
          </div>
        </form>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default CreateQuiz;
