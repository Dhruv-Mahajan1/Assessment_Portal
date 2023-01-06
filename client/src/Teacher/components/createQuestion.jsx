import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import QuestionForm from "./CreateQuestionForm";
export default function Question(props) {
  console.log("hwww", props.quizId);
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Question {props.number}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Enter the Details</Typography>
          <QuestionForm
            quizId={props.quizId}
            question={`Question ${props.number}`}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
