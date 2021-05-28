import * as actionType from './action';
const initialState={
    login:false,
    name:"",
    email:"",
    phoneNumber:"",
    count:0,
    show:false,
    addAdmin:false,
    role:"Guest",
    packageShow:false,
    userid:""
}

const reducer=(state=initialState,action)=>{
    switch (action.type){
        case actionType.LOGIN:
            return{
                ...state,
               login:true,
                role:action.role,
                name:action.name,
                email:action.email,
                phoneNumber:action.phoneNumber,
                userid:action.userid
          }
            case actionType.LOGOUT:
            return{
                ...initialState,
                

            }

            case actionType.COUNT:
                return{
                  ...state,
                  count:action.count
                }
            case actionType.SHOW:{
                return{
                    ...state,
                    show:!state.show
                }
            }
            case actionType.ADMIN:{
                return{
                    ...state,
                    addAdmin:!state.addAdmin
                }
            }
            case actionType.PACKAGESHOW:{
                return{
                    ...state,
                   packageShow:!state.packageShow
                }
            }
            default:{
                return{
                    ...state
                }
            }
            
    }
}

export default reducer
