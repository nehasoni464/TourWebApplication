import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import Switch from "@material-ui/core/Switch";
import Box from "@material-ui/core/Box";
import axios from "axios";
import { connect } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
    paddingTop: "40px",
    paddingBottom: "40px",
  },
  root: {
    maxWidth: "20rem",
    maxHeight: "25rem",
    minWidth: "20rem",
    minHeight: "25rem",
  },
  media: {
    maxHeight: 180,
    minHeight: 180,
    maxWidth: "18rem",
    minWidth: "18rem",
  },
});
const MediaCard = (props) => {
  console.log(props)
  const classes = useStyles();
  const history = useHistory();

  const [state, setState] = React.useState({
    checkedA: props.show,
    checkedB: true,
  });
  const [visible, setVisible] = React.useState({
    visible: "visibile",
  });
  const packageDialoagOpen = () => {
    props.showPackages();
  };
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    state.visible == "visible"
      ? setVisible({ ...visible, visible: "hidden" })
      : setVisible({ ...visible, visible: "visible" });

    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      axios
        .post("http://localhost:4000/hidden", props,config)
        .then((response) => {
          props.setChange(Math.random());
          console.log("in response: ", response.config.url);
        })
        .catch((e) => console.log("error", e));
    } catch (err) {
      console.log("props err: ", err);
    }
  };
  const handleClose = (pageURL) => {
    history.push({
      pathname: pageURL,
      id: props.id,
      title: props.title,
      body: props.body,
      season: props.season,
    });
  };
  return (
    <Box
      component="div"
      borderRadius={16}
      square={false}
      visibility={visible.visible}
      style={{ margin: "1rem", paddingBottom: ".4rem" }}
    >
      <Card className={classes.root}>
        <CardActionArea
          onClick={(e) => {
            if (
              e.target.name !== "checkedA" &&
              e.target.name !== "editButton"
            ) {
              handleClose("package/" + props.id);
            } else {
              console.log(props._id);
            }
          }}
        >
          <CardContent visibility="hidden">
            {props.role === "Admin" && (
              <Grid style={{ marginLeft: "10rem" }}>
                <Switch
                  checked={props.show}
                  onChange={handleChange}
                  name="checkedA"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
                <Button
                  name="editButton"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClose("/place/" + props.id);
                    return;
                  }}
                >
                  <EditIcon />
                </Button>
              </Grid>
            )}

            <Typography gutterBottom variant="h4" component="h2">
              {props.title}
            </Typography>

            {props.image ? (
              <img
                className={classes.media}
                src={`data:image/png;base64,${props.image}`}
                alt="place-image"
              />
            ) : (
              <img
                src="images/Goa.jpeg"
                class="card-img-top"
                class="img-fluid"
                alt="..."
              />
            )}
            <Typography variant="body2" color="textSecondary" component="p">
              {props.body}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};
const mapStateToProps = (state) => {
  return {
    login: state.login,
    role: state.role,
    showPackage: state.showPackage,
  };
};

export default connect(mapStateToProps, null)(MediaCard);
