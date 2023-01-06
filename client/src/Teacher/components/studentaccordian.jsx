import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Studentsparticulartable from "./studentparticularquizdetails";
import LoadingSpin from "react-loading-spin";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
export default function Studentaccordian(props) {
  let params = useParams();
  const [Loading, setLoading] = useState(true);
  const [details, setdetails] = useState();
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const response = await fetch(
      `http://127.0.0.1:8000/api/student/getResponse/${params.quizId}`,
      {
        method: "PUT",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        }),
        body: JSON.stringify({ studentRollNo: props.rollNo }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        setdetails(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  if (Loading) {
    return (
      <div>
        {" "}
        <center>
          <LoadingSpin size="50px" />
        </center>
      </div>
    );
  }
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            {props.name} ({props.rollNo}){" "}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Studentsparticulartable details={details} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
