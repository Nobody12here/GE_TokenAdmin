import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {ThemeProvider} from '@mui/material/styles'

import {
  useMediaQuery,
  useTheme,
  IconButton,
  Menu,
  MenuItem,
  createTheme,
} from "@mui/material";
import { useWeb3 } from "./connetWallet";
import MenuIcon from "@mui/icons-material/Menu";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import "./header.css";

// Import your logo image
import LogoImage from "../assets/logo.png";


const CustomAppBar = ({ isMetamaskConnected }) => {
  const theme = createTheme({
    components: {
      MuiMenu: {
        styleOverrides: {
          list: {
            '&[role="menu"]': {
            backgroundColor: 'green'
            },
          },
        },
      },
    },
  });
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { connectMetamask, connectTrustWallet } = useWeb3();

  // State to handle the mobile menu
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const isMenuOpen = Boolean(menuAnchorEl);

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  
  return (
    <ThemeProvider theme={theme}>

    <AppBar
      position="static"
      style={{ backgroundColor: "#254503", borderBottom: "2px solid yellow" }}
    >
      <Toolbar>
        {isMobile ? (
          <>
            {/* Logo image for mobile */}
            <img
              src={LogoImage}
              alt="Logo"
              style={{ height: "40px", marginRight: "10px" }}
            />
            <Typography
              variant="h8"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <div>
              {/* Mobile menu */}
              {/* Add a wallet connected indicator */}

              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuOpen}
              >
                <MenuIcon />
                {/* Wallet connected indicator */}
                <span
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: isMetamaskConnected ? "green" : "orange",
                  }}
                ></span>
              </IconButton>
              <Menu
                anchorEl={menuAnchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={isMenuOpen}
                onClose={handleMenuClose}
                

              >
                <MenuItem
                  sx={{color:'white'}}
                  onClick={() => {
                    handleMenuClose();
                    connectMetamask();

                  }}
                >
                  Connect Wallet
                </MenuItem>
              </Menu>
            </div>
          </>
        ) : (
          <>
            {/* Logo image for desktop */}
            <img
              src={LogoImage}
              alt="Logo"
              style={{ height: "30px", marginRight: "10px" }}
            />
            <Typography
              variant="h8"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <div>
              <Button
                color="inherit"
                onClick={connectMetamask}
                variant="outlined"
                sx={{
                  "&:hover": {
                    border: "2px solid black",
                    backgroundColor: "green",
                  },
                  marginRight: "8px",
                  textAlign: "right",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "5px", // Adjust the right position of the circle indicator
                    transform: "translateY(-50%)",
                    //paddingRight: "8px",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: isMetamaskConnected
                      ? "green"
                      : "orange",
                  }}
                ></span>
                {isMetamaskConnected ? "Wallet Connected" : "Connect Wallet"}
              </Button>

              {/* Twitter icon and link */}
              <IconButton
                color="inherit"
                component="a"
                href="https://twitter.com/Gecoinbiz"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon />
              </IconButton>
              {/* Telegram icon and link */}
              <IconButton
                color="inherit"
                component="a"
                href="https://t.me/gecoinbiz"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TelegramIcon />
              </IconButton>
            </div>
          </>
        )}
      </Toolbar>
    </AppBar>
    </ThemeProvider>
  );
};

export default CustomAppBar;