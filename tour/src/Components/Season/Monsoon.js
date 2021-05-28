import React from "react";
import Header from "../navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./card";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { fade, makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { connect } from "react-redux";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import AddPlace from "../Admin/placeAdmin";
import Dialog from "@material-ui/core/Dialog";
import { SHOW } from "../../store/action";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
    paddingTop: "40px",
    paddingBottom: "40px",
  },
  search: {
    position: "relative",
    // border:"2px solid",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade("#81d4fa", 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "70%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    color: "#000051",
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "90%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Monsoon = (props) => {
  const classes = useStyles();
  const [places, setplaces] = useState([]);
  const [change, setChange] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [sortBy, setSortBy] = useState("");
  const [search, setSearch] = React.useState("");
  const [sortName,setSortName]=React.useState("SortBy")
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/monsoon?sortBy=${sortBy}&search=${search}`)
      .then((response) => {
        setplaces(response.data);
        setAnchorEl(null);
      })
      .catch((e) => console.log("error", e));
  }, [change, sortBy, search]);
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      style={{ marginTop: "4rem" }}
    >
      <Header />
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        style={{ flexWrap: "nowrap", maxHeight: "4rem", maxWidth: "90%" }}
      >
        <h2>Welcome Pluviophile</h2>
        <Grid style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{ marginTop: "1rem",marginRight: "1rem" }}
            className={classes.search}
          >
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <Button
            style={{
              backgroundColor: "#e8eaf6",
              marginRight: "1rem",
              marginTop: "1rem",
            }}
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
           {sortName}
            <ArrowDropDownIcon />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                setSortName("Alphabetically")
                setSortBy("alphabetically");
              }}
            >
              Alphabetic Order
            </MenuItem>
            <MenuItem
              onClick={() => {
                setSortName("Recent")
                setSortBy("recent");
              }}
            >
              Recent Add
            </MenuItem>
          </Menu>

          {props.role === "Admin" && (
          <Button
            onClick={() => {
              props.show();
            }}
            style={{
              backgroundColor: "#e8f5e9",
              marginTop: "1rem",
             
              
            }}
          >
            ADD
            <AddCircleOutlineRoundedIcon />
          </Button>
        )}
        </Grid>
        
        <Dialog
          open={props.showDialogBox}
          onClose={() => {
            props.show();
          }}
          aria-labelledby="form-dialog-title"
        >
          <AddPlace />
        </Dialog>
      </Grid>

      <Grid
        item
        xs={12}
        container
        justify="center"
        className={classes.gridContainer}
      >
        {places.length === 0 ? (
          <h5>No such place in Monsoon</h5>
        ) : (
          places.map((place) => (
            <Card
              image={place.avatar}
              setChange={setChange}
              title={place.title}
              body={place.description}
              season={place.season}
              id={place._id}
              show={place.show}
              checkedA={true}
            />
          ))
        )}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    role: state.role,
    showDialogBox: state.show,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    show: () => {
      dispatch({ type: SHOW });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Monsoon);
