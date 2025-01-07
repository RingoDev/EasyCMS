import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import deLocale from "date-fns/locale/de";
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {MuiPickersUtilsProvider,} from '@material-ui/pickers';
import App from "./App";



ReactDOM.render(
    <React.StrictMode>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={deLocale}>
            <App/>
        </MuiPickersUtilsProvider>
        ,
    </React.StrictMode>,
    document.getElementById("root"),
);
