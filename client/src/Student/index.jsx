import React from "react";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Navbar from "./tiles/Navbar";
import Side from "./tiles/Side";
import Peer from "./components/Peer";
import Self from "./components/Self";
import Calender from "./components/Calender";
import Classwork from "./components/Classwork";
import Quizzes from "./components/Quizzes";
import "./index.css"
const Main = () =>{
    const [theme, colorMode] = useMode();
    

    return (
    
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
            <CssBaseline />
    <div>
    <Navbar />
    </div> 
  
    <div display="flex">
        <Side/>
        <main className="content" >
        <Quizzes/>
        </main>
    </div>



    </ThemeProvider>
    </ColorModeContext.Provider>
    )
    }
export default Main;