import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";
import React from "react";

const sideMenus = [
  {
    name: "Class",
    permission: true,
    link: "/school/class",
  },
  {
    name: "Staffs",
    permission: true,
    link: "/school/staff",
  },
  {
    name: "Students",
    permission: true,
    link: "/school/students",
  },
];

export default function Sidebar() {
  return (
    <Box
      sx={{
        mt: 2,
        mr: 2,
        ml: 2,
        mb: 2,
        color: "#9d9d9d",
        height: "89vh",
        bgcolor: "#fff",
        overflowY: "scroll",
      }}
    >
      <List>
        {sideMenus.map(({ name, link, permission }) => {
          return (
            <ListItem key={name}>
              <Link to={link} style={{ textDecoration: "none" }}>
                <ListItemButton>
                  <ListItemText>
                    <Typography variant="body2">{name}</Typography>
                  </ListItemText>
                </ListItemButton>
              </Link>
            </ListItem>
          );
        })}
        <ListItem
          key={"ananth"}
          onClick={() => {
            window.localStorage.clear();
            window.location.pathname = "/login";
          }}
        >
          <ListItemButton>
            <ListItemText>
              <Typography variant="body2">Logout</Typography>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
