import React from "react";
import { Suspense } from "react";
import Board from "app/components/Board";
import ProjectsPage from "app/components/ProjectsPage";
import NotFound from "app/components/NotFound";
import NavBar from "app/components/NavBar";
import { Route, Routes, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import { store } from "./store";
import { SnackbarProvider } from "notistack-v5";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

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

const Loading = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    }}
  >
    <CircularProgress />
  </Box>
);

function App() {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <NavBar />
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route exact path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:projectId" element={<Board />} />
              <Route path="/" element={<Navigate to="/projects" />} />
              <Route path="/oops" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/oops" />} />
            </Routes>
          </Suspense>
          <CssBaseline />
        </ThemeProvider>
      </Provider>
    </SnackbarProvider>
  );
}

export default App;
