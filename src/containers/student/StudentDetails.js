import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { request } from "../../utils";
import { useParams } from "react-router";

export default function StudentDetails(props) {
  let { studentId } = useParams();
  let [studentDetails, setStudentDetails] = useState({});
  useEffect(() => {
    request(
      `https://school-management-prod.herokuapp.com/showStudentDetails?studentId=${studentId}`,
    ).then((res) => {
      // console.log(res, "res");
      setStudentDetails(res.data);
    });
  }, [studentId]);
  let {
    class: currentClassName = "",
    standard = "",
    academicYear = "",
    section = "",
    dob = "",
    feesPay = "",
    rollNo = "",
    status = "",
    studentId: id = "",
    studentName = "",
    staffId = "",
    fatherName = "",
    email = "",
    mobile: mobileNo,
  } = studentDetails;
  let handleDataChange = (key, event) => {
    let val = event.target.value;
    let newObj = Object.assign({}, studentDetails);
    if (key) newObj[key] = val;
    setStudentDetails(newObj);
  };

  let handleSaveChanges = () => {
    let { studentName, studentId, staffId, fatherName, email, mobile } =
      studentDetails;
    request(
      `https://school-management-prod.herokuapp.com/createParentDetails`,
      "POST",
      { studentName, studentId, staffId, fatherName, email, mobile },
    ).then((res) => {
      // console.log(res);
    });
  };
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        width: "98.5%",
        mt: 2,
        bgcolor: "#fff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: "20px 20px 20px 30px",
          bgcolor: "#fff",
          boxShadow: "0px 0px 8px 0px lightgrey",
        }}
      >
        <Link to={`/school/student`} replace>
          <ArrowBackIcon fontSize="small" sx={{ cursor: "pointer", mr: 2 }} />
        </Link>
        <Box>Class Details</Box>
        <Button
          variant="contained"
          sx={{ ml: "800px" }}
          onClick={handleSaveChanges}
        >
          Save Changes
        </Button>
      </Box>
      <Box sx={{ display: "flex", p: 4 }}>
        <Typography sx={{ lineHeight: 3, width: "200px" }}>
          Student Name:
        </Typography>
        <TextField
          disabled
          sx={{ ml: 5, width: "300px" }}
          variant="outlined"
          focused
          value={studentName}
        ></TextField>
      </Box>
      <Box sx={{ display: "flex", p: 4 }}>
        <Typography sx={{ lineHeight: 3, width: "200px" }}>
          Student Id:
        </Typography>
        <TextField
          disabled
          sx={{ ml: 5, width: "300px" }}
          variant="outlined"
          focused
          value={id}
        ></TextField>
      </Box>
      <Box sx={{ display: "flex", p: 4 }}>
        <Typography sx={{ lineHeight: 3, width: "200px" }}>
          Class Name:
        </Typography>
        <TextField
          disabled
          sx={{ ml: 5, width: "300px" }}
          label="Enter your Class Name"
          variant="outlined"
          focused
          value={currentClassName}
        ></TextField>
      </Box>
      <Divider></Divider>
      <Box sx={{ display: "flex", p: 4 }}>
        <Typography sx={{ lineHeight: 3, width: "200px" }}>
          Standard:
        </Typography>
        <TextField
          disabled
          sx={{ ml: 5, width: "300px" }}
          label="Enter your Standard"
          variant="outlined"
          focused
          value={standard}
        ></TextField>
      </Box>
      <Divider></Divider>
      <Box sx={{ display: "flex", p: 4 }}>
        <Typography sx={{ lineHeight: 3, width: "200px" }}>Section:</Typography>
        <TextField
          disabled
          sx={{ ml: 5, width: "300px" }}
          label="Enter your Section"
          variant="outlined"
          focused
          value={section}
        ></TextField>
      </Box>
      <Divider></Divider>

      <Box sx={{ display: "flex", p: 4 }}>
        <Typography sx={{ lineHeight: 3, width: "200px" }}>
          Academic Year:
        </Typography>
        <TextField
          disabled
          sx={{ ml: 5, width: "300px" }}
          label="Enter your Academic Year"
          variant="outlined"
          focused
          value={academicYear}
        ></TextField>
      </Box>
      <Divider></Divider>
      <Box sx={{ display: "flex", p: 4 }}>
        <Typography sx={{ lineHeight: 3, width: "200px" }}>DOB:</Typography>
        <TextField
          disabled
          sx={{ ml: 5, width: "300px" }}
          label="Enter your DOB"
          variant="outlined"
          focused
          value={dob}
        ></TextField>
      </Box>
      <Box sx={{ display: "flex", p: 4 }}>
        <Typography sx={{ lineHeight: 3, width: "200px" }}>Status:</Typography>
        <TextField
          disabled
          sx={{ ml: 5, width: "300px" }}
          variant="outlined"
          focused
          value={status}
        ></TextField>
      </Box>
      <Divider></Divider>
      <Box sx={{ display: "flex", p: 4 }}>
        <Typography sx={{ lineHeight: 3, width: "200px" }}>
          Staff Id:
        </Typography>
        <TextField
          sx={{ ml: 5, width: "300px" }}
          label="Enter your Staff Id"
          variant="outlined"
          focused
          value={staffId}
          onChange={handleDataChange.bind(this, "staffId")}
        ></TextField>
      </Box>
      <Divider></Divider>
      <Box sx={{ display: "flex", p: 4 }}>
        <Typography sx={{ lineHeight: 3, width: "200px" }}>
          Father Name:
        </Typography>
        <TextField
          sx={{ ml: 5, width: "300px" }}
          label="Enter your Father Name"
          variant="outlined"
          focused
          value={fatherName}
          onChange={handleDataChange.bind(this, "fatherName")}
        ></TextField>
      </Box>
      <Divider></Divider>
      <Box sx={{ display: "flex", p: 4 }}>
        <Typography sx={{ lineHeight: 3, width: "200px" }}>Email:</Typography>
        <TextField
          sx={{ ml: 5, width: "300px" }}
          label="Enter your Father Name"
          variant="outlined"
          focused
          value={email}
          onChange={handleDataChange.bind(this, "email")}
        ></TextField>
      </Box>
      <Divider></Divider>
      <Box sx={{ display: "flex", p: 4 }}>
        <Typography sx={{ lineHeight: 3, width: "200px" }}>
          Mobile No:
        </Typography>
        <TextField
          sx={{ ml: 5, width: "300px" }}
          label="Enter your Mobile No"
          variant="outlined"
          focused
          value={mobileNo}
          onChange={handleDataChange.bind(this, "mobile")}
        ></TextField>
      </Box>
      <Divider></Divider>
    </Box>
  );
}
