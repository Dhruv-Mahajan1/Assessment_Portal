import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
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
import StudentsTable from "./StudentsTable";
import LoadingSpin from "react-loading-spin";

const students = [
  { rollNo: "B20EE016", name: "Dhruv Mahajan", selfScore: 10, peerScore: 10 },
  { rollNo: "B20EE017", name: "Dhruv M", selfScore: 7, peerScore: 8 },
  { rollNo: "B20EE018", name: "Dhruv Ma", selfScore: 8, peerScore: 7 },
];

const TeacherQuiz = () => {
  let params = useParams();
  console.log(params);
  const [theme, colorMode] = useMode();
  const [Loading, setLoading] = useState(true);
  const [Students, setstudents] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const response = await fetch(
      `http://127.0.0.1:8000/api/teacher/getStudents/${params.quizId}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      }
    );

    const result = await response.json();
    setLoading(false);
    setstudents(result);
    console.log(result);

    // .then((resp) => console.log(resp.data))
    // .then((resp) => setStudent(resp))

    // .then(function(response){return response.json();})
    // .then(function(data){
    //  setStudent(data);
    //  const items=data;
    //   console.log(items)
    // })
    // .catch((error) => console.log(error));
  }

  if (Loading) {
    return (
      <div>
        {" "}
        <center>
          <LoadingSpin size="50px" />
        </center>
      </div>
    );
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
            }}
          >
            <Typography
              textAlign="center"
              variant="h1"
              color="white"
              fontWeight="Bold"
              fontSize="40px"
            >
              Students appeared for the quiz
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "30px",
            }}
          >
            <StudentsTable students={Students} />
          </div>
        </div>

        <Grid
          container
          spacing={2}
          justifyContent="center"
          columns={2}
          marginTop="17%"
        >
          <Grid item>
            <Button variant="contained" color="success" size="large">
              Create Quiz
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              href="/teacher"
            >
              Go Back
            </Button>
          </Grid>
        </Grid>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default TeacherQuiz;
