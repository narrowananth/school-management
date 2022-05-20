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

const StaffList = (props) => {
  let [staffs, setStaffs] = useState([]);
  let [isModelOpen, setModelState] = useState(false);
  let [staffName, setStaffName] = useState("");
  let [staffId, setStaffId] = useState("");
  let [phoneNo, setPhoneNo] = useState("");
  let [email, setEmail] = useState("");
  let [showMsg, setShowMsg] = useState(false);

  useEffect(() => {
    request(
      "https://school-management-prod.herokuapp.com/readStaffDetails",
    ).then((res) => {
      setStaffs(res.data);
    });
  }, [props.principalId]);

  let handleStaffNameChange = (event) => {
    let { value } = event.target;
    setStaffName(value);
  };

  let handleStaffIdChange = (event) => {
    let { value } = event.target;
    setStaffId(value);
  };

  let handlePhoneNoChange = (event) => {
    let { value } = event.target;
    setPhoneNo(value);
  };

  let handleEmailChange = (event) => {
    let { value } = event.target;
    setEmail(value);
  };

  let handleCreateStaff = () => {
    request(
      "https://school-management-prod.herokuapp.com/createStaffDetails",
      "POST",
      {
        staffName,
        staffId,
        staffPhoneNo: phoneNo,
        staffEmail: email,
      },
    ).then((res) => {
      setModelState(false);
      setShowMsg(true);
      setTimeout(() => {
        setShowMsg(false);
      }, 3000);
      request(
        "https://school-management-prod.herokuapp.com/readStaffDetails",
      ).then((res) => {
        setStaffs(res.data);
      });
      // setStaffs(res.data);
    });
  };

  let handleDeleteStaff = (staffId) => {
    request(
      `https://school-management-prod.herokuapp.com/deleteStaffDetails`,
      "DELETE",
      {
        staffId,
      },
    ).then(() => {
      request(
        "https://school-management-prod.herokuapp.com/readStaffDetails",
      ).then((res) => {
        setStaffs(res.data);
      });
    });
  };

  let accessLevel = localStorage.getItem("user_role");

  return (
    <>
      {showMsg && (
        <Alert severity="success" color="info">
          Class staff successfully!
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
          <Box>Staff List</Box>
          {accessLevel === "owner" && (
            <Button
              variant="contained"
              onClick={() => {
                setModelState(true);
              }}
            >
              Create Staff
            </Button>
          )}
        </Box>
        <List>
          {staffs.map(
            ({ staffId, staffName, staffEmail, staffPhoneNo, role }) => {
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
                    <Box>{`Name: ${staffName}`}</Box>
                    <Box>{`Id: ${staffId}`}</Box>
                    <Box>{`Email: ${staffEmail}`}</Box>
                    <Box>{`Phone no: ${staffPhoneNo || "-none-"}`}</Box>
                    <Box>{`Role: ${role || "-none-"}`}</Box>
                    {accessLevel === "owner" && (
                      <>
                        <Box>
                          <Link to={`/school/staff/${staffId}`} replace>
                            <EditIcon></EditIcon>
                          </Link>
                        </Box>
                        <Box>
                          <DeleteIcon
                            onClick={handleDeleteStaff.bind(this, staffId)}
                          ></DeleteIcon>
                        </Box>
                      </>
                    )}
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
          title="Create a Staff"
        >
          <Box sx={{ display: "flex", p: 4 }}>
            <Typography sx={{ lineHeight: 3, width: "100px" }}>
              Staff Name:
            </Typography>
            <TextField
              sx={{ ml: 5, width: "200px" }}
              label="Enter your Name"
              variant="outlined"
              focused
              value={staffName}
              onChange={handleStaffNameChange}
            ></TextField>
          </Box>
          <Box sx={{ display: "flex", p: 4 }}>
            <Typography sx={{ lineHeight: 3, width: "100px" }}>
              Staff Id:
            </Typography>
            <TextField
              sx={{ ml: 5, width: "200px" }}
              label="Enter your Id"
              variant="outlined"
              focused
              value={staffId}
              onChange={handleStaffIdChange}
            ></TextField>
          </Box>
          <Box sx={{ display: "flex", p: 4 }}>
            <Typography sx={{ lineHeight: 3, width: "100px" }}>
              Phone No:
            </Typography>
            <TextField
              sx={{ ml: 5, width: "200px" }}
              label="Enter your Phone No"
              variant="outlined"
              focused
              value={phoneNo}
              onChange={handlePhoneNoChange}
            ></TextField>
          </Box>
          <Box sx={{ display: "flex", p: 4 }}>
            <Typography sx={{ lineHeight: 3, width: "100px" }}>
              Email:
            </Typography>
            <TextField
              sx={{ ml: 5, width: "200px" }}
              label="Enter your Email"
              variant="outlined"
              focused
              value={email}
              onChange={handleEmailChange}
            ></TextField>
          </Box>
          <Button
            variant="contained"
            sx={{ textTransform: "none", fontWeight: "bold", ml: 16 }}
            onClick={handleCreateStaff}
          >
            Create a Staff
          </Button>
        </ModalPopUp>
      </Box>
    </>
  );
};

export default StaffList;
