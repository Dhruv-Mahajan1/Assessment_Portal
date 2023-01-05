import React from "react";
import { Routes, Route,useNavigate } from "react-router-dom";
import { useState, Link } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Navbar from "./tiles/Navbar";
import Side from "./tiles/Side";
import Peer from "./components/Peer";
import Self from "./components/Self";
import Calender from "./components/Calender";
import Classwork from "./components/Classwork";
import Quizzes from "./components/Quizzes";
import "./index.css";
import { Calendar } from "antd";

const Main = () => {
  const [theme, colorMode] = useMode();
  const [bar, setBar] = useState("");
  const navigate = useNavigate();
  function Load(value) {
    // console.log(value);
    // val=value;
    setBar(value);
    if (value === "My Classwork") {
      console.log("hi");

      return <Quizzes api="http://127.0.0.1:8000/api/student/getQuizScore/1" />;
    }
    if (value === "All Quizzes") {
      return <Classwork />;
    }
    if (value === "Peer Assessment") {
      return <Peer />;
    }
    if (value === "Self Assessment") {
      return <Self />;
    }
    if (value === "Upcoming Quizzes") {
      return <Calender />;
    }
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div>
          <Navbar />
        </div>

        <div display="flex">
          <Side Load={Load} />

          <main className="content">
            {console.log("The value of bar is" + bar)}

            {bar === "Dashboard" && (
              <Quizzes api="http://127.0.0.1:8000/api/student/getQuizScore/1" />
            )}
       {bar === "All Quizzes" && (
              <Quizzes api="http://127.0.0.1:8000/api/student/getQuizScore/1" />
            )}
             {bar === "Upcoming Quizzes" && (
              <Calendar/>
            )}
             {bar === "Self Evaluation" && (
              navigate('/createquiz')
            )}
             {bar === "Peer Evaluation" && (
              <Quizzes api="http://127.0.0.1:8000/api/student/getQuizScore/1" />
            )}

          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Main;