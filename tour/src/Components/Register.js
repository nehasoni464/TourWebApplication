import React from "react";
import Header from "./navbar";

import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import AddIcon from "@material-ui/icons/Add";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory, withRouter } from "react-router-dom";
import { FormHelperText } from "@material-ui/core";
import { connect } from "react-redux";
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';


import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from "@material-ui/core/Snackbar";


const Register = (props) => {
  console.log(props)
  const id=props.location.id
  const history = useHistory();
  const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" };
  const avatarStyle = { backgroundColor: "#3f51b5" };
  const marginTop = { marginTop: 10 };
  const [open, setOpen] = React.useState(true);
  const [openAlert, setOpenAlert] = React.useState(false);
  const phoneRegExp=/^[2-9]{2}[0-9]{8}/
  var today = moment();
  const [selectedDate, setSelectedDate] = React.useState(new Date(today.toDate()));
  const initialValues = {
    name: "",
    city: "",
   mobileNumber: "",
  
  };
  const handleClose = (props) => {
    history.goBack();
  };
  

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const onSubmit = (values) => {
    values.date=selectedDate
    values.bookedUser=props.userid
    values.packageID=id
   
   axios
      .post("http://localhost:4000/register", {values})
      .then((response) => {setOpenAlert(true); console.log("done", response)})
      .catch((e) => console.log("error", e));
     setTimeout(function () {
      handleClose();
    }, 3000);
  };

  const validationSchema = Yup.object().shape({
      name:Yup.string().required("Required"),
      city:Yup.string().max(350).required("Required"),
     mobileNumber:Yup.string().matches(phoneRegExp,"Enter valid Phone number").required("Required"),
         })

  return props.login && props.role === "User" ? (
    
    <div style={{ marginTop: "8rem" }}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Header
      
      />
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <AddIcon />
            </Avatar>
            <h2>Booking </h2>
            <Typography variant="caption">Kindly Add your Details</Typography>
          </Grid>
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {(props) => (
              <Form>
                <Field
                  as={TextField}
                  fullWidth
                  label="Name"
                  helperText={<ErrorMessage name="name" />}
                  name="name"
                  placeholder="Enter Name"
                />
                <Field
                  as={TextField}
                  fullWidth
                  label="Departure City"
                  name="city"
                  helperText={<ErrorMessage name="city" />}
                  placeholder="Enter Departure City"
                />
                {/* <Field
                  as={TextField}
                  fullWidth
                  label="Travel Date"
                  helperText={<ErrorMessage name="travelDate" />}
                  name="travelDate"
                  placeholder="Enter Travel Data"
                /> */}
                <Field
                  as={TextField}
                  fullWidth
                  label="Mobile Number"
                  helperText={<ErrorMessage name="mobileNumber" />}
                  name="mobileNumber"
                  placeholder="Enter Travel Data"
                />
                <KeyboardDatePicker
                name="date"
                  margin="normal"
                  id="date-picker-dialog"
                  label="Travel date"
                  format="MM/dd/yyyy"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
                <Grid align="center">
                <Button
                onClick={()=>{history.goBack()}}
                  type="submit"
                  style={{marginTop:"2rem",marginRight:"2rem"}}
                  variant="contained"
                  color="primary"
                >
                  cancel
                </Button>
                <Button
                  type="submit"
                  style={{marginTop:"2rem"}}
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
                    Registered!
                  </Alert>
                </Snackbar>
              </Form>
            )}
          </Formik>
        </Paper>
      </Grid>
   




        </MuiPickersUtilsProvider>
       </div>
  ) : (
    <div>
      {<Collapse in={open}>
        <Alert severity="warning"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
                history.goBack()  
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
        Please Login !! Only Authorized to User
        </Alert>
      </Collapse>
        }
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    login: state.login,
    role: state.role,
    userid:state.userid
  };
};
export default withRouter( connect(mapStateToProps, null)(Register));
