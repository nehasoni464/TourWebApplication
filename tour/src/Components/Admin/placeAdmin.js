import React,{useState} from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import {useHistory} from "react-router-dom"
import { FormHelperText } from '@material-ui/core';
import {connect} from 'react-redux'
import {SHOW} from '../../store/action'
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

const CreatePlace = (props) => {
    const history =useHistory()
    const paperStyle = { padding: '30px 20px', width: 300, margin: '20px auto' }
    const avatarStyle = { backgroundColor: "#3f51b5", marginTop:"0.5rem" }
    const marginTop = { marginTop: 10 }
    const buttonStyle={marginTop:25,marginBottom:"2rem", marginLeft:'2rem', alignContent:'justify'}
    const [field, setField] = useState("")
    
    const initialValues = {
        title: "",
        description: "",
        season: [],
        packages:[],
        avatar:null

    }
    const showHandler=()=>{
       props.setShow()
    }
    
    const onSubmit = (values) => {
        console.log("valuee",field)
        const data = new FormData();
       try{ 
data.append("avatar", field);
data.append("title", values.title);
data.append("description", values.description);
data.append("season", values.season);}
catch(e){
    console.log(e)
}
        axios.post('http://localhost:4000/place',data).then(
        (response)=>console.log("done",response)    
        ).catch((e)=>console.log("error",e))
        props.setShow()
   history.goBack()    
 }
    
    const validationSchema = Yup.object().shape({
        title:Yup.string().required("Required"),
        description:Yup.string().max(350).required("Required"),
        season:Yup.array().min(1).required("Required"),
        //avatar: Yup.mixed().required(),
           })

    return (
        (props.login&& props.role==="Admin" )? 
  

                // <Paper elevation={20} style={paperStyle}>
                <Grid style={{margin:"dense",marginLeft:"1rem",marginRight:"1rem"}}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}>
                            <AddIcon />
                        </Avatar>
                        <h2>CreatePlace</h2>
                        <Typography variant='caption'>Add details to create Place</Typography>
                    </Grid>
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                        {(props) => (
                            <Form>
                                <Field as={TextField} variant ="outlined" fullWidth label='Title' name="title" helperText={<ErrorMessage name="title"/>} placeholder="Enter Name of the Place" />
                                <Field as={TextField} variant="outlined" fullWidth label='Description' helperText={<ErrorMessage name="description" />} name="description" placeholder="Enter Description" />
                               <div style={marginTop}id="checkbox-group">Choose Season</div>
                            <div role="group"   aria-labelledby="checkbox-group" >
            <label style={{marginRight:"0.5rem"}}><Field style={marginTop}  type="checkbox" name="season" value="summer" />
              Summer
            </label>
            <label style={{marginRight:"0.5rem"}}><Field type="checkbox" name="season" value="winter"  />
              Winter
            </label>
            <label>
              <Field type="checkbox" name="season" value="monsoon" />
              Monsoon
            </label>
            <FormHelperText>
               <ErrorMessage component="div" className="input-error" name="season" />
               </FormHelperText>
            
          </div> 
          <div className="form-group" style={marginTop}>
                  <label style={{marginRight:"0.5rem"}} for="file">File upload</label>
                  <input id="file" style={marginTop} name="avatar" type="file" onChange={(event) => {
                    setField( event.currentTarget.files[0]);
                  }} className="form-control" />
                  
                </div> 
                <Grid align="center">      
          <Button style={buttonStyle} onClick={()=>{ showHandler() } } variant='contained' color="primary">Cancel</Button>
        <Button type='submit'  style={buttonStyle} variant='contained' color="primary">Submit</Button>
        </Grid> 
                           
                            </Form>)}
                    </Formik>
                {/* </Paper> */}
                </Grid>

        :<div>
        {alert("Only Authorized to Admin") }
        {history.goBack()}
        </div>
           
    )
}
const mapStateToProps=(state)=>{
    return{
      login:state.login,
      role:state.role,
      show:state.show
    }
    }


  const mapDispatchToProps=(dispatch)=>{
      return{
          setShow:()=>{
              dispatch({type:SHOW})
          }
      }

  }  
export default connect(mapStateToProps,mapDispatchToProps)(CreatePlace);
