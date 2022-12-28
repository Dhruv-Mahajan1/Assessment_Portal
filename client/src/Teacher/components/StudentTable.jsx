import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StudentTable = ({ quizzes }) => {
  return (
    <TableContainer component={Paper} style={{ width: "75%" }}>
      <Table sx={{ minWidth: 350 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Sr No.</TableCell>
            <TableCell align="center">Quiz Name.</TableCell>
            <TableCell align="center">Self Score</TableCell>
            <TableCell align="center">Peer Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {quizzes.map((quiz, index) => (
            <TableRow
              key={quiz.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell align="center">{quiz.name}</TableCell>
              <TableCell align="center">{quiz.selfScore}</TableCell>
              <TableCell align="center">{quiz.peerScore}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentTable;
