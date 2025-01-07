import axios from "axios";
import React, { useEffect, useState } from "react";
import { Component, Vessel } from "../../types/types";
import WarningIcon from "@mui/icons-material/Warning";
import {
  AppBar,
  Breadcrumbs,
  Button,
  Container,
  Divider,
  Drawer,
  FilledInput,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Route, Link as RouterLink } from "react-router-dom";
import VesselPanel from "./vessel-panel";

const AdminPanel = () => {
  useEffect(() => {
    axios
      .get<Vessel[]>("http://localhost:5000/api/vessel")
      .then((r) => {
        // console.log(r)
        setVessels(r.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const [vessels, setVessels] = useState<Vessel[]>([]);

  const [name, setName] = useState<string>("");
  const [slug, setSlug] = useState<string>("");

  const createVessel = (vessel: Vessel) => {
    axios
      .put<Vessel>("http://localhost:5000/api/vessel", vessel)
      .then((_) => {
        axios
          .get<Vessel[]>("http://localhost:5000/api/vessel")
          .then((r) => {
            // console.log(r)
            setVessels(r.data);
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  };

  //adds child to vessel
  const addChildToVessel = (child: Component, slug: string) => {
    console.log("adding child ", child, "to vessel with slug", slug);

    axios
      .get<Vessel>("http://localhost:5000/api/vessel" + slug)
      .then((v) => {
        const vessel = v.data;
        vessel.children.push(child);
        axios
          .put<Vessel>("http://localhost:5000/api/vessel", vessel)
          .then((r) => console.log("Updated Vessel:", r))
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <div style={{ display: "flex", position: "relative" }}>
        <nav style={{ width: "300px", flexShrink: 0 }}>
          <Drawer
            PaperProps={{ style: { width: "300px" } }}
            style={{ width: "100%" }}
            variant="permanent"
            anchor={"left"}
            open={true}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <div>
              <Typography align={"center"}>Vessels</Typography>
              <Divider />
              <List>
                {vessels.map((v, index) => (
                  <RouterLink key={index} to={v.slug}>
                    <ListItem key={index}>
                      <ListItemIcon>
                        <WarningIcon />
                      </ListItemIcon>
                      <ListItemText color={"primary"} primary={v.name} />
                    </ListItem>
                  </RouterLink>
                ))}
              </List>
              <Divider />
              <Typography align={"center"}>Create Vessel</Typography>
              <Divider />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <FormControl style={{ margin: "1rem" }}>
                  <InputLabel style={{ paddingLeft: "0.8rem" }}>
                    Name
                  </InputLabel>
                  <FilledInput
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>
                <FormControl style={{ margin: "1rem" }}>
                  <InputLabel style={{ paddingLeft: "0.8rem" }}>
                    Slug
                  </InputLabel>
                  <FilledInput
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                  />
                </FormControl>
                <Button
                  style={{ padding: "1rem" }}
                  onClick={() => createVessel({ name, slug, children: [] })}
                >
                  Create Vessel
                </Button>
              </div>
              <Divider />
            </div>
          </Drawer>
        </nav>
        <AppBar
          style={{
            marginLeft: "300px",
            width: "calc(100% - 300px)",
            padding: "1rem",
          }}
        >
          {" "}
          {vessels.map((v, index) => (
            <Route key={index} path={v.slug}>
              <Breadcrumbs maxItems={4}>
                <Typography color="textPrimary">{v.name}</Typography>
              </Breadcrumbs>
            </Route>
          ))}
        </AppBar>
        <Container maxWidth={"md"} style={{ paddingTop: "4rem" }}>
          {vessels.map((v, index) => (
            <Route key={index} path={v.slug}>
              <VesselPanel
                vessel={v}
                addChild={(child) => addChildToVessel(child, v.slug)}
              />
            </Route>
          ))}
        </Container>
      </div>
    </>
  );
};

export default AdminPanel;
