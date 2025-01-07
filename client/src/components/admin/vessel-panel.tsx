import { Component, ComponentTypes, Vessel } from "../../types/types";
import React, { useState } from "react";
import {
  Card,
  FilledInput,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import ComponentSwitch from "./componentTypes/componentSwitch";

interface VesselPanelProps {
  vessel: Vessel;
  addChild: (child: Component) => void;
}

const VesselPanel: React.FC<VesselPanelProps> = (props) => {
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<ComponentTypes>(ComponentTypes.Container);

  return (
    <>
      existing children of this vessel
      <div>
        {props.vessel.children.map((c, index) => (
          <div key={index}>
            <div>{c.name}</div>
            <div>{c.type}</div>
            <div>{c.permissions}</div>
          </div>
        ))}
      </div>
      <Card style={{ padding: "2rem", maxWidth: "1024px", margin: "2rem" }}>
        <Grid container>
          <Grid item xs={6}>
            <FormControl>
              <InputLabel>Name</InputLabel>
              <FilledInput
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl>
              <InputLabel>Type</InputLabel>
              <Select
                value={type}
                onChange={(e) => {
                  setType(e.target.value as ComponentTypes);
                }}
              >
                <MenuItem value={ComponentTypes.Container}>
                  {ComponentTypes.Container}
                </MenuItem>
                <MenuItem value={ComponentTypes.NumberInput}>
                  {ComponentTypes.NumberInput}
                </MenuItem>
                <MenuItem value={ComponentTypes.SinglelineText}>
                  {ComponentTypes.SinglelineText}
                </MenuItem>
                <MenuItem value={ComponentTypes.MultilineText}>
                  {ComponentTypes.MultilineText}
                </MenuItem>
                <MenuItem value={ComponentTypes.Checkbox}>
                  {ComponentTypes.Checkbox}
                </MenuItem>
              </Select>
            </FormControl>
            {/*    Depending on Select, We Should render the Other Options for the selected ComponentSwitch*/}
          </Grid>

          <ComponentSwitch name={name} type={type} addChild={props.addChild} />
        </Grid>
      </Card>
    </>
  );
};

export default VesselPanel;
