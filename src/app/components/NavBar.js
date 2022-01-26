import React, { useRef, useState } from "react";
import { makeStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import MenuItem from "@mui/material/MenuItem";
import { useConnect } from "app/hooks";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

function NavBar() {
  const classes = useStyles();
  const anchorElUser = useRef(null);
  const [
    { isConnected, terraAddress },
    { connectWalletExtension, disconnectWalletExtension },
  ] = useConnect();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const handleOpenUserMenu = () => {
    setIsOpenMenu(true);
  };
  const handleCloseUserMenu = () => {
    setIsOpenMenu(false);
  };
  const handleConnectWallet = () => {
    connectWalletExtension();
  };
  const handleDisconnectWallet = () => {
    disconnectWalletExtension();
    handleCloseUserMenu();
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            KanBan
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex" } }}></Box>
          <Box sx={{ flexGrow: 0 }}>
            {isConnected ? (
              <>
                <Button
                  color="inherit"
                  onClick={handleOpenUserMenu}
                  startIcon={<AccountBalanceWalletIcon />}
                >
                  <Typography
                    textAlign="center"
                    className={classes.terraAddress}
                  >
                    {terraAddress}
                  </Typography>
                </Button>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser.current}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={isOpenMenu}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleDisconnectWallet}>
                    <Typography textAlign="center">Disconnect</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                color="inherit"
                onClick={handleConnectWallet}
                startIcon={<AccountBalanceWalletIcon />}
              >
                Connect Wallet
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

const useStyles = makeStyles((theme) => ({
  terraAddress: {
    width: 200,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
}));

export default NavBar;
