import React from "react";
import NavPanel from "./shared/nav-panel";
import { BrowserRouter as Router } from "react-router-dom";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { de } from "date-fns/locale/de";
import AuthWrapper from "./cms/AuthWrapper";

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
              <AuthWrapper>
                {(logout) => (
                    <NavPanel logout={logout} />
                )}
              </AuthWrapper>
            </LocalizationProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </Router>
    </div>
  );
}

export default App;
