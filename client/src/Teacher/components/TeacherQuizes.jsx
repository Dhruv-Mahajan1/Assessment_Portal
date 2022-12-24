import React from 'react';
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, Typography, Button, Grid, useTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { tokens,  ColorModeContext, useMode } from "../../Student/theme";
import QuizTable from './QuizTable';

const quizzes = [
    { name: 'Quiz 1', date: 'January 1, 2021' },
    { name: 'Quiz 2', date: 'January 2, 2021' },
    { name: 'Quiz 3', date: 'January 3, 2021' },
  ];

const TeacherQuizes = () => {
    const [theme, colorMode] = useMode(); 

    return(
        <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <div >
            <div style={{ display: 'flex', justifyContent: 'center' , alignItems: 'center', color: 'white'}}>
                <Typography textAlign="center" variant="h1" color="white" fontWeight="Bold" fontSize="40px">
                    Quiz List
                </Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' , alignItems: 'center', marginTop: '30px'}}>
             <QuizTable quizzes={quizzes}  />
            </div>
        </div>

        <Grid container spacing={2} justifyContent='center' columns={2} marginTop="17%">
            <Grid item>
            <Button variant="contained" color="success" size="large">
                Create Quiz
            </Button>
            </Grid>
            <Grid item>
            <Button variant="contained" color="secondary" size="large" href='/teacher'>
                Go Back
            </Button>
            </Grid>
        </Grid>

        </ThemeProvider>
        </ColorModeContext.Provider>
    )

}

export default TeacherQuizes;