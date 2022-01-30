import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const ConnectWalletPanel = (props) => {
  const { availableConnections, onConnect } = props;

  const handleConnect = (type, identifier) => () => {
    onConnect(type, identifier);
  };

  return (
    <Box
      sx={{
        padding: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Typography component="h1" variant="h5">
        Connect Wallet
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          mt: 1,
        }}
      >
        <Grid container direction="column" spacing={2}>
          {availableConnections.map(({ type, name, icon, identifier = "" }) => (
            <Grid item key={`connection-${type}-${identifier}`}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                onClick={handleConnect(type, identifier)}
                endIcon={
                  <Avatar
                    src={icon}
                    alt={name}
                    sx={{ width: "1em", height: "1em" }}
                  />
                }
              >
                {name}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
