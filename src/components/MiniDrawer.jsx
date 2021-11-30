import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";

import CollapsibleTable from "./CollapsibleTable";
import ColTable from "./ColTable";
import Container from "@mui/material/Container";
// import Modal from "./components/Modal";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Alpha Disablility Support Australia
            {/* <div>
            <img
              src="https://testapp.capitalguardians.com/img/logo.png"
              alt=""
            />
            </div> */}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Invoice"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                <SummarizeOutlinedIcon />
                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
              </ListItemIcon>
              <b>
                <ListItemText primary={text} />
              </b>
            </ListItem>
          ))}
        </List>
        <Divider />
        {/* <List>
          {["Test"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Container
          style={{
            backgroundColor: "#f7fbff",
            marginLeft: "0 !important",
          }}
          className="mainContainer p-5"
        >
          <p
            style={{
              fontFamily: "Open Sans, sans-serif",
              color: "#535353",
              fontSize: "30px",
              fontWeight: "100",
            }}
          >
            Emailed Invoices
          </p>

          <p style={{ fontWeight: "bold", fontSize: "14px" }}>
            Supplier {">>"} Alpha Disability Support Australia
          </p>

          <Grid container spacing={2}>
            <Grid item xs={7}>
              <p
                style={{
                  color: "#818181",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                }}
              >
                Please send your pdf invoices to &nbsp;
                <i>
                  <u>testinvoice+9585@capitalguardians.com</u>
                </i>
              </p>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={1}>
              <Tooltip title="Invoices that are individually emailed to testinvoice+9585@capitalguardians.com , can automatically upload a pdf invoice to the correct account.To use this system, a pdf invoice, created from a computer (no scans), needs to be uploaded and setup to the invoice format for its account number, invoice number and value.">
                <IconButton style={{ outline: "none" }}>
                  <InfoOutlinedIcon
                    color="primary"
                    fontSize="large"
                    style={{ marginTop: "-10px" }}
                  />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item xs={3}>
              <Button
                size="small"
                variant="contained"
                style={{
                  background: "#929292 none repeat scroll 0 0",
                  border: "1px solid #7b7b7b",
                  outline: "none",
                  whiteSpace: "nowrap",
                  textTransform: "capitalize",
                }}
              >
                Setup Configuration
              </Button>
            </Grid>
          </Grid>
          <br />
          <br />
          {/* <CollapsibleTable /> */}
          <ColTable />
          <br />
          <Button
            variant="contained"
            style={{
              border: "1px solid rgb(205 199 199)",
              background: "#dfeffc none repeat scroll 0 0",
              border: "1px solid #7b7b7b",
              outline: "none",
              fontWeight: "bold",
              color: "#2e6e9e",
              marginRight: "10px",
              textTransform: "capitalize",
            }}
          >
            Approve
          </Button>
          <Button
            variant="contained"
            style={{
              border: "1px solid rgb(205 199 199)",
              background: "#dfeffc none repeat scroll 0 0",
              border: "1px solid #7b7b7b",
              outline: "none",
              fontWeight: "bold",
              color: "#2e6e9e",
              textTransform: "capitalize",
            }}
          >
            Reject
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
