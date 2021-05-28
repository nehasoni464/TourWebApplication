import React,{useEffect} from "react";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory,withRouter} from "react-router-dom";
import { FormHelperText } from "@material-ui/core";
import { connect } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import StarRateIcon from "@material-ui/icons/StarRate";
import Snackbar from "@material-ui/core/Snackbar";



const UpdatePackage = (props) => {
  console.log("props", props);
  const id = props.location.id;
  const history = useHistory();
  const paperStyle = { padding: "30px 20px", width: 600, margin: "20px auto" };
  const avatarStyle = { backgroundColor: "#3f51b5",marginTop:"0.8rem" }
  const marginTop = { marginTop: 15 };
  const buttonStyle = {
    marginBottom:"1rem",
    marginTop: 25,
    marginLeft: "8rem",
    alignContent: "justify",
  };
  const [open, setOpen] = React.useState(true);
  const [openAlert, setOpenAlert] = React.useState(false);
const [initialValues,setInitialValues]=React.useState({
  title:"",
  days:"",
  price:"",
  description:""
})
  
useEffect(() => {
  const {id}=props.match.params
  axios.get(`http://localhost:4000/package/${id}`).then((response)=>{
    console.log(response)
    const updateValue = {
      title: response.data.title,
      price: response.data.price,
      days: response.data.days,
      food: response.data.food,
      adventures: response.data.adventures,
      description:response.data.description,
      hotelCategory: response.data.hotelCategory.toString(),
    };
   
    setInitialValues(updateValue)
  }).catch((e)=>console.log("error",e))
}, [])


  

  const handleClose = () => {
    setOpenAlert(false);
    history.goBack();
  };
  // const handleClick = () => {
  //   setOpenAlert(true);
  // };
  const onSubmit = (values) => {

    values.price = Number(values.price);
    values.days = Number(values.days);
     values.hotelCategory=Number(values.hotelCategory)
    

    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .patch("http://localhost:4000/update", { values, id }, config)
      .then((response) => {
        setOpenAlert(true);
        console.log("doneupdate", response);
      })
      .catch((e) => console.log("error", e));
    setTimeout(function () {
      handleClose();
    }, 3000);
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().max(25).required("Required"),

    price: Yup.number().required("Required"),
    days: Yup.number().required("Required"),

    //hotelCategory:Yup.array().max(1).required("Required"),
  });

  return props.login && props.role === "Admin" ? (
    <div>
      <Grid>
        <Paper  style={{margin:"dense    ",marginTop:"1rem",marginLeft:"15rem",marginRight:"15rem",marginBottom:"0.8rem"}}> 
          <Grid align="center" style={{margin:"dense"}} >
            <Avatar style={avatarStyle}>
              <AddIcon />
            </Avatar>
            <h2 style={{margin:"0"}}>Update Package</h2>
            <Typography  variant="caption">
              Add Details To Create New Package
            </Typography>
          </Grid>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            >
            {(props) => (
              <Form style={{margin:"dense",marginLeft:"2rem",marginRight:"2rem"}}  >
                
                <Field
                
               fullWidth
                 variant="outlined"
                  as={TextField}
                  
                  label="Title"
                  name="title"
                  helperText={<ErrorMessage name="title" />}
                  placeholder="Enter Package Title"
                /><Field
                style={{marginTop:"1rem"}}
                as={TextField}
                variant="outlined"
                multiline 
                rows={3}
                // style={{maxHeight:"10rem",minHeight:"10rem"}}
                fullWidth
                 
                 label="Itenary"
                 name="description"
                 helperText={<ErrorMessage name="description" />}
                 placeholder="Enter Itenary"
               />

                <Field
                
                variant="outlined"
                  as={TextField}
                  style={{marginTop:"1rem"}}
                  label="Price"
                  helperText={<ErrorMessage name="price" />}
                  name="price"
                  placeholder="Enter Price"
                />
                <Field 
                style={{marginLeft:"2rem",marginTop:"1rem"}}
                variant="outlined"
                  as={TextField}
                  
                  label="Days"
                  helperText={<ErrorMessage name="days" />}
                  name="days"
                  placeholder="Enter number of days"
                />
               < div style={marginTop} id="checkbox-group">
                  HotelCategory
                </div>
                <div role="group" aria-labelledby="my-radio-group">
            <label>
              <Field type="radio" name="hotelCategory" value="1" />
              1<StarRateIcon/>
            </label>
            <label>
              <Field type="radio" name="hotelCategory" value="2" />
              2<StarRateIcon/>
            </label>
            <label>
              <Field type="radio" name="hotelCategory" value="3" />
              3<StarRateIcon/>
            </label>
            <label>
              <Field type="radio" name="hotelCategory" value="4" />
              4<StarRateIcon/>
            </label>
            <label>
              <Field type="radio" name="hotelCategory" value="5" />
              5<StarRateIcon/>
            </label>
            
          </div>

                <div style={marginTop} id="checkbox-group">
                  In Package this Includes?
                </div>
                <div role="group" aria-labelledby="checkbox-group">
                  <label>
                    <Field type="checkbox" name="food" />
                    food
                  </label>
                  <label>
                    <Field type="checkbox" name="adventures" />
                    Adventures
                  </label>

                  <FormHelperText>
                    <ErrorMessage
                      component="div"
                      className="input-error"
                      name="hotelCategory"
                    />
                  </FormHelperText>
                </div>
                <Button
                  style={buttonStyle}
                  onClick={handleClose}
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
        </Paper>
      </Grid>
    </div>
  ) : (
    <div>
      {
        <Collapse in={open}>
          <Alert
            severity="warning"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                  history.goBack();
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            Only Authorized to Admin!!
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
  };
};

export default withRouter(connect(mapStateToProps, null)(UpdatePackage));
