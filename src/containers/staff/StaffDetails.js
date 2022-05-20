import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { request } from "../../utils";
import { useParams } from "react-router";

export default function StaffDetails(props) {
  let { staffId } = useParams();
  let [staffDetails, setStaffDetails] = useState({});
  useEffect(() => {
    request(
      `https://school-management-prod.herokuapp.com/readStaffDetails?staffId=${staffId}`,
    ).then((res) => {
      setStaffDetails(res.data);
    });
  }, [staffId]);
  let {
    staffEmail = "",
    staffName = "",
    staffPhoneNo = "",
    role = "",
    access = [],
  } = staffDetails;
  let handleDataChange = (key, event) => {
    let val = event.target.value;
    if (key === "access") {
      val = val.split(",");
    }
    let newObj = Object.assign({}, staffDetails);
    if (key) newObj[key] = val;
    setStaffDetails(newObj);
  };

  let handleSaveChanges = () => {
    let { role, staffId, access } = staffDetails;
    request(
      `https://school-management-prod.herokuapp.com/updateStaffDetails`,
      "POST",
      { role, staffId, access },
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
        <Link to={`/school/staff`} replace>
          <ArrowBackIcon fontSize="small" sx={{ cursor: "pointer", mr: 2 }} />
        </Link>
        <Box>Staff Details</Box>
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
          Staff Name:
        </Typography>
        <TextField
          disabled
          sx={{ ml: 5, width: "300px" }}
          label="Enter your Staff Name"
          variant="outlined"
          focused
          value={staffName}
        ></TextField>
      </Box>
      <Divider></Divider>
      <Box sx={{ display: "flex", p: 4 }}>
        <Typography sx={{ lineHeight: 3, width: "200px" }}>
          Staff Email:
        </Typography>
        <TextField
          disabled
          sx={{ ml: 5, width: "300px" }}
          label="Enter your Email"
          variant="outlined"
          focused
          value={staffEmail}
        ></TextField>
      </Box>
      <Divider></Divider>
      <Box sx={{ display: "flex", p: 4 }}>
        <Typography sx={{ lineHeight: 3, width: "200px" }}>
          Phone No:
        </Typography>
        <TextField
          disabled
          sx={{ ml: 5, width: "300px" }}
          label="Enter your Phone No"
          variant="outlined"
          focused
          value={staffPhoneNo}
        ></TextField>
      </Box>
      <Divider></Divider>
      <Box sx={{ display: "flex", p: 4 }}>
        <Typography sx={{ lineHeight: 3, width: "200px" }}>Role:</Typography>
        <TextField
          sx={{ ml: 5, width: "300px" }}
          label="Choose your Role"
          variant="outlined"
          focused
          value={role}
          onChange={handleDataChange.bind(this, "role")}
        ></TextField>
      </Box>
      <Box sx={{ display: "flex", p: 4 }}>
        <Typography sx={{ lineHeight: 3, width: "200px" }}>Access:</Typography>
        <TextField
          sx={{ ml: 5, width: "300px" }}
          label="Choose your Role"
          variant="outlined"
          focused
          value={access.join(",")}
          onChange={handleDataChange.bind(this, "access")}
        ></TextField>
      </Box>
    </Box>
  );
}
