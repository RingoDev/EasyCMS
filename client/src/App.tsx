import React from "react";
import UserPanel from "./components/user-panel";
import { BrowserRouter as Router } from "react-router-dom";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { de } from "date-fns/locale/de";

const theme = createTheme();

function App() {
  return (
    <div>
      <Router>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={de}
            >
              <UserPanel />
            </LocalizationProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </Router>
    </div>
  );
}

export default App;
