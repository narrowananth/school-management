import { Box, Grid } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ClassDetails from "./containers/class/ClassDetails";
import ClassList from "./containers/class/ClassList";
import CssBaseline from "@mui/material/CssBaseline";
import Login from "./containers/login/Login";
import PayFee from "./containers/student/PayFee";
import React from "react";
import Sidebar from "./containers/sidebar/Sidebar";
import StaffDetails from "./containers/staff/StaffDetails";
import StaffList from "./containers/staff/StaffList";
import StudentDetails from "./containers/student/StudentDetails";
import StudentList from "./containers/student/StudentList";

const App = () => {
  return (
    <Box>
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/school" element={<div>School Home</div>}></Route>
          <Route
            path="/school/class"
            element={
              <Grid container>
                <Grid
                  item
                  md={3}
                  xl={2}
                  sx={{
                    display: { xs: "none", md: "block" },
                    bgcolor: "#f3f3f3",
                  }}
                >
                  <Sidebar></Sidebar>
                </Grid>
                <Grid item xs={12} md={9} xl={10} sx={{ bgcolor: "#f3f3f3" }}>
                  <ClassList></ClassList>
                </Grid>
              </Grid>
            }
          ></Route>
          <Route
            path="/school/class/:className"
            element={
              <Grid container>
                <Grid
                  item
                  md={3}
                  xl={2}
                  sx={{
                    display: { xs: "none", md: "block" },
                    bgcolor: "#f3f3f3",
                  }}
                >
                  <Sidebar></Sidebar>
                </Grid>
                <Grid item xs={12} md={9} xl={10} sx={{ bgcolor: "#f3f3f3" }}>
                  <ClassDetails></ClassDetails>
                </Grid>
              </Grid>
            }
          ></Route>
          <Route
            path="/school/staff"
            element={
              <Grid container>
                <Grid
                  item
                  md={3}
                  xl={2}
                  sx={{
                    display: { xs: "none", md: "block" },
                    bgcolor: "#f3f3f3",
                  }}
                >
                  <Sidebar></Sidebar>
                </Grid>
                <Grid item xs={12} md={9} xl={10} sx={{ bgcolor: "#f3f3f3" }}>
                  <StaffList></StaffList>
                </Grid>
              </Grid>
            }
          ></Route>
          <Route
            path="/school/staff/:staffId"
            element={
              <Grid container>
                <Grid
                  item
                  md={3}
                  xl={2}
                  sx={{
                    display: { xs: "none", md: "block" },
                    bgcolor: "#f3f3f3",
                  }}
                >
                  <Sidebar></Sidebar>
                </Grid>
                <Grid item xs={12} md={9} xl={10} sx={{ bgcolor: "#f3f3f3" }}>
                  <StaffDetails></StaffDetails>
                </Grid>
              </Grid>
            }
          ></Route>
          <Route
            path="/school/students"
            element={
              <Grid container>
                <Grid
                  item
                  md={3}
                  xl={2}
                  sx={{
                    display: { xs: "none", md: "block" },
                    bgcolor: "#f3f3f3",
                  }}
                >
                  <Sidebar></Sidebar>
                </Grid>
                <Grid item xs={12} md={9} xl={10} sx={{ bgcolor: "#f3f3f3" }}>
                  <StudentList></StudentList>
                </Grid>
              </Grid>
            }
          ></Route>
          <Route
            path="/school/student/:studentId"
            element={
              <Grid container>
                <Grid
                  item
                  md={3}
                  xl={2}
                  sx={{
                    display: { xs: "none", md: "block" },
                    bgcolor: "#f3f3f3",
                  }}
                >
                  <Sidebar></Sidebar>
                </Grid>
                <Grid item xs={12} md={9} xl={10} sx={{ bgcolor: "#f3f3f3" }}>
                  <StudentDetails></StudentDetails>
                </Grid>
              </Grid>
            }
          ></Route>
          <Route path="/school/student/fee" element={<PayFee></PayFee>}></Route>
        </Routes>
      </BrowserRouter>
    </Box>
  );
};

export default App;
