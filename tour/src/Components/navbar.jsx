import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { Avatar } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { LOGOUT, SHOW, ADMIN } from "../store/action";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import AddPlace from "./Admin/placeAdmin";
import SignUpAdmin from "./Account/SignUp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import PersonIcon from "@material-ui/icons/Person";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    margin: "1rem auto",
    color:"#000000"
  },
  topLeftBox: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  spreadBox: {
    justifyContent: "space-around",
    alignItems: "center",
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const initialValue = {
    "/summer": 0,
    "/winter": 1,
    "/monsoon": 2,
  };
  const [value, setValue] = React.useState(initialValue[props.match.url]);
  const { history } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const buttonColor = { height: 35, backgroundColor: "#3f51b5", marginRight:"1rem" };
  const [profile, setProfile] = React.useState(false);
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const [open, setOpen] = React.useState(false);

  const dialogOpen = () => {
    props.showB();
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const profileDialogBox = () => {
    setProfile(true);

    axios
      .get("http://localhost:4000/profile")
      .then((response) => console.log("done", response))
      .catch((e) => console.log("error", e));
  };

  const handleClose = (pageURL) => {
    console.log(pageURL);
    setProfile(false);

    setOpen(false);
    history.push(pageURL);
    setAnchorEl(null);
    axios
      .get(`http://localhost:4000${pageURL}`)
      .then((response) => console.log("done", response))
      .catch((e) => console.log("error", e));
  };

  const posthandler = (pageURl) => {
    history.push(pageURl);
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .post("http://localhost:4000/logout", null, config)
      .then((response) => console.log("done", response))
      .catch((e) => console.log("error", e));
    localStorage.removeItem("token");
    props.logout();
    history.push("/summer");
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root} >
      <AppBar position="fixed"  style={{backgroundColor:"#e8eaf6",maxHeight:"3rem"}} positionFixed>
        {/* {props.login ? (
            props.role == "Admin" ? (
              <Typography
                style={{
                  maxWidth: "10rem",
                  marginRight: "1rem",
                  color: "#fff9c4",
                }}
                align="right"
                variant="h6"
                className={classes.title}
              >
                Welcome Admin
              </Typography>
            ) : (
              <Typography
                style={{
                  maxWidth: "10rem",
                  marginRight: "1rem",
                  color: "#fff9c4",
                }}
                align="right"
                variant="h6"
                className={classes.title}
              >
                Welcome User
              </Typography>
            )
          ) : (
            <></>
          )} */}

        <Grid container direction="row" justify="space-between">
          <div style={{ display: "flex", flexDirection: "row" }}>
            {props.packageTitle != null ? (
              <Typography
              style={{marginLeft:"2rem"}}
                variant="h5"
                align="center"
                style={{ color:"#002171" }}
                className={classes.title}
              >
                Explore Packages
              </Typography>
            ) : (
              <Typography component="div" variant="h5" >
               
               <Box fontWeight="fontWeightBold" style={{marginLeft:"2rem",color:"#002171"}}   fontWeight={1500} m={1}>
               Explore New Places
      </Box>
               
              </Typography>
            )}
          </div>
          {props.login  && (
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              
              <Typography component="div">
                <Box fontWeight="fontWeightBold" m={1}>
                  {props.name[0].toUpperCase() + props.name.slice(1)}
                </Box>
                <Box
                  fontWeight="fontWeightLight"
                  fontSize="fontSize"
                  color="#90a4ae"
                  m={1}
                >
                  {props.email}
                </Box>
              </Typography>
              <hr></hr>
              <MenuItem onClick={()=>{history.push("/summer")}}>
              <HomeIcon style={{ marginRight: "0.88rem" }} /> Home
              </MenuItem>
              {props.role==="Admin"?(<> <MenuItem onClick={()=>{history.push("/hidden")}}>
               
                <VisibilityOffIcon style={{ marginRight: "0.88rem" }} /> Hidden
              </MenuItem>
              <MenuItem
                style={{ marginBottom: "1rem" }}
                onClick={() => {
                  props.admin();
                }}
              >
                <AddCircleOutlineRoundedIcon
                  style={{ marginRight: "0.88rem" }}
                />
                Create Admin
              </MenuItem></>):<>
              <MenuItem
                style={{ marginBottom: "1rem" }}
                onClick={() => {
                  setProfile(true);
                }}
              >             
                    <AccountCircleIcon style={{ marginRight: "0.88rem" }}/>
                 Profile 
                 </MenuItem>
              </>}
              <Button
              onClick={() => {
                logoutHandler();
              }}
                style={{
                  marginLeft: "10px",
                  border: "2px solid",
                  fontVariant: "2px",
                  width: "8rem",
                }}
                variant="text"
                size="small"
              >
                logout
              </Button>
              {console.log(props.show)}
              

              <Dialog
                open={props.addadmin}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
              >
                <SignUpAdmin />
              </Dialog>
            </Menu>
          )}
          <Grid>
            <Tabs
              style={{ msAlignSelf: "center",color:"#000051",fontWeight:"fontWeightBold"}}
              value={value}
              onChange={handleChange}
              fontWeight="fontWeightBold"
              aria-label="simple tabs example"
              classes={classes.tabHeight}
            >
              <Tab label="Summer" component={Link} to="/summer" />
              <Tab label="Winter" component={Link} to="/winter" />
              <Tab label="Monsoon" component={Link} to="/monsoon" />
            </Tabs>
            {/* <Button
                color="primary"
                onClick={() => posthandler("/hidden")}
                style={{ color: "#bbdefb" }}
              >
                </>
              </Button> */}
          </Grid>
          <Grid>
            {!props.login ? (
              <Box m={1}>
                <Button
                   
                  style={buttonColor}
                  variant="contained"
                  onClick={() => handleClose("/signup")}
                  color="inherit"
                >
                  Signup
                </Button>
                {!props.login && (
                  <Button
                    variant="contained"
                    style={buttonColor}
                    onClick={() => handleClose("/signin")}
                    color="inherit"
                  >
                    login
                  </Button>
                )}
              </Box>
            ) : (
              
                
                <Avatar 
                  onClick={handleMenu}
                  style={{ backgroundColor: "#002171", marginRight:"2rem",padding:"0",marginTop:"0.2rem"}}
                >
                  {props.name[0].toUpperCase()}
                </Avatar>
                
             
            )}

            <Dialog
              onClose={handleClose}
              aria-labelledby="simple-dialog-title"
              open={profile}
            >
              <Grid
                container
                justify="center"
                alignItems="center"
                direction="column"
                style={{ padding: "1rem" }}
              >
                <Avatar style={avatarStyle}>
                  <PersonIcon />
                </Avatar>

                <DialogTitle align="center" id="simple-dialog-title">
                  User Profile
                </DialogTitle>
                <Typography
                  variant="h6"
                  className={classes.title}
                  titleStyle={{ textAlign: "center" }}
                >
                  Name: {props.name}
                </Typography>
                <Typography variant="h6">Email:{props.email}</Typography>
                <Typography variant="h6" className={classes.title}>
                  Mobile Number:{props.phoneNumber}
                </Typography>
              </Grid>
            </Dialog>
          </Grid>
        </Grid>
      </AppBar>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    login: state.login,
    role: state.role,
    show: state.show,
    addadmin: state.addAdmin,
    name: state.name,
    email: state.email,
    phoneNumber: state.phoneNumber,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch({ type: LOGOUT });
    },
    showB: () => {
      dispatch({ type: SHOW });
    },
    admin: () => {
      dispatch({ type: ADMIN });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
