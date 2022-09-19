import {
  Avatar,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

import { GET_USER_LOGIN } from "../../Schema/user";
import { useQuery } from "@apollo/client";

export default function Profile({handleOpenLogout}) {

  const { data: dataUserLogin } = useQuery(GET_USER_LOGIN);
  // console.log(dataUserLogin?.getuserLogin)

  const navigate = useNavigate();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);


  return (
    <>
      <IconButton>
        <AccountCircleOutlinedIcon
          sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#007654" }}
        />
      </IconButton>

      <Button
        onClick={handleClick}
        sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#007654" }}
      >
        {dataUserLogin?.getuserLogin ? (
          <Typography>
            {dataUserLogin?.getuserLogin?.first_name +
              " " +
              dataUserLogin?.getuserLogin?.last_name}
          </Typography>
        ) : null}
      </Button>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => navigate("/user")}>
          <Avatar
            src={dataUserLogin?.getuserLogin?.image_src}
            sx={{ width: 100, height: 100 }}
          />
          Profile
        </MenuItem>

        <Divider />

        <MenuItem onClick={() => navigate("/system-setting")}>
          <ListItemIcon>            
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={() => handleOpenLogout()}>
          <ListItemIcon>
            <Logout fontSize="small" sx={{ color: "red" }} />
          </ListItemIcon>
          <Typography variant="body1">Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
