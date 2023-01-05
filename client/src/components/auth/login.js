import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios/login";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";

import axios from "axios";

//MaterialUI
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { gapi } from "gapi-script";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });
  const [student, setstudent] = useState({
    user: "",
    studentrollno: "",
    name: "",
    branch: "",
  });

  const [formData, updateFormData] = useState(initialFormData);
  let currentStudent;

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  currentStudent = {
    user: "hi",
    studentrollno: localStorage.getItem("rollnumber"),
    name: localStorage.getItem("name"),
    branch: localStorage.getItem("branch"),
  };

  // async function Call() {
  //   const ser = localStorage.getItem("user");

  //   setstudent({
  //     user: "hi",
  //     studentrollno: localStorage.getItem("rollnumber"),
  //     name: localStorage.getItem("name"),
  //     branch: localStorage.getItem("branch"),
  //   });
  //   console.log(student);
  // }

  // const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    axiosInstance
      .post(`auth/token/`, {
        grant_type: "password",
        username: formData.email,
        password: formData.password,
        client_id: "qEaPqjHXj0r6vWNLe6VJuXbPs7xUxAVyi1gGj6RM",
        client_secret:
          "jFlbTX64XwcfC2Y7fchsc7jXhSNAxwcrCnyptLQneYIzNOZ5nz0I9VQDfqO5tDWz3xqlI0jT6dDmKzE32rLgNUf1LeLW4lO4fmrgclrnsBxLOIoZrbNi1e2QSI7qwXqI",
      })
      .then((res) => {
        console.log("Teacher Logged In!!");
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("refresh_token", res.data.refresh_token);
        navigate("/Teacher");
        // window.location.reload();
      });
  };

  const clientId =
    "361102340568-4g5oqh4fu0vr5aglh6apigtegs0joelv.apps.googleusercontent.com";

  useEffect(() => {
    const initClient = () => {
      gapi.auth2.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  async function googleLogin(accesstoken) {
    console.log(accesstoken);
    axios
      .post(`http://127.0.0.1:8000/auth/convert-token`, {
        token: accesstoken,
        backend: "google-oauth2",
        grant_type: "convert_token",
        client_id: "d1f5TaEkl2WKkg4Ce0sBy5BI6rEwvBf1VCjwokIl",
        client_secret:
          "qupUMc13iKSmkDv0bSl2L5Ho2g2NiVuRejCgfa7jBstYuS1fbnMqEEH3jRFWbO3VSYqLA4Mj6aTAJrXiQ9UAVahHbY4vpVqawFVQmDCMh5wWEqOWvLvkgAvsw5nGhAyI",
      })

      .then((res) => {
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("refresh_token", res.data.refresh_token);
        // setstudent({
        //   user: localStorage.getItem("user"),
        //   studentrollno: localStorage.getItem("rollnumber"),
        //   name: localStorage.getItem("name"),
        //   branch: localStorage.getItem("branch"),
        // });

        // console.log(student);
        // Call();

        navigate("/Student");
        currentStudent = {
          user: localStorage.getItem("user"),
          studentrollno: localStorage.getItem("rollnumber"),
          name: localStorage.getItem("name"),
          branch: localStorage.getItem("branch"),
        };
        // console.log(currentStudent, "bye");
        fetch("http://127.0.0.1:8000/api/student/addstudent", {
          method: "POST",
          headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          }),
          body: JSON.stringify(currentStudent),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.error(error);
          });
      });
  }
  console.log(student);
  googleLogin();

  const responseGoogle = (response) => {
    localStorage.setItem(
      "rollnumber",
      response.profileObj.familyName.slice(
        1,
        response.profileObj.familyName.length - 1
      )
    );
    localStorage.setItem(
      "user",
      response.profileObj.email.slice(0, response.profileObj.email.length - 11)
    );
    localStorage.setItem("name", response.profileObj.givenName);
    localStorage.setItem("branch", response.profileObj.familyName.slice(4, 6));
    console.log(localStorage.getItem("user"));

    googleLogin(response.tokenObj.access_token);
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <GoogleLogin
            clientId="361102340568-4g5oqh4fu0vr5aglh6apigtegs0joelv.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
