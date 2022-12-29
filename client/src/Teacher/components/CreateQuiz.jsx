import React from 'react';
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
import { useState } from 'react';

const CreateQuiz = () => {
    
    const [theme, colorMode] = useMode();
    const [number, setNumber] = useState(0);
    const [rows, setRows] = useState([]);

    const handleChange = (event) => {
        setNumber(event.target.value);
    }
    const assignRows = () => {
        const value = number;
        setRows([...Array(Number(value)).keys()]);
    }
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
            <Grid item>

                <Typography color="grey">
                    Number of questions:    
                    <input type="number" onChange={handleChange}  />
                    
                </Typography>
            </Grid> 
            <Grid item>
                <Button onClick={assignRows} variant="contained" color="success" size="small">Submit</Button>
            </Grid>
        </Grid>
        <br /><br /><br />
        {rows.map((row) => (
          <div key={row}>
            <Grid container spacing={2} justifyContent="center">
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
            </Grid>
          </div>
        ))}
        <br /><br />
        <div style={{display: "flex", justifyContent: "center"}}>
        <Button onClick={assignRows} variant="contained" color="success" size="large" >Create Quiz</Button>
        </div>
      </form>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default CreateQuiz;