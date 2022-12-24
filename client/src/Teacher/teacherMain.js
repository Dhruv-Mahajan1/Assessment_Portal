import React from 'react';
import Quizzes from "../Student/components/Quizzes";
import { Button, CssBaseline, ThemeProvider, Grid, Typography } from "@mui/material";
import { ColorModeContext, useMode } from "../Student/theme";
import Navbar from "../Student/tiles/Navbar";
import Side from "./tiles/Side";
import "../Student/index.css";


const TeacherMain = () => {
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
                    <Typography textAlign="center" variant="h1" color="white" fontWeight="Bold" fontSize="80px">
                        Digital Design
                    </Typography>

                    <Grid container spacing={2} justifyContent='center' columns={2} marginTop="27%">
                        <Grid item>
                        <Button variant="contained" color="success" size="large" >
                            Create Quiz
                        </Button>
                        </Grid>
                        <Grid item>
                        <Button variant="contained" color="secondary" size="large" href='/quizzes'>
                            View Quiz
                        </Button>
                        </Grid>
                    </Grid>
                </main>
            </div>

        </ThemeProvider>
        </ColorModeContext.Provider>
  )
}

export default TeacherMain;