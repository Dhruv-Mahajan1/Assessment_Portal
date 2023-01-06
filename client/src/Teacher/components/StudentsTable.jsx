import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Studentaccordian from "./studentaccordian";
const StudentsTable = ({ students }) => {
  return (
    <TableContainer
      component={Paper}
      style={{ width: "75%", overflowY: "scroll" }}
    >
      <Table sx={{ minWidth: 350 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Sr No.</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student, index) => (
            <Studentaccordian
              name={student.name}
              rollNo={student.studentrollno}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentsTable;
