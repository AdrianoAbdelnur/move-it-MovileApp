import { TYPES } from "../actions/AuthActions"

const AuthReducer = (state={}, action) => {
    switch (action.type) {
       case TYPES.LOGIN:
           return {
               ...state,
               user: action.payload.user,
               isLogged: true,
               token: action.payload.token,
               message: action.payload.message,
               isLoading: false
           }
       case TYPES.LOGOUT:
           return {
               ...state,
               user: null,
               isLogged: false,
               token: "",
               message: action.payload,
               isLoading: false
           }
           case TYPES.LOADING :
            return {
                ...state,
                isLoading: action.payload.isLoading
            }
           case TYPES.UPDATE :    
            return {
                ...state,
                user: {
                    ...state.user,
                    transportInfo:  action.payload.transportInfoStatus.transportInfo,
                    infoCompletedFlag: action.payload.transportInfoStatus.infoCompletedFlag
                },
                isLoading: false
            }
           case TYPES.CHANGESTATUS :    
            return {
                ...state,
                user: {
                    ...state.user, 
                    transportInfo: {...state.user.transportInfo, ...action.payload}
                },
                isLoading: false
            }
           case TYPES.ADDCANCELATION : 
            return {
                ...state,
                user: {
                    ...state.user, 
                    accountSuspended: action.payload.suspension? [action.payload.suspension, ... (state.user.accountSuspended||[])] : state.user.accountSuspended
                },
                isLoading: false
            }
            case TYPES.UPDATEMESSAGE :
            return {
                ...state,
                message: action.payload.message
            }
   
       default:
           return state;
   }
   }
   
   export default AuthReducer