
import axios from "axios";
import {store} from "./index"
import * as actionType from './store/action';

const setupProfile=(setLoading)=>{
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    axios
      .get("http://localhost:4000/profile", config)
      .then((response) => {
          
         store.dispatch({
             type:actionType.LOGIN,
            role: response.data.role,
            name: response.data.name,
            email: response.data.email,
             phoneNumber:response.data.phoneNumber,
             userid:response.data._id
         }) 
         setLoading(false)
      })
      .catch((e) => {
        setLoading(false)
        console.log("error", e);
        
      });
}


export default setupProfile;