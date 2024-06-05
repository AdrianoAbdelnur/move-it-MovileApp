
const AuthReducer = (state={}, action) => {
    switch (action.type) {
       case 'LOGIN':
           return {
               ...state,
               user: action.payload.user,
               isLogged: true,
               token: action.payload.token,
               message: action.payload.message,
               isLoading: false
           }
       case 'LOGOUT':
           return {
               ...state,
               user: null,
               isLogged: false,
               token: "",
               message: action.payload.message,
               isLoading: false
           }
           case 'LOADING' :
            return {
                ...state,
                isLoading: action.payload.isLoading
            }
   
       default:
           return state;
   }
   }
   
   export default AuthReducer