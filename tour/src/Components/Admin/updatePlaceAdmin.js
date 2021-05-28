import React,{useEffect} from 'react'
import Header from '../navbar'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import {useHistory, withRouter} from "react-router-dom"
import { FormHelperText } from '@material-ui/core';
import {connect} from 'react-redux'
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from "@material-ui/core/Snackbar";


const UpdatePlace = (props) => {
  console.log(props)
   
    const history =useHistory()
    const paperStyle = { padding: '30px 20px', width: 300, margin: '20px auto' }
    const avatarStyle = { backgroundColor: "#3f51b5" }
    const marginTop = { marginTop: 10 }
    const [open, setOpen] = React.useState(true);
    const [openAlert, setOpenAlert] = React.useState(false);
    const buttonStyle = {
      marginTop: 25,
      marginLeft: "2rem",
      alignContent: "justify",
    };
    
    const [initialValues,setInitialValues]=React.useState({
      title:"",
      description:"",
       winter:false,
       summer:false,
       monsoon:false,
    })
      
    useEffect(() => {
      const {id}=props.match.params
      axios.get(`http://localhost:4000/place/${id}`).then((response)=>{
        console.log(response)
        const updateValue = {
          title: response.data.title,
          description:response.data.description,
          summer: response.data.season.includes("summer"),
          winter: response.data.season.includes("winter"),
          monsoon: response.data.season.includes("monsoon"),
         
          
        };
       
        setInitialValues(updateValue)
      }).catch((e)=>console.log("error",e))
    }, [])
    
    
      



    const handleClose = () => {
    
      history.goBack();
    };
    const onSubmit = (values) => {
      
    const season=[]
    if(values.winter){season.push("winter")}
    if(values.summer){season.push("summer")}
    if(values.monsoon){season.push("monsoon")}
    values.season=season
    const config={headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
        axios.patch('http://localhost:4000/place/'+props.match.params.id,values,config).then(
        (response)=>{
          setOpenAlert(true);
            console.log("done",response)    }
        ).catch((e)=>console.log("error",e))
        setTimeout(function () {
          handleClose();
        }, 3000);
 }
    
 let validationSchema = Yup.object().shape({
        title:Yup.string().required("Required"),
        description:Yup.string().max(350).required("Required"),
        // season:Yup.array().min(1).required("Required")
        winter:Yup.bool(),
        summer:Yup.bool(),
       monsoon:Yup.bool()    
      })
      validationSchema = validationSchema.test( // this test is added additional to any other (build-in) tests
      'season',
      null, // we'll return error message ourself if needed
      (obj) => {
        console.log(obj)
        // only testing the checkboxes here
        if ( obj.winter || obj.summer||obj.monsoon ) { // put every checkbox here
        return true; // everything is fine
        }
    
        return new Yup.ValidationError(
          'Must select atleast one Season', // your custom error message
            null,
            'season'
          );
        }
    );





    return (
        // (props.login && props.role === "Admin" )? 
        <div >
            
            <Grid>
                <Paper elevation={20} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}>
                            <AddIcon />
                        </Avatar>
                        <h2>EditPlace</h2>
                        <Typography variant='caption'>Add details to create Place</Typography>
                    </Grid>
                    <Formik enableReinitialize initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                        {(props) => (
                            <Form>
                                <Field as={TextField}  variant="outlined" fullWidth label='Title' name="title"  style={{marginBottom:"1rem"}} helperText={<ErrorMessage name="title"/>} placeholder="Enter Name of the Place" />
                                <Field as={TextField} variant="outlined" multiline rows={4} fullWidth label='Description' helperText={<ErrorMessage name="description" />} name="description" placeholder="Enter Description" />
                               <div style={marginTop}id="checkbox-group">Choose Season </div>
                          
                            <div role="group"   aria-labelledby="checkbox-group" >
            <label><Field style={marginTop}  type="checkbox" name="summer"  />
              Summer
            </label>
            <label><Field type="checkbox" name="winter"  />
              Winter
            </label>
            <label>
              <Field type="checkbox" name="monsoon" />
              Monsoon
            </label>
            {/* <ErrorMessage name="winter" render={msg => <div>{msg}</div>} /> */}
            <FormHelperText>
               <ErrorMessage component="div" className="input-error" name="season" />
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
                  <Button type='submit' style={buttonStyle} variant='contained' 
                  color="primary">Submit</Button>
                  <Snackbar
                  open={openAlert}
                  autoHideDuration={3000}
                  onClose={handleClose}
                >
                  <Alert onClose={handleClose} severity="success">
                    Updated!
                  </Alert>
                </Snackbar>
                            </Form>)}
                    </Formik>
                </Paper>
            </Grid>
        </div>
      //   :<div>
      //   { <Collapse in={open}>
      //   <Alert severity="warning"
      //     action={
      //       <IconButton
      //         aria-label="close"
      //         color="inherit"
      //         size="small"
      //         onClick={() => {
      //           setOpen(false);
      //           history.goBack()  
      //         }}
      //       >
      //         <CloseIcon fontSize="inherit" />
      //       </IconButton>
      //     }
      //   >
      //   Only Authorized to Admin!!
      //   </Alert>
      // </Collapse>
        
        
        
      //   }



      //   {}
      //   </div>
           
    )
}
const mapStateToProps=(state)=>{
    return{
      login:state.login,
      role:state.role
    }
    }
export default withRouter(connect(mapStateToProps,null)(UpdatePlace));