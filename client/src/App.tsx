import React from "react";
import UserPanel from "./components/user-panel";
import { BrowserRouter as Router } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme();

function App() {
  return (
    <div>
      <Router>
        <ThemeProvider theme={theme}>
          <UserPanel />
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
