import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Studentaccordian from "./studentaccordian";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingSpin from "react-loading-spin";
const Studentsparticulartable = (props) => {
  // const details = [
  //   { name: "Dhruv Mahajan", selfScore: 10, peerScore: 10 },
  //   { name: "Dhruv M", selfScore: 7, peerScore: 8 },
  //   { name: "Dhruv Ma", selfScore: 8, peerScore: 7 },
  // ];
  console.log("ffff", props.details);
  return (
    <TableContainer
      component={Paper}
      style={{ width: "100%", height: "38vh", overflowY: "scroll" }}
    >
      <Table sx={{ minWidth: 350 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Sr No.</TableCell>
            {/* <TableCell align="center">Roll No.</TableCell> */}
            <TableCell align="center">Roll NO</TableCell>
            {/* <TableCell align="center">Branch</TableCell> */}
            <TableCell align="center">Self Score</TableCell>
            <TableCell align="center">Peer Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.details.map((student, index) => (
            <TableRow
              key={student.rollNo}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{index + 1}</TableCell>
              {/* <TableCell align="center">{student.studentrollno}</TableCell> */}
              <TableCell align="center">{student.studentRollNo}</TableCell>
              {/* <TableCell align="center">{student.branch}</TableCell> */}
              <TableCell align="center">{student.selfScore}</TableCell>
              <TableCell align="center">{student.peerScore}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Studentsparticulartable;
