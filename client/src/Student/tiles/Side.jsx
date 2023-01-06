import { useState } from "react";
import { ProSidebarProvider, Menu, MenuItem } from "react-pro-sidebar";
import { Box,  Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import "./navbar.css";
import { React, useEffect } from "react";
import LoadingSpin from "react-loading-spin";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Side = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [Loading, setLoading] = useState(true);

  props.Load(selected);


  const [Student, setStudent] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const response = await fetch(
      "http://127.0.0.1:8000/api/student/studentDetails",
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      }
    );

    const result = await response.json();
    setLoading(false);

    setStudent(result);

    // .then((resp) => console.log(resp.data))
    // .then((resp) => setStudent(resp))

    // .then(function(response){return response.json();})
    // .then(function(data){
    //  setStudent(data);
    //  const items=data;
    //   console.log(items)
    // })
    // .catch((error) => console.log(error));
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
    <Box className="nav-container" maxWidth="20%">
      <ProSidebarProvider collapsed={isCollapsed}>
        <Menu>
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
          ></MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
              ></Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {Student.name}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {Student.studentrollno}
                  <br></br>
                  {Student.branch}
                </Typography>
              </Box>
            </Box>
          )}

          <Box>
            <Item
              title="Dashboard"
              // routerLink={<Calender/>}
              // Link to="/calender"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography> */}

            {/* <Item
              title="All Quizzes"
              // routerLink={<Calender/>}
              // // routerLink={<Link to="/calendar" />}
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

{/*     

            <Item
              title="Upcoming Quizzes"
              // to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Assessment
            </Typography>

            <Item
              title="Self Evaluation"
              // to="/self"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Peer Evaluation"
              // to="/peer"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebarProvider>
    </Box>
  );
};

export default Side;