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

const ClassList = (props) => {
  let [classes, setClasses] = useState([]);
  let [isModelOpen, setModelState] = useState(false);
  let [className, setClassName] = useState("");
  let [standard, setStandard] = useState("");
  let [section, setSection] = useState("");
  let [showMsg, setShowMsg] = useState(false);

  useEffect(() => {
    request(
      "https://school-management-prod.herokuapp.com/readClassDetails",
    ).then((res) => {
      setClasses(res.data);
    });
  }, [props.principalId]);

  let handleClassNameChange = (event) => {
    let { value } = event.target;
    if (value.length <= 3) {
      setClassName(value);
    }
  };

  let handleStandardChange = (event) => {
    let { value } = event.target;
    setStandard(value);
  };

  let handleSectionChange = (event) => {
    let { value } = event.target;
    setSection(value);
  };

  let handleCreateClass = () => {
    request(
      "https://school-management-prod.herokuapp.com/createClassDetails",
      "POST",
      {
        class: className,
        standard,
        section,
      },
    ).then((res) => {
      setModelState(false);
      setShowMsg(true);
      setTimeout(() => {
        setShowMsg(false);
      }, 3000);
      request(
        "https://school-management-prod.herokuapp.com/readClassDetails",
      ).then((res) => {
        setClasses(res.data);
      });
    });
  };

  let handleDeleteClass = (className) => {
    request(
      `https://school-management-prod.herokuapp.com/deleteClassDetails`,
      "DELETE",
      {
        class: className,
      },
    ).then(() => {
      request(
        "https://school-management-prod.herokuapp.com/readClassDetails",
      ).then((res) => {
        setClasses(res.data);
      });
    });
  };

  let accessLevel = localStorage.getItem("user_role");

  return (
    <>
      {showMsg && (
        <Alert severity="success" color="info">
          Class create successfully!
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
          <Box>Class List</Box>
          {accessLevel === "owner" && (
            <Button
              variant="contained"
              onClick={() => {
                setModelState(true);
              }}
            >
              Create Class
            </Button>
          )}
        </Box>
        <List>
          {classes.map(
            ({
              academicYear,
              class: className,
              id,
              section,
              staffId,
              staffName,
              standard,
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
                    <Box>{`Class: ${className}`}</Box>
                    <Box>{`Section: ${section}`}</Box>
                    <Box>{`Standard: ${standard}`}</Box>
                    <Box>{`Academic Year: ${academicYear || "-none-"}`}</Box>
                    <Box>{`Staff Name: ${staffName || "-none-"}`}</Box>
                    {accessLevel === "owner" && (
                      <>
                        <Box>
                          <Link to={`/school/class/${className}`} replace>
                            <EditIcon></EditIcon>
                          </Link>
                        </Box>
                        <Box>
                          <DeleteIcon
                            onClick={handleDeleteClass.bind(this, className)}
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
          title="Create a Class"
        >
          <Box sx={{ display: "flex", p: 4 }}>
            <Typography sx={{ lineHeight: 3, width: "100px" }}>
              Class Name:
            </Typography>
            <TextField
              sx={{ ml: 5, width: "200px" }}
              label="Enter your Class Name"
              variant="outlined"
              focused
              value={className}
              onChange={handleClassNameChange}
            ></TextField>
          </Box>
          <Box sx={{ display: "flex", p: 4 }}>
            <Typography sx={{ lineHeight: 3, width: "100px" }}>
              Standard:
            </Typography>
            <TextField
              sx={{ ml: 5, width: "200px" }}
              label="Enter your Standard"
              variant="outlined"
              focused
              value={standard}
              onChange={handleStandardChange}
            ></TextField>
          </Box>
          <Box sx={{ display: "flex", p: 4 }}>
            <Typography sx={{ lineHeight: 3, width: "100px" }}>
              Section:
            </Typography>
            <TextField
              sx={{ ml: 5, width: "200px" }}
              label="Enter your Section"
              variant="outlined"
              focused
              value={section}
              onChange={handleSectionChange}
            ></TextField>
          </Box>
          <Button
            variant="contained"
            sx={{ textTransform: "none", fontWeight: "bold", ml: 16 }}
            onClick={handleCreateClass}
          >
            Create a Class
          </Button>
        </ModalPopUp>
      </Box>
    </>
  );
};

export default ClassList;
