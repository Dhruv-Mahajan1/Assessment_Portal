import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";

export default function QuestionForm(props) {
  const [submitclicked, setsubmitclicked] = useState(false);
  const b = props.bar;

  console.log("hi", props.quizId);

  const [question, setquestion] = useState({
    studentRollNo: "B20EE016",
    quizId: parseInt(props.quizId),
    questionId: b[props.number - 1].questionId,
    // bar: b,
    response: b[props.number - 1].response,
    selfScore: "",
    // type: "",
  });
  // console.log(question);

  const [bar, setBar] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    const url =
      "http://127.0.0.1:8000/api/quiz/getcorrectanswer/" +
      b[props.number - 1].questionId;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });

    const result = await response.json();

    setBar(result);
    setquestion({
      ...question,
      correctAnswer: bar.correctAnswer,
    });
  }

  const handleDescriptionChange = (event) => {
    setquestion({
      ...question,
      description: event.target.value,
    });
  };
  const handleMarksChange = (event) => {
    setquestion({
      ...question,
      selfScore: event.target.value,
    });
  };
  // const handleTypeChange = (event) => {
  //   setquestion({
  //     ...question,
  //     type: event.target.value,
  //     // quizId: props.quizId,
  //   });
  // };

  const submitquestion = () => {
    setsubmitclicked(!submitclicked);

    console.log(question);

    if (submitclicked) {
    }
    if (!submitclicked) {
      // console.log("heeee");
      const newQuestion = question;
      const url =
        "http://127.0.0.1:8000/api/student/putSelfResponse/" + props.quizId;
      fetch(url, {
        method: "PUT",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        }),
        body: JSON.stringify(newQuestion),
      })
        .then((response) => response.json())
        .then((data) => {
          setquestion({
            ...question,

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
  console.log(props.number);

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
          {/* <TextField
            required
            id="outlined-multiline-flexible"
            label="Description"
            multiline
            maxRows={4}
            value={question.description}
            onChange={handleDescriptionChange}
          /> */}
          <TextField
            required
            id="outlined-multiline-flexible"
            label="Correct Answer"
            multiline
            InputLabelProps={{
              shrink: true,
            }}
            maxRows={4}
          />
          <TextField
            required
            id="outlined-required"
            label="Given Answer"
            multiline
            value={b[props.number - 1].response}
            disabled={true}
            // onChange={handleTypeChange}
          />
          <TextField
            id="outlined-number"
            label="Score"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
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
            {submitclicked ? "Added" : "Add Score"}
          </Button>
        </div>
      </Box>
    </>
  );
}
