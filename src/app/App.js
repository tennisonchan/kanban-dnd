import React, { useEffect, useState } from "react";
import { Suspense } from "react";
import Board from "app/components/Board";
import ProjectsPage from "app/components/ProjectsPage";
import NotFound from "app/components/NotFound";
import SignInPage from "app/components/SignInPage";
import Loading from "app/components/Loading";
import { useNavigate, Route, Routes, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack-v5";
import { useConnect, useAuth } from "app/hooks";

function App() {
  const navigate = useNavigate();
  const [{ isInitializing, terraAddress }] = useConnect();
  const [isLoading, setIsLoading] = useState(isInitializing);
  const [{ isAuthenticated }, { authUser }] = useAuth();

  useEffect(() => {
    if (!isInitializing && !terraAddress) {
      setIsLoading(false);
      navigate("/sign-in");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [terraAddress, isInitializing]);

  useEffect(() => {
    if (!isAuthenticated && terraAddress) {
      authUser(terraAddress).then(() => {
        setIsLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [terraAddress, isAuthenticated]);

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Suspense fallback={<Loading />}>
          {isLoading ? (
            <Loading />
          ) : (
            <Routes>
              <Route path="/sign-in" element={<SignInPage />} />
              <Route exact path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:projectId" element={<Board />} />
              <Route path="/" element={<Navigate to="/projects" />} />
              <Route path="/oops" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/oops" />} />
            </Routes>
          )}
        </Suspense>
        <CssBaseline />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

const theme = createTheme({
  palette: {
    primary: {
      light: "#5471d2",
      main: "#0d46a0",
      dark: "#002071",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff8a50",
      main: "#ff5722",
      dark: "#c41c00",
      contrastText: "#000",
    },
  },
});

export default App;
