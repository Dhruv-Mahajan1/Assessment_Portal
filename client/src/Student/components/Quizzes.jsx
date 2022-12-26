import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";

import Header from "../components/Header";
import { React, useState, useEffect } from "react";
import axios from "axios";





const Quizzes = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  const [Loading, setLoading] = useState(true);
  const [Quiz, setQuiz] = useState([]);
    useEffect(() => {
      getData()
    },[]);
  
    async function getData() {
  
      const response = await fetch ("http://127.0.0.1:8000/api/student/getQuizScore/1", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
  
      const result = await response.json();
      setLoading(false);
  
      setQuiz(result);
      
  
      }

  

  var getKeys = function(Quiz){
    var keys = [];
    for(var key in Quiz){
      for(var i in Quiz[key]){
        var kd=
  {
    field:i, headerName:i
  }

       keys.push(kd);
    }

    
  break;
}
    return keys;
 }

const columns=getKeys(Quiz);



  return (
    <Box m="20px">
      <Header title="Quizzes" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={Quiz} columns={columns} />
      </Box>
    </Box>
  );
};

export default Quizzes;
