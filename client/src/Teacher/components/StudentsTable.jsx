import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StudentsTable = ({ students }) => {
  return (
    <TableContainer component={Paper} style={{ width: "75%" }}>
      <Table sx={{ minWidth: 350 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Sr No.</TableCell>
            <TableCell align="center">Roll No.</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Self Score</TableCell>
            <TableCell align="center">Peer Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student, index) => (
            <TableRow
              key={student.rollNo}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell align="center">{student.rollNo}</TableCell>
              <TableCell align="center">{student.name}</TableCell>
              <TableCell align="center">{student.selfScore}</TableCell>
              <TableCell align="center">{student.peerScore}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentsTable;
