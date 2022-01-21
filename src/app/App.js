import React from "react";
import { Suspense } from "react";
import Home from "app/components/Home";
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

function App() {
  return (
    <Suspense
      fallback={
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
      }
    >
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </ThemeProvider>
        </Provider>
      </SnackbarProvider>
    </Suspense>
  );
}

export default App;
