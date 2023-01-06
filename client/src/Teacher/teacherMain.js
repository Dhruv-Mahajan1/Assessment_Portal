import React from "react";
import { useState, useEffect } from "react";
import Quizzes from "../Student/components/Quizzes";
import {
  Button,
  CssBaseline,
  ThemeProvider,
  Grid,
  Typography,
} from "@mui/material";
import { ColorModeContext, useMode } from "../Student/theme";
import Navbar from "../Student/tiles/Navbar";
import Side from "./tiles/Side";
import "../Student/index.css";
import LoadingSpin from "react-loading-spin";
import TeacherQuizes from "./components/TeacherQuizes";
import { useNavigate } from "react-router-dom";

const TeacherMain = () => {
  const [theme, colorMode] = useMode();
  const [Teacher, setTeacher] = useState([]);
  const [Loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleClick = (event, param) => {
    navigate(`/createquiz`);
  };

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const response = await fetch(
      "http://127.0.0.1:8000/api/teacher/getteacherdetails",
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      }
    );

    const result = await response.json();
    console.log(result);
    setLoading(false);
    setTeacher(result);
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
          <Navbar />
        </div>

        <div display="flex">
          <Side name={Teacher.name} />
          <main className="content">
            <Typography
              textAlign="center"
              variant="h1"
              color="white"
              fontWeight="Bold"
              fontSize="80px"
            >
              {Teacher.Course}
            </Typography>
            <TeacherQuizes />
            {/* <Button variant="contained" color="success" size="large">
              Create Quiz
            </Button> */}

            <Grid
              container
              spacing={2}
              justifyContent="center"
              columns={2}
              marginTop="4%"
            >
              {/* <Grid item>
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  onClick={(event) => handleClick(event)}
                >
                  Create Quiz
                </Button>
              </Grid> */}
            </Grid>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default TeacherMain;
