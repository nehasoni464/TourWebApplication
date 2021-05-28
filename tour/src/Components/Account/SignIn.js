import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { connect } from "react-redux";
import { LOGIN} from "../../store/action";
import HomeIcon from '@material-ui/icons/Home';

const Login = (props) => {
  const { login } = props;
  const [error, seterror] = useState("");
  const history = useHistory();
  const paperStyle = {
    padding: 20,
    height: "85vh",
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "20px 0", marginTop: "48px" };
  const marginTop = { marginTop: "28px" };
  const color = { color: "red" };
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (values, props) => {
    console.log(values);
    axios
      .post("http://localhost:4000/signin", values)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        console.log();
        login(response.data.user.role,response.data.user.name,response.data.user.email,response.data.user.phoneNumber,response.data.user._id);
        history.push("/summer");
        console.log("done", response);
      })
      .catch((e) => {
        console.log(e)
        seterror(e.response.data);
        setTimeout(() => {
          props.resetForm();
          props.setSubmitting(false);
          seterror("");
        }, 3000);
        console.log("error", e.response.data);
      });
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Please Enter Valid Email"),
    password: Yup.string().min(3),
  });

  return (
    <div>
    
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Sign In</h2>
        {error && <h5 style={color}>{error}</h5>}
          </Grid>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {(props) => (
              <Form>
                <Field
                  as={TextField}
                  variant="outlined"
                  label="Email"
                  name="email"
                  placeholder="Enter Email"
                  helperText={<ErrorMessage name="email" />}
                  fullWidth
                  required
                />
                <Field
                  as={TextField}
                  variant="outlined"
                  label="Password"
                  name="password"
                  placeholder="Enter password"
                  type="password"
                  fullWidth
                  required
                  style={marginTop}
                  helperText={<ErrorMessage name="password" />}
                />
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  style={btnstyle}
                  fullWidth
                  disabled={props.isSubmitting}
                >
                  {props.isSubmitting ? "Loading..." : "SignIn"}
                </Button>
              </Form>
            )}
          </Formik>
          <Typography style={marginTop}>
           
            Do you have an account ?<Link href="/signup">Sign Up</Link>
          </Typography>
          <Button onClick={()=>{history.push('/summer')}} onstyle={{display:"flex",alignSelf:"flex-end"}}>go to home<HomeIcon/></Button>
        </Paper>
      
      </Grid>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    loginState: state.login,
    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (role,name,email,phoneNumber,userid) => {
      dispatch({
        type: LOGIN,
        role,
        name,
        email,
        phoneNumber,
        userid
      });
    }
    
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
