import React, { useState } from "react";
import { Grid, Avatar, TextField, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory, withRouter } from "react-router-dom";
import { FormHelperText } from "@material-ui/core";
import { connect } from "react-redux";
import StarRateIcon from "@material-ui/icons/StarRate";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { PACKAGESHOW } from "../../store/action";

const CreatePackage = (props) => {
  const history = useHistory();
  const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" };
  const avatarStyle = { backgroundColor: "#3f51b5" };
  const marginTop = { marginTop: 15 };
  const buttonStyle = {
    marginTop: 15,
    marginLeft: "2rem",
    alignContent: "justify",
  };
  const [openAlert, setOpenAlert] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const [field, setField] = useState("");

  const initialValues = {
    title: "",
    price: 0,
    days: 0,
    food: false,
    adventures: false,
    description: "",
    id: props.placeid,
    hotelCategory: "",
    field: "",
  };

  const handleClose = () => {
    history.goBack();
  };
  const onSubmit = (values) => {
    values.price = Number(values.price);
    values.days = Number(values.days);
    values.hotelCategory = Number(values.hotelCategory);
    const data = new FormData();
    try {
      field.forEach((img) => {
        data.append("avatar", img);
      });

      data.append("title", values.title);
      data.append("description", values.description);
      data.append("price", values.price);
      data.append("food", values.food);
      data.append("days", values.days);
      data.append("adventures", values.adventures);
      data.append("hotelCategory", values.hotelCategory);
    } catch (e) {
      console.log(e);
    }

    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .post("http://localhost:4000/package", data, config)
      .then((response) => {
        setOpenAlert(true);
        console.log("done", response);
      })
      .catch((e) => console.log("error", e));
    setTimeout(function () {
      handleClose();
    }, 3000);
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().max(25).required("Required"),
    price: Yup.number().positive().required("Required"),
    days: Yup.number().positive().min(1).required("Required"),
    description: Yup.string().required("Required"),
    hotelCategory: Yup.string().required("Choose the Category"),
    field: Yup.string().required("Image is Required"),
  });

  return (
    <div>
      <Dialog
        style={{ maxHeight: "100%" }}
        open={props.packageShow}
        onClose={() => props.showPackage()}
        aria-labelledby="form-dialog-title"
      >
        <Grid margin="dense">
          <DialogContent>
            <Grid>
              <Avatar style={avatarStyle}>
                <AddIcon />
              </Avatar>
              <h2>Add Package</h2>
            </Grid>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              {(props) => (
                <Form style={{ margin: "dense" }}>
                  <Field
                    as={TextField}
                    fullWidth
                    variant="outlined"
                    label="Title"
                    name="title"
                    helperText={<ErrorMessage name="title" />}
                    placeholder="Enter Package Title"
                  />
                  <Field
                    as={TextField}
                    fullWidth
                    style={{ marginTop: "0.2rem" }}
                    variant="outlined"
                    label="Description"
                    name="description"
                    helperText={<ErrorMessage name="description" />}
                    placeholder="Enter Iternary"
                  />
                  <Field
                    style={{ marginTop: "0.2rem", marginRight: "1rem" }}
                    as={TextField}
                    variant="outlined"
                    label="Price"
                    helperText={<ErrorMessage name="price" />}
                    name="price"
                    placeholder="Enter Price"
                  />
                  <Field
                    helperText={<ErrorMessage name="days" />}
                    style={{ marginTop: "0.2rem", marginRight: "1rem" }}
                    as={TextField}
                    variant="outlined"
                    label="Days"
                    name="days"
                    placeholder="Enter number of days"
                  />
                  <div style={{ marginTop: "0.8rem" }} id="checkbox-group">
                    In Package this Includes?
                  </div>
                  <div role="group" aria-labelledby="checkbox-group">
                    <label style={{ marginRight: "1rem" }}>
                      <Field type="checkbox" name="food" />
                      Food
                    </label>
                    <label>
                      <Field type="checkbox" name="adventures" />
                      Adventures
                    </label>
                  </div>

                  <div id="checkbox-group" style={{ marginTop: "0.8rem" }}>
                    HotelCategory
                  </div>
                  <div role="group" aria-labelledby="my-radio-group">
                    <label>
                      <Field type="radio" name="hotelCategory" value="1" />
                      1<StarRateIcon />
                    </label>
                    <label>
                      <Field type="radio" name="hotelCategory" value="2" />
                      2<StarRateIcon />
                    </label>
                    <label>
                      <Field type="radio" name="hotelCategory" value="3" />
                      3<StarRateIcon />
                    </label>
                    <label>
                      <Field type="radio" name="hotelCategory" value="4" />
                      4<StarRateIcon />
                    </label>
                    <label>
                      <Field type="radio" name="hotelCategory" value="5" />
                      5<StarRateIcon />
                    </label>
                    <FormHelperText>
                      <ErrorMessage
                        component="div"
                        className="input-error"
                        name="hotelCategory"
                      />
                    </FormHelperText>
                  </div>

                  <div style={{ marginTop: "0.8rem" }} className="form-group">
                    <label style={{ marginRight: "0.8rem" }} for="file">
                      File upload
                    </label>
                    <input
                      id="file"
                      name="field"
                      type="file"
                      multiple
                      onChange={(event) => {
                        setField(event.currentTarget.files);
                      }}
                      className="form-control"
                    />
                    <FormHelperText>
                      <ErrorMessage
                        component="div"
                        className="input-error"
                        name="field"
                      />
                    </FormHelperText>
                  </div>

                  <Grid align="center">
                    <Button
                      style={buttonStyle}
                      onClick={() => {
                        props.showPackage();
                      }}
                      variant="contained"
                      color="primary"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      style={buttonStyle}
                      variant="contained"
                      color="primary"
                    >
                      Submit
                    </Button>
                  </Grid>
                  <Snackbar
                    open={openAlert}
                    autoHideDuration={3000}
                    onClose={handleClose}
                  >
                    <Alert onClose={handleClose} severity="success">
                      Updated!
                    </Alert>
                  </Snackbar>
                </Form>
              )}
            </Formik>
          </DialogContent>
        </Grid>
      </Dialog>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    packageShow: state.packageShow,
    role: state.role,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    showPackage: () => {
      dispatch({ type: PACKAGESHOW });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreatePackage);
