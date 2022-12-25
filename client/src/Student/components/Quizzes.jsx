import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockDataTeam } from "../data/mockData";
import Header from "../components/Header";
import { React, useState, useEffect } from "react";
import axios from "axios";


const Quizzes = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [Student, setStudent] = useState([]);

  // useEffect(() => {
  //   fetch("http://127.0.0.1:8000/api/student/studentDetails", {
  //     method: "GET",
  //     headers: {
  //       "Content-type": "application/json",
  //       Authorization: "Bearer " + localStorage.getItem("access_token"),
  //     },
  //   })
  //     .then((resp) => console.log(resp.json()))
  //     // .then((resp) => setStudent(resp))
  //     .catch((error) => console.log(error));
  // }, []);

  const columns = [
    { field: "StudentRollNo", headerName: "Roll Number" },
    {
      field: "Name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    // {
    //   field: "age",
    //   headerName: "Name",
    //   type: "number",
    //   headerAlign: "left",
    //   align: "left",
    // },
    // {
    //   field: "phone",
    //   headerName: "Phone Number",
    //   flex: 1,
    // },
    // {
    //   field: "email",
    //   headerName: "Email",
    //   flex: 1,
    // },
  ];

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
        <DataGrid checkboxSelection rows={Student} columns={columns} />
      </Box>
    </Box>
  );
};

export default Quizzes;
