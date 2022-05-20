import {
  Alert,
  Box,
  Button,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import ModalPopUp from "../../components/modal/Modal";
import { request } from "../../utils";

const StudentList = (props) => {
  let [students, setStudents] = useState([]);
  let [isModelOpen, setModelState] = useState(false);
  let [className, setClassName] = useState("");
  let [studentName, setStudentName] = useState("");
  let [studentId, setStudentId] = useState("");
  let [standard, setStandard] = useState("");
  let [dob, setDOB] = useState("");
  let [rollNo, setRollNo] = useState("");
  let [academicYear, setAcademicYear] = useState("");
  let [showMsg, setShowMsg] = useState(false);

  useEffect(() => {
    request(
      "https://school-management-prod.herokuapp.com/showStudentDetails",
    ).then((res) => {
      setStudents(res.data);
    });
  }, [props.principalId]);

  let handleClassNameChange = (event) => {
    let { value } = event.target;
    if (value.length <= 3) {
      setClassName(value);
    }
  };

  let handleStudentNameChange = (event) => {
    let { value } = event.target;
    setStudentName(value);
  };

  let handleStudentIdChange = (event) => {
    let { value } = event.target;
    setStudentId(value);
  };

  let handleACYearChange = (event) => {
    let { value } = event.target;
    setAcademicYear(value);
  };

  let handleStandardChange = (event) => {
    let { value } = event.target;
    setStandard(value);
  };

  let handleDOBChange = (event) => {
    let { value } = event.target;
    setDOB(value);
  };

  let handleRollNoChange = (event) => {
    let { value } = event.target;
    setRollNo(value);
  };

  let handleCreateStudent = () => {
    request(
      "https://school-management-prod.herokuapp.com/createStudentDetails",
      "POST",
      {
        class: className,
        standard,
        studentName,
        rollNo,
        dob,
        academicYear,
        studentId,
        status: "active",
        feesPay: false,
        // section,
      },
    ).then((res) => {
      setModelState(false);
      setShowMsg(true);
      setTimeout(() => {
        setShowMsg(false);
      }, 3000);
      request(
        "https://school-management-prod.herokuapp.com/showStudentDetails",
      ).then((res) => {
        setStudents(res.data);
      });
      // setStudents(res.data);
    });
  };

  let accessLevel = localStorage.getItem("user_role");

  return (
    <>
      {showMsg && (
        <Alert severity="success" color="info">
          Student create successfully!
        </Alert>
      )}
      <Box sx={{ maxHeight: "100vh", overflowY: "scroll", mt: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: "20px 20px 20px 30px",
            bgcolor: "#fff",
            boxShadow: "0px 0px 8px 0px lightgrey",
            justifyContent: "space-between",
          }}
        >
          <Box>Student List</Box>
          {accessLevel === "owner" && (
            <Button
              variant="contained"
              onClick={() => {
                setModelState(true);
              }}
            >
              Create Student
            </Button>
          )}
        </Box>
        <List>
          {students.map(
            ({
              academicYear,
              class: className,
              studentName,
              standard,
              rollNo,
              studentId,
            }) => {
              return (
                <>
                  <ListItem
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      bgcolor: "#ffff",
                    }}
                  >
                    <Box>{`Name: ${studentName}`}</Box>
                    <Box>{`Class: ${className}`}</Box>
                    <Box>{`Standard: ${standard}`}</Box>
                    <Box>{`Academic Year: ${academicYear || "-none-"}`}</Box>
                    <Box>{`Roll No: ${rollNo || "-none-"}`}</Box>
                    <Box>
                      {accessLevel === "admin" && (
                        <Link to={`/school/student/${studentId}`} replace>
                          <EditIcon></EditIcon>
                        </Link>
                      )}
                    </Box>
                  </ListItem>
                  <br></br>
                </>
              );
            },
          )}
        </List>
        <ModalPopUp
          switch={isModelOpen}
          handle={() => {
            setModelState(!isModelOpen);
          }}
          title="Create a Student"
          width={"600px"}
        >
          <Box sx={{ display: "flex", p: 4 }}>
            <Typography sx={{ lineHeight: 3, width: "200px" }}>
              Student Name:
            </Typography>
            <TextField
              sx={{ ml: 5, width: "300px" }}
              label="Enter Student Name"
              variant="outlined"
              focused
              value={studentName}
              onChange={handleStudentNameChange}
            ></TextField>
          </Box>
          <Box sx={{ display: "flex", p: 4 }}>
            <Typography sx={{ lineHeight: 3, width: "200px" }}>
              Student Id:
            </Typography>
            <TextField
              sx={{ ml: 5, width: "300px" }}
              label="Enter Student Name"
              variant="outlined"
              focused
              value={studentId}
              onChange={handleStudentIdChange}
            ></TextField>
          </Box>

          <Box sx={{ display: "flex", p: 4 }}>
            <Typography sx={{ lineHeight: 3, width: "200px" }}>
              Class Name:
            </Typography>
            <TextField
              sx={{ ml: 5, width: "300px" }}
              label="Enter your Class Name"
              variant="outlined"
              focused
              value={className}
              onChange={handleClassNameChange}
            ></TextField>
          </Box>
          <Box sx={{ display: "flex", p: 4 }}>
            <Typography sx={{ lineHeight: 3, width: "200px" }}>
              Roll No:
            </Typography>
            <TextField
              sx={{ ml: 5, width: "300px" }}
              label="Enter Roll No"
              variant="outlined"
              focused
              value={rollNo}
              onChange={handleRollNoChange}
            ></TextField>
          </Box>
          <Box sx={{ display: "flex", p: 4 }}>
            <Typography sx={{ lineHeight: 3, width: "200px" }}>
              Standard:
            </Typography>
            <TextField
              sx={{ ml: 5, width: "300px" }}
              label="Enter your Section"
              variant="outlined"
              focused
              value={standard}
              onChange={handleStandardChange}
            ></TextField>
          </Box>
          <Box sx={{ display: "flex", p: 4 }}>
            <Typography sx={{ lineHeight: 3, width: "200px" }}>DOB:</Typography>
            <TextField
              sx={{ ml: 5, width: "300px" }}
              label="Enter your DOB"
              variant="outlined"
              focused
              value={dob}
              onChange={handleDOBChange}
            ></TextField>
          </Box>
          <Box sx={{ display: "flex", p: 4 }}>
            <Typography sx={{ lineHeight: 3, width: "200px" }}>
              Academic Year:
            </Typography>
            <TextField
              sx={{ ml: 5, width: "300px" }}
              label="Enter your DOB"
              variant="outlined"
              focused
              value={academicYear}
              onChange={handleACYearChange}
            ></TextField>
          </Box>
          <Button
            variant="contained"
            sx={{ textTransform: "none", fontWeight: "bold", ml: 16 }}
            onClick={handleCreateStudent}
          >
            Create a Student
          </Button>
        </ModalPopUp>
      </Box>
    </>
  );
};

export default StudentList;
