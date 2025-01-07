import React from "react";
import UserPanel from "./components/user-panel";
import { BrowserRouter as Router } from "react-router-dom";
import {
  createTheme,
  ThemeProvider,
  Theme,
  StyledEngineProvider,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import de from 'date-fns/locale/de';

// eslint-disable-next-line
// @ts-expect-error
declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const theme = createTheme();

function App() {
  return (
    <div>
      <Router>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
              <UserPanel />
            </LocalizationProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </Router>
    </div>
  );
}

export default App;
