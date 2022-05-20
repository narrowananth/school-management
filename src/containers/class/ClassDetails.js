import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { request } from "../../utils";
import { useParams } from "react-router";

export default function ClassDetails(props) {
  let { className } = useParams();
  let [classDetails, setClassDetails] = useState({});
  useEffect(() => {
    request(
      `https://school-management-prod.herokuapp.com/readClassDetails?classs=${className}`,
    ).then((res) => {
      setClassDetails(res.data);
    });
  }, [className]);
  let {
    class: currentClassName = "",
    section = "",
    staffName = "",
    standard = "",
    academicYear = "",
    academicYearScore = "",
    staffId = "",
  } = classDetails;
  let handleDataChange = (key, event) => {
    let val = event.target.value;
    let newObj = Object.assign({}, classDetails);
    if (key) newObj[key] = val;
    setClassDetails(newObj);
  };

  let handleSaveChanges = () => {
    let { staffId, staffName, class: className, academicYear } = classDetails;
    request(
      `https://school-management-prod.herokuapp.com/updateClassDetails`,
      "POST",
      { staffName, staffId, class: className, academicYear },
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
        <Link to={`/school/class`} replace>
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
          Staff Name:
        </Typography>
        <TextField
          sx={{ ml: 5, width: "300px" }}
          label="Choose your Staff Name"
          variant="outlined"
          focused
          value={staffName}
          onChange={handleDataChange.bind(this, "staffName")}
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
          Academic Year:
        </Typography>
        <TextField
          sx={{ ml: 5, width: "300px" }}
          label="Enter your Academic Year"
          variant="outlined"
          focused
          value={academicYear}
          onChange={handleDataChange.bind(this, "academicYear")}
        ></TextField>
      </Box>
      <Divider></Divider>
      <Box sx={{ display: "flex", p: 4 }}>
        <Typography sx={{ lineHeight: 3, width: "200px" }}>
          Academic Score:
        </Typography>
        <TextField
          sx={{ ml: 5, width: "300px" }}
          label="Enter your Academic Year Score"
          variant="outlined"
          focused
          value={academicYearScore}
          onChange={handleDataChange.bind(this, "academicYearScore")}
        ></TextField>
      </Box>
    </Box>
  );
}
