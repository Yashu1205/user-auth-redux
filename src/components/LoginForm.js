import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLoginUser ,removeErrors } from '../actions/userActions'

const LoginForm = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formErrors, setFormErrors] = useState({})
    const errors = {}

    const dispatch = useDispatch()

    const { serverErrors } = useSelector((state) => {
        return state.user
    })
    
    const resetForm = () =>{
        setEmail('')
        setPassword('')
        dispatch(removeErrors())
    }

    const handleChange = (e) => {
        const inputName = e.target.name
        if(inputName === 'email'){
            setEmail(e.target.value)
            if(formErrors.email){
                setFormErrors({...formErrors, email: ''})
            }
        } 
        else if(inputName === 'password'){
            setPassword(e.target.value)
            if( formErrors.password){
                setFormErrors({...formErrors, password: ''})
            }
        }
    }

    const runValidations = () => {
        if(email.trim().length === 0){
            errors.email = 'email cannot be blank'
        }
        if(password.length === 0){
            errors.password = 'password cannot be blank'
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        runValidations() 
        const redirectToHome = () => {
            props.history.push('/')
        }

        if(Object.keys(errors).length > 0){
            setFormErrors(errors)
        }
        else{
            setFormErrors({})
            const loginData = {
                email: email,
                password: password
            }
            dispatch(startLoginUser(loginData, resetForm, redirectToHome))
        }        
    }

    const handleCancel = (e) => {
        e.preventDefault()
        resetForm()
        setFormErrors({})
    }   

    return (
        <div className="col-md-6">           
        <h3>Login To Your Account</h3>

        <form className="form-group" onSubmit={handleSubmit}>
            <input type="text" className="form-control" 
                   name="email" 
                   value={email} 
                   onChange={handleChange} 
                   placeholder="Enter email" />
            { formErrors.email && <span className="text-danger"> { formErrors.email } <br/></span> }<br/>    

            <input type="password" className="form-control" 
                   name="password" 
                   value={password} 
                   onChange={handleChange} 
                   placeholder="Enter password" />
            { formErrors.password && <span className="text-danger"> { formErrors.password } <br/> </span> }

            { serverErrors.errors && <span className="text-danger"> { serverErrors.errors} <br/></span>}<br/>

            <input type="submit" className="btn btn-success btn-sm" value="Login" />
            <button className="mx-2 btn btn-secondary btn-sm" onClick={handleCancel} style={{marginLeft: '10px'}}>Cancel</button>
        </form>
        

    </div>  
    )
}

export default LoginForm