import React from "react";
import Header from "../navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import CardPackage from "./CardPackage";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Tableitem from "../Season/table";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import AddPackage from "../Admin/AddPackage";
import Dialog from "@material-ui/core/Dialog";
import { PACKAGESHOW } from "../../store/action";
import Button from "@material-ui/core/Button";
import CreatePackage from "../Admin/AddPackage"
const useStyles = makeStyles((theme) => ({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
    paddingTop: "40px",
    paddingBottom: "40px",
  },
}));

const TourPackage = (props) => {
  const classes = useStyles();
  const [showPackage, setShowPackage] = useState(false);
  const [change, setChange] = useState(false);
  const [error, seterror] = useState("");
  const [tourPackages, settourPackages] = useState([]);

  const updateDeleted = (ids) => {
    const updatedPackages = tourPackages.filter(
      (pkg) => !ids.includes(pkg._id)
    );
    console.log(updatedPackages);
    settourPackages(updatedPackages);
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/packages/" + props.match.params.id)
      .then((response) => {
        settourPackages(response.data);
      })
      .catch((e) => {
        console.log(e);
        seterror(e);
      });
  }, [change]);
  return (
    <div style={{ marginTop: "5rem" }}>
      <Header packageTitle="Explore the Packages" />
      <h3 align="center" style={{ color: "#4caf50" }}>
        Packages
      </h3>
      <CreatePackage/>
      {props.role === "Admin" && (
        <Button
          onClick={() => {
           
            props.showPackage()
            
          }}
          style={{
            backgroundColor: "#e8f5e9",
            marginTop: "1rem",
            marginLeft: "65rem",
            marginRight: "2rem",
          }}
        >
          ADD
          <AddCircleOutlineRoundedIcon />
        </Button>
      )}
      <Dialog
        open={showPackage}
        onClose={() => {
          props.showPackage()
        }}
        aria-labelledby="form-dialog-title"
      >
        <AddPackage placeid={props.match.params.id} />
      </Dialog>

      {props.role === "Admin" ? (
        tourPackages.length === 0 ? (
          <h5>No Packages</h5>
        ) : (
          <>
            <Tableitem
              tourPackages={tourPackages}
              updateDeleted={updateDeleted}
            />
          </>
        )
      ) : (
        <Grid
          item
          xs={12}
          container
          justify="center"
          className={classes.gridContainer}
        >
          {tourPackages.length === 0 ? (
            <h5>No Packages</h5>
          ) : (
            tourPackages.map((tourPackage) => (
              <CardPackage
                setChange={setChange}
                id={tourPackage._id}
                title={tourPackage.title}
                food={tourPackage.food}
                price={tourPackage.price}
                hotelCategory={tourPackage.hotelCategory}
                days={tourPackage.days}
                adventures={tourPackage.adventures}
                show={tourPackage.show}
                image={tourPackage.avatar[0]}
              />
            ))
          )}
        </Grid>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    role: state.role,
    showDialogBox: state.packageShow,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    showPackage: () => {
      dispatch({ type: PACKAGESHOW });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TourPackage);
