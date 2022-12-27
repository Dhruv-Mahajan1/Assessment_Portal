import React from 'react';
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, Typography, Button, Grid, useTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { tokens,  ColorModeContext, useMode } from "../../Student/theme";
import StudentsTable from './StudentsTable';

const students = [
    { rollNo: 'B20EE016', name: 'Dhruv Mahajan', selfScore: 10, peerScore: 10},
    { rollNo: 'B20EE017', name: 'Dhruv M', selfScore: 7, peerScore: 8},
    { rollNo: 'B20EE018', name: 'Dhruv Ma', selfScore: 8, peerScore: 7},
  ];

const TeacherQuiz = () => {
    const [theme, colorMode] = useMode(); 

    return(
        <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <div >
            <div style={{ display: 'flex', justifyContent: 'center' , alignItems: 'center', color: 'white'}}>
                <Typography textAlign="center" variant="h1" color="white" fontWeight="Bold" fontSize="40px">
                    Students appeared for the quiz
                </Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' , alignItems: 'center', marginTop: '30px'}}>
             <StudentsTable students={students}  />
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

export default TeacherQuiz;