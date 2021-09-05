import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { startRegisterUser, removeErrors } from "../actions/userActions"

const RegistrationForm = (props) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formErrors, setFormErrors] = useState('')
    const errors = {}

    const { serverErrors } = useSelector((state) => {
        return state.user
    })

    const dispatch = useDispatch()

    const resetForm = () =>{
        setUsername('')
        setEmail('')
        setPassword('')
        dispatch(removeErrors())
    }

    const handleChange = (e) => {
        const inputName = e.target.name

        if(inputName === 'username'){
            setUsername(e.target.value)
            if(formErrors.username){
                setFormErrors({...formErrors, username: ''})
            }
        } else if(inputName === 'email'){
            setEmail(e.target.value)
            if(formErrors.email){
                setFormErrors({...formErrors, email: ''})
            }
        } else if(inputName === 'password'){
            setPassword(e.target.value)
            if(formErrors.password){
                setFormErrors({...formErrors, password: ''})
            }
        }
    }

    const runValidations = () => {
        if(username.trim().length === 0){
            errors.username = 'username cannot be blank '
        }
        if(email.trim().length === 0){
            errors.email = 'email cannot be blank'
        }
        if(password.length === 0){
            errors.password = 'password cannot be blank'
        }
        else if(password.length < 8){
            errors.password = 'password should be at least 8 characters'
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        runValidations()

        if(Object.keys(errors).length > 0){
            setFormErrors(errors)
        }
        else{
            setFormErrors({})
            const formData = {
                username: username,
                email: email,
                password: password
            }
    
            const redirectToLogin = () => {
                props.history.push('/login')
            }
            dispatch(startRegisterUser(formData, resetForm, redirectToLogin))
        }
    }

    const cancelRegister = (e) => {
        e.preventDefault()
        resetForm()
        setFormErrors({})
    }

    return (
        // <div>
        //     <h3>Register With Us</h3>

        //     <form onSubmit={handleSubmit}>

        //         <input type="text" name="username" value={username} onChange={handleChange} placeholder="Enter username"/><br/>
        //         {serverErrors.username && <span className="text-danger"> {serverErrors.username.message}</span>}<br/>
                
        //         <input type="text" name="email" value={email} onChange={handleChange} placeholder="Enter email" /><br/>
        //         {serverErrors.email && <span className="text-danger"> {serverErrors.email.message}</span>}<br/>

        //         <input type="password" name="password" value={password} onChange={handleChange} placeholder="Enter password" /><br/><br/>

        //         <input type="submit" value="Register" />
        //         <input type="button" value="Cancel" onClick={handleCancel} />
        //     </form>
        // </div>
        <div className="col-md-6">
            <h3>Register With Us</h3>

            <form className="form-group" onSubmit={handleSubmit}>

                <input type="text" className="form-control"
                       name="username" 
                       value={username} 
                       onChange={handleChange} 
                       placeholder="Enter username" />
                { formErrors.username && 
                    <span className="text-danger"> { formErrors.username}<br/> </span> }
                { serverErrors.username && 
                    <span className="text-danger"> { serverErrors.username.message } <br/> </span>}<br/>
                
                <input type="text"  className="form-control"
                       name="email" 
                       value={email} 
                       onChange={handleChange} 
                       placeholder="Enter email" />
                { formErrors.email && 
                    <span className="text-danger"> { formErrors.email} <br/></span> }
                { serverErrors.email && 
                    <span className="text-danger"> { serverErrors.email.message } <br/></span>}<br/>

                <input type="password" className="form-control"
                       name="password" 
                       value={password} 
                       onChange={handleChange} 
                       placeholder="Enter password" />
                { formErrors.password && 
                    <span className="text-danger"> { formErrors.password} <br/></span> }
                { serverErrors.password && <span className="text-danger"> 
                                          { serverErrors.password.message } <br/></span>}<br/>

                <input type="submit" className="btn btn-success btn-sm" value="Register" />
                <button className="mx-2 btn btn-secondary btn-sm" onClick={cancelRegister}>Cancel</button>
            </form>
        </div> 
    )
}

export default RegistrationForm 