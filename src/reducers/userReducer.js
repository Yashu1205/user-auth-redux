import { SET_ERRORS, REMOVE_ERRORS, IS_LOGIN, USER_DETAIL, LOGOUT } from "../actions/userActions"

const userData  = {
                    isLogin : localStorage.getItem('token') ? true : false, 
                    serverErrors: {},
                    userDetail: {}
                }

const userReducer = (state = userData, action) => {

    switch(action.type){
        case SET_ERRORS: {
            return {...state, serverErrors : action.payload}
        } 

        case REMOVE_ERRORS: {
            return {...state, serverErrors : {}}
        }

        case IS_LOGIN: {
            return {...state, isLogin: true}
        }

        case USER_DETAIL: {
            return {...state, userDetail: action.payload}
        }

        case LOGOUT: {
            return {...state, isLogin: false, userDetail: {}}
        }
        default : {
            return {...userData}
        }
    }
}

export default userReducer