import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import Avatar from "@material-ui/core/Avatar";
import { Icon } from "@iconify/react";
import currencyInr from "@iconify-icons/mdi/currency-inr";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import StarIcon from "@material-ui/icons/Star";

import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    display: "flex",
    padding: 0,

    maxHeight: "15rem",
    minHeight: "15rem",
    margin: "1rem",
    maxWidth: "75%",
    minWidth: "75%",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    paddingTop: ".6rem",
    paddingLeft: "3rem",
    width: "70%",
  },
  content: {
    flex: "1 0 auto",
    padding: 0,
    minWidth: "100%",
    maxHeight: "15rem",
    minHeight: "15rem",
  },
  cover: {
    width: 151,
  },

  media: {
    minHeight: 200,
    maxHeight: 200,
    maxWidth: "18rem",
    minWidth: "18rem",
  },
});
const CardPackage = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const titleColor = { color: "#1a237e" };
  const bodyColor = { color: "#9162e4" };

  const [dialogBox, setDialogBox] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    checkedA: props.show,
    checkedB: true,
  });
  const [visible, setVisible] = React.useState({
    visible: "visibile",
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    state.visible === "visible"
      ? setVisible({ ...visible, visible: "hidden" })
      : setVisible({ ...visible, visible: "visible" });
    try {
      axios
        .post("http://localhost:4000/hidden", props)
        .then((response) => {
          props.setChange(Math.random());
          console.log("in response: ", response.config.url);
        })
        .catch((e) => console.log("error", e));
    } catch (err) {
      console.log("Error: ", err);
    }
  };
  const registerhandler = (pageURl) => {
    console.log("register", props.id);
    history.push({
      pathname: pageURl,
      id: props.id,
      title: props.title,
      price: props.price,
      food: props.food,
      days: props.days,
      adventures: props.adventures,
    });
  };
  const handleClose = (pageURL) => {
    console.log("handleclose", props);
    history.push({
      pathname: pageURL,
      id: props.id,
      title: props.title,
      price: props.price,
      food: props.food,
      days: props.days,
      adventures: props.adventures,
      hotelCategory: props.hotelCategory,
    });
  };
  const dialogClose = () => {
    setDialogBox(false);
  };

  return (
    <Card className={classes.root}>
      {props.image ? (
        <img
          className={classes.media}
          src={`data:image/png;base64,${props.image}`}
          alt="place-image"
        />
      ) : (
        <img
          src="/images/Goa.jpeg"
          class="card-img-top"
          class="img-fluid"
          alt="..."
        />
      )}
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Grid
            container
            direction="row"
            style={{ minWidth: "100%", maxHeight: "3rem" }}
          >
            <Avatar>
              <BeachAccessIcon style={titleColor} />
            </Avatar>
            <Typography
              gutterBottom
              variant="h5"
              style={titleColor}
              align="center"
            >
              {props.title}
            </Typography>
          </Grid>
          <Typography variant="h6" style={bodyColor} component="h4">
            Food <FastfoodIcon style={{ color: "brown" }} />:{" "}
            {props.food ? <CheckIcon /> : <ClearIcon />}
          </Typography>
          <Typography variant="h6" style={bodyColor} component="h6">
            Adventure: {new String(props.adventures)}
          </Typography>

          <Typography variant="h6" style={bodyColor} component="h6">
            Days <WbSunnyIcon style={{ color: "#ffb74d" }} />: {props.days}
          </Typography>

          <Typography variant="h6" style={bodyColor} component="h6">
            HotelCategory: {props.hotelCategory}
            <StarIcon style={{ color: "#fdd835" }} />
          </Typography>
        </CardContent>
      </div>
      <Grid
        container
        alignItems="flex-end"
        style={{ maxWidth: "10rem", minHeight: "100%" }}
      >
        <Typography
          variant="h6"
          align="center"
          style={{ backgroundColor: "#fff8e1" }}
          component="h6"
        >
          Price:
          <Icon icon={currencyInr} />
          {props.price}
        </Typography>

        <Button
          style={{ backgroundColor: "#ff8a65", marginBottom: "1rem" }}
          size="small"
          color="primary"
          onClick={() => {
            registerhandler(`/detailPackage/${props.id}`);
          }}
        >
          Book Now
        </Button>
      </Grid>
    </Card>
  );
};
const mapStateToProps = (state) => {
  return {
    login: state.login,
    role: state.role,
    name: state.name,
  };
};
export default connect(mapStateToProps, null)(CardPackage);
