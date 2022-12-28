import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const QuizTable = ({ quizzes }) => {
  const [id, Setid] = useState();
  const navigate = useNavigate();
  const handleClick = (event, param) => {
    navigate(`/teacherquiz/${param}`);
  };
  return (
    <TableContainer component={Paper} style={{ width: "75%", height: "38vh", overflowY: "scroll" }}>
      <Table sx={{ minWidth: 350 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Sr No.</TableCell>
            <TableCell align="center">Quiz Name</TableCell>
            <TableCell align="center">Quiz Date</TableCell>
            <TableCell align="center"> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {quizzes.map((quiz, index) => (
            <TableRow
              key={quiz.quizId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell align="center">{quiz.name}</TableCell>
              <TableCell align="center">{quiz.dateCreated}</TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  onClick={(event) => handleClick(event, quiz.quizId)}
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default QuizTable;
