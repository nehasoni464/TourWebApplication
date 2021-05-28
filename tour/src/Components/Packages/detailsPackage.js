import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Header from "../navbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 200,
  },
  depositContext: {
    flex: 1,
  },
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));

function preventDefault(event) {
  event.preventDefault();
}
export default function SingleLineGridList(props) {
  const history = useHistory();
  const classes = useStyles();
  const [rating, setRating] = React.useState(2);
  const [dialogBox, setDialogBox] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [tileData, setTileData] = useState([]);
  const [detailPackage, setDetailPackage] = useState({});
  const [change, setChange] = useState(false);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [error, seterror] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:4000/package/" + props.match.params.id, {})
      .then((response) => {
        setDetailPackage(response.data);
        var imageData = [];
        response.data.avatar.forEach((img) => {
          imageData.push({
            img,
            title: response.data.placeTitle,
          });
        });
        setTileData(imageData);
        console.log("responsefrom Packages", response);
      })
      .catch((e) => {
        console.log(e);
        seterror(e);
      });
  }, [change]);

  const dialogClose = () => {
    setDialogBox(false);
  };
  return (
    <Grid>
      <Header />
      <Typography
        align="center"
        style={{
          marginTop: "5rem",
          paddingLeft: "2rem",
          color: "#000051",
        }}
        variant="h3"
      >
        {detailPackage.placeTitle}
      </Typography>
      <Grid
        container
        item
        xs={8}
        style={{
          paddingLeft: "2rem",
        }}
      >
        <h2 style={{ padding: 0, color: "#283593" }}> Gallery </h2>
        <GridList className={classes.gridList} cols={2.5}>
          {tileData.map((tile) => (
            <GridListTile
              style={{ width: "25rem", height: "15rem" }}
              key={tile.img}
            >
              <img src={`data:image/png;base64,${tile.img}`} alt={tile.title} />

              <GridListTileBar
                title={tile.title}
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
                actionIcon={
                  <IconButton aria-label={`star ${tile.title}`}>
                    <StarBorderIcon className={classes.title} />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </Grid>
      <Grid container direction="row">
        <Grid
          item
          xs={7}
          container
          style={{ marginLeft: "2rem", padding: "1rem" }}
        >
          <h2 style={{ padding: 0, color: "#283593" }}>Iternary</h2>
          <Typography
            style={{
              textAlign: "justify",
              textJustify: "inter-word",
              whiteSpace: "pre-wrap",
            }}
          >
            {detailPackage.description}
          </Typography>
        </Grid>

        <Grid item xs={5} direction="column">
          <Paper
            className={fixedHeightPaper}
            align="center"
            style={{
              marginTop: "2rem",
              position: "fixed",
              top: 80,
              right: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "17rem",
              height: "22rem",
              border: "2px solid",
            }}
          >
            <React.Fragment>
              <Typography variant="h4" style={{ backgroundColor: "#e3f2fd" }}>
                Total Package Price
              </Typography>
              <Typography component="p" variant="h4">
                ₹{detailPackage.price}
              </Typography>
              <Typography
                color="textSecondary"
                className={classes.depositContext}
              >
                (Taxes are not included in this price)
                <hr></hr>
              </Typography>
              <Typography
                style={{ backgroundColor: "#fce4ec" }}
                color="textSecondary"
                className={classes.depositContext}
              >
                Zero Cancellation Charges
              </Typography>
              <hr></hr>
              <Typography
                style={{ backgroundColor: "#fce4ec" }}
                color="textSecondary"
                className={classes.depositContext}
              >
                Best Price
              </Typography>
              <hr></hr>
              <Typography
                style={{ backgroundColor: "#fce4ec" }}
                color="textSecondary"
                className={classes.depositContext}
              >
                Easy to Book
              </Typography>
              <hr></hr>

              <div align="flex-end">
                {/* <Link color="primary" href="#" onClick={preventDefault}>
          
        </Link> */}
                <Button
                  onClick={() => {
                    history.push("/register");
                  }}
                  style={{
                    marginTop: "0.8rem",
                    backgroundColor: "#ff8a65",
                    marginLeft: "10px",
                    border: "2px solid",
                    fontVariant: "2px",
                    width: "10rem",
                    borderRadius: "10px",
                  }}
                  variant="text"
                  size="small"
                >
                  Book Now
                </Button>
              </div>
            </React.Fragment>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}
