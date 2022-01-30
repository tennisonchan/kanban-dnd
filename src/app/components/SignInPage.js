import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import { useConnect, useAuth } from "app/hooks";
import { useNavigate } from "react-router-dom";
import { ConnectWalletPanel } from "app/components/ConnectWalletPanel";

const SignInPage = () => {
  const navigate = useNavigate();
  const [{ isAuthenticated }] = useAuth();
  const [{ availableConnections }, { connect }] = useConnect();

  useEffect(() => {
    console.log("SignInPage", { isAuthenticated });
    if (isAuthenticated) {
      navigate("/projects");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <Container
      maxWidth="xs"
      sx={{ height: "100%", alignItems: "center", display: "flex" }}
    >
      <ConnectWalletPanel
        availableConnections={availableConnections}
        onConnect={connect}
      />
    </Container>
  );
};

export default SignInPage;
