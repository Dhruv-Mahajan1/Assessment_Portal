import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";

export default function QuestionForm(props) {
  const [submitclicked, setsubmitclicked] = useState(false);
  const [correctans, setcorrectans] = useState();
  console.log("gg", props.quizId);
  const [question, setquestion] = useState({
    quizId: parseInt(props.quizId),
    name: props.question,
    description: "none",
    totalMarks: " ",
    type: "none",
  });
  const handleDescriptionChange = (event) => {
    setcorrectans(event.target.value);
  };
  const handleMarksChange = (event) => {
    setquestion({
      ...question,
      totalMarks: event.target.value,
      quizId: props.quizId,
    });
  };
  const handleTypeChange = (event) => {
    setquestion({
      ...question,
      type: event.target.value,
    });
  };

  const submitquestion = () => {
    setsubmitclicked(!submitclicked);
    console.log(question);
    if (submitclicked) {
    }
    if (!submitclicked) {
      console.log("heeee");
      const newQuestion = question;
      fetch("http://127.0.0.1:8000/api/teacher/addquestion/", {
        method: "POST",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        }),
        body: JSON.stringify(newQuestion),
      })
        .then((response) => response.json())
        .then((data) => {
          fetch(
            `http://127.0.0.1:8000/api/quiz/postcorrectanswer/${data.questionId}/${question.quizId}/`,
            {
              method: "POST",
              headers: new Headers({
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access_token"),
              }),
              body: JSON.stringify({ ca: correctans }),
            }
          )
            .then((response) => response.json())
            .then((data) => {
              setcorrectans();
              console.log(data);
            })
            .catch((error) => {
              console.error(error);
            });

          setquestion({
            ...question,
            description: "",
            totalMarks: " ",
            type: "",
          });
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "35ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            id="outlined-multiline-flexible"
            label="Correct Answer"
            multiline
            maxRows={4}
            onChange={handleDescriptionChange}
          />
          <TextField
            id="outlined-number"
            label="Total Marks"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={question.totalMarks}
            onChange={handleMarksChange}
          />
        </div>
        <div style={{ padding: "0.6%" }}>
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={submitquestion}
            disabled={submitclicked}
          >
            {submitclicked ? "Added" : " Add Question"}
          </Button>
        </div>
      </Box>
    </>
  );
}
