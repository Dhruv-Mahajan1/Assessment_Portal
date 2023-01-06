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
import StudentMappedTable from "./StudentMappedTable";
const students = [
  { rollNo: "B20EE016", name: "Dhruv Mahajan", selfScore: 10, peerScore: 10 },
  { rollNo: "B20EE017", name: "Dhruv M", selfScore: 7, peerScore: 8 },
  { rollNo: "B20EE018", name: "Dhruv Ma", selfScore: 8, peerScore: 7 },
];

const TeacherQuiz = () => {
  let params = useParams();
  console.log(params);
  let currentData;
  const [theme, colorMode] = useMode();
  const [Loading, setLoading] = useState(true);
  const [Loading2, setLoading2] = useState(true);
  const [ismapped, setismapped] = useState(false);
  const [Students, setstudents] = useState([]);
  const [data, setdata] = useState({});
  const [submitclicked, setsubmitclicked] = useState(false);
  useEffect(() => {
    getData();
    getData1();
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

    const response1 = await fetch(
      `http://127.0.0.1:8000/api/quiz/getparticularQuiz/${params.quizId}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      }
    );

    const result = await response.json();
    const result1 = await response1.json();
    setLoading(false);
    setstudents(result);
    setismapped(result1["mapped"]);
    console.log(result1["mapped"]);
  }
  async function getData1() {
    const response = await fetch(
      `http://127.0.0.1:8000/api/teacher/doStudentMapping/${params.quizId}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      }
    );

    const result = await response.json();
    setLoading2(false);
    setdata(result);
    console.log(result);
  }
  async function setmapping() {
    const response3 = await fetch(
      `http://127.0.0.1:8000/api/quiz/dpmappquiz/${params.quizId}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      }
    );
  }

  const submitquestion = () => {
    setsubmitclicked(!submitclicked);
    setismapped(true);
    setmapping();
    getData1();
  };

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
        <div style={{ margin: "1.9%", paddingLeft: "45%" }}>
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={submitquestion}
            disabled={ismapped}
          >
            {ismapped ? "Mapped" : "Do Student Mapping"}
          </Button>
        </div>
        {ismapped && !Loading2 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "30px",
            }}
          >
            <StudentMappedTable students={data} />
          </div>
        )}

        <Grid
          container
          spacing={2}
          justifyContent="center"
          columns={2}
          marginTop="4%"
        >
          <Grid item>
            {/* <Button variant="contained" color="success" size="large">
              Create Quiz
            </Button> */}
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
