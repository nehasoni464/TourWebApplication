import React from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import { CheckboxWithLabel } from 'formik-material-ui';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import {connect} from 'react-redux'
import {ADMIN} from '../../store/action'
import {useHistory} from "react-router-dom"


const Signup = (props) => {
    
    const history =useHistory()
    const paperStyle = { padding: '30px 20px', width: 350, margin: '20px auto' }
    const avatarStyle = { backgroundColor: "#3f51b5" }
    
    const phoneRegExp=/^[2-9]{2}[0-9]{8}/
    const passwordRegExp=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    const buttonStyle={marginTop:5, marginLeft:'2rem', alignContent:'justify'}
    let personRole=""
    props.role==='Admin'?personRole='Admin':personRole='User'
    
    const initialValues = {
        email: "",
        password: "",
        name: "",
        phoneNumber: "",
        confirmPassword: "",
        role:personRole,
        checkedA:false

    }
    const handleClose=()=>{
        props.admin()
        history.push('/summer')
    }
    const onSubmit = (values, props) => {
         console.log(values)
            
        history.push('/signin');
        axios.post('http://localhost:4000/signup',values).then((response)=>
        console.log("response"))
    .catch((e)=>console.log("error",e))
        


    }
    

    const validationSchema = Yup.object().shape({
        name:Yup.string().min(3).required("Required"),
        email: Yup.string().email('Please Enter Valid Email'),
        phoneNumber:Yup.string().matches(phoneRegExp,"Enter valid Phone number").required("Required"),
        password: Yup.string().min(8, "Minimum characters should be 8")
        .matches(passwordRegExp,"Password must have one upper, lower case, number, special symbol").required('Required'),
        confirmPassword:Yup.string().oneOf([Yup.ref('password')],"Password not matches").required('Required'),
       checkedA:Yup.bool().oneOf([true],'Accept Terms & Conditions is required')

    })


    return (
        <div>
           
            <Grid>
                <Paper elevation={20} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}>
                            <PersonAddIcon />
                        </Avatar>
                        <h2>SignUp</h2>
                        <Typography variant='caption'>Please fill this form to create an account</Typography>
                    </Grid>
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                        {(props) => (
                            <Form>

                                <Field as={TextField} variant="outlined" fullWidth label='Name' name="name" helperText={<ErrorMessage name="name"/>} placeholder="Enter your Name" />
                                <Field as={TextField} variant="outlined" fullWidth label='Email' helperText={<ErrorMessage name="email" />} name="email" placeholder="Enter your Email" />
                                <Field as={TextField} variant="outlined" fullWidth label='Phone Number' name="phoneNumber" helperText={<ErrorMessage name="phoneNumber"/>}placeholder="Enter your Phone Number" /> 
                               
                                <Field as={TextField} variant="outlined"  type="password" fullWidth name="password" label='Password'  helperText={<ErrorMessage name="password"/>}/>
                                <Field as={TextField}  variant="outlined" type="password"  fullWidth name="confirmPassword" helperText={<ErrorMessage name="confirmPassword"/>} label='Confirm Password' />
                                
                                <Field  
                                    component={CheckboxWithLabel}
                                    type="checkbox"
                                    name="checkedA"
                                    Label={{ label: 'I accept the terms and Conditions' }}
                                    helpertext={<ErrorMessage name="checkedA"/>}
                                />
                                <Button  onClick={()=>{handleClose()}}style={buttonStyle} variant='contained' color="primary">Cancel</Button>
                                <Button type='submit' style={buttonStyle} variant='contained' color="primary">Submit</Button>
                               
                            </Form>)}
                    </Formik>

                </Paper>
            </Grid>
        </div>


    )
}
const mapStateToProps=(state)=>{
    return{
        role:state.role,
        login:state.login
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
      admin:()=>{
        dispatch({type:ADMIN})
  
      }
  
      
    };
  };
export default connect(mapStateToProps,mapDispatchToProps)(Signup);