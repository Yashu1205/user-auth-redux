import axios from 'axios'
import Swal from "sweetalert2"

export const IS_LOGIN = 'IS_LOGIN' 
export const SET_ERRORS = 'SET_ERRORS' 
export const REMOVE_ERRORS = 'REMOVE_ERRORS'
export const USER_DETAIL = 'USER_DETAIL' 
export const LOGOUT = 'LOGOUT' 

export const startRegisterUser = (formData, resetForm, redirectToLogin) => {

    return (dispatch) => {
                axios.post("http://dct-user-auth.herokuapp.com/users/register", formData)
                     .then((response) => {
                         const result = response.data

                         if(result.hasOwnProperty('errors')){
                             dispatch(setErrors(result.errors))
                         }
                         else{
                             resetForm()
                             Swal.fire('Success', 'Registered successfully', 'success')
                             redirectToLogin()
                         }
                     })
                     .catch((error) => {
                         Swal.fire('Oops...', error.message, 'error')
                     })
    }
}

export const startLoginUser = (loginData, resetForm, redirectToHome) => {

    return (dispatch) => {
        axios.post("http://dct-user-auth.herokuapp.com/users/login", loginData)
            .then((response) => {
                const result = response.data

                if(result.hasOwnProperty('errors')){
                    dispatch(setErrors(result))
                }
                else{
                    localStorage.setItem('token', response.data.token)
                    dispatch(isLogin())               
                    resetForm()
                    Swal.fire('Success', 'Logged in Successfully','success')
                    redirectToHome()
                }
            })
            .catch((error) => {
                Swal.fire('Oops..', error.message, 'error')
            })
    }
}

export const startUserDetail = () => {
    return (dispatch) => {
        axios.get("http://dct-user-auth.herokuapp.com/users/account",{
            headers: {
                        "x-auth" : localStorage.getItem('token') 
                    }
             })
             .then((response) => {
                 const result = response.data
                 dispatch(setUserDetail(result))
             })
             .catch((error) => {
                Swal.fire('Oops..', error.message, 'error')

             })
    }
}

const isLogin = () => {
    return {
        type: IS_LOGIN
    }
}

const setErrors = (errors) => {
    return {
        type: SET_ERRORS,
        payload: errors
    }
}

export const removeErrors = () => {
    return {
        type: REMOVE_ERRORS
    }
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}

const setUserDetail = (detail) => {
    return {
        type: USER_DETAIL,
        payload: detail
    }
}