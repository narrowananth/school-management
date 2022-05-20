import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import React from "react";
import { request } from "../../utils";

const Login = () => {
  const [id, setId] = useState("");

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handleLogin = (type) => {
    if (type === "principal") {
      request(
        "https://school-management-prod.herokuapp.com/readAdminDetails?principleId=" +
          id,
      ).then((res) => {
        if (res.status === "success") {
          localStorage.setItem("user", JSON.stringify(res.data));
          localStorage.setItem("user_role", "owner");
          window.location.pathname = "/school/class";
        }
      });
    } else if (type === "staff") {
      request(
        "https://school-management-prod.herokuapp.com/readStaffDetails?staffId=" +
          id,
      ).then((res) => {
        if (res.status === "success") {
          localStorage.setItem("user", JSON.stringify(res.data));
          let role = res.data.role;
          localStorage.setItem("user_role", role);
          window.location.pathname = "/school/class";
        }
      });
    } else if (type === "student") {
      request(
        "https://school-management-prod.herokuapp.com/showStudentDetails?studentId=" +
          id,
      ).then((res) => {
        if (res.status === "success") {
          localStorage.setItem("user", JSON.stringify(res.data));
          localStorage.setItem("user_role", "student");
          window.location.pathname = "/school/student/fee";
        }
      });
    }
  };
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "500px",
          p: "20px",
          boxShadow: "0 1px 5px 0 grey",
          borderRadius: "5px",
        }}
      >
        <Typography variant="h4" sx={{ mb: 1 }}>
          School Management App
        </Typography>
        <Divider></Divider>
        <Box sx={{ display: "flex", flexDirection: "column", mt: 3 }}>
          <TextField
            label="Enter your Id"
            variant="filled"
            focused
            value={id}
            onChange={handleIdChange}
          ></TextField>
          <br></br>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ m: 1 }}>
              <Button
                variant="contained"
                sx={{ textTransform: "none", fontWeight: "bold" }}
                onClick={handleLogin.bind(this, "principal")}
              >
                Login as Principal
              </Button>
            </Box>
            <Box sx={{ m: 1 }}>
              <Button
                variant="contained"
                sx={{ textTransform: "none", fontWeight: "bold" }}
                onClick={handleLogin.bind(this, "staff")}
              >
                Login as Staff
              </Button>
            </Box>
            <Box sx={{ m: 1 }}>
              <Button
                variant="contained"
                sx={{ textTransform: "none", fontWeight: "bold" }}
                onClick={handleLogin.bind(this, "student")}
              >
                Login as Student
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
