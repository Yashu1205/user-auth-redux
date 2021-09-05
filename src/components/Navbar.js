import { useEffect } from "react"
import { NavLink, Route, withRouter } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux" 

import Home from "./Home"
import LoginForm from "./LoginForm"
import RegistrationForm from "./RegistrationForm"
import UserAccount from "./UserAccount"
import NotesContainer from "./Notes/NotesContainer"

import { logout, startUserDetail } from "../actions/userActions"
import { startUserNotes } from "../actions/noteActions"

const Navbar = (props) => {
    const token = localStorage.getItem('token')
    const { isLogin } = useSelector((state) => {
        return state.user
    })
    const dispatch = useDispatch()
    
    useEffect(() => {
        if(token){
            dispatch(startUserDetail())
            dispatch(startUserNotes())            
        }
    },[isLogin])

    const handleLogout = () => {
        localStorage.removeItem('token')
        dispatch(logout())
        props.history.push('/')
    }

    return (
        <div >
            <nav className="navbar navbar-expand-lg mb-4">
                <ul className="nav nav-pills mr-auto">
                    <li>
                        <NavLink exact to="/" activeClassName="active">
                            Home
                        </NavLink>
                    </li>

                    {
                        token ? (
                            <>
                                <li >
                                    <NavLink to="/account"  activeClassName="active">
                                        Account
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/mynotes" activeClassName="active">
                                        My Notes
                                    </NavLink>
                                </li>

                                <li onClick={handleLogout} style={{cursor: 'pointer'}}>
                                    <a>  Logout  </a>
                                </li>
                            </>
                            ) : (
                                <>
                                    <li>
                                        <NavLink to="/register" activeClassName="active">
                                            Register
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink to="/login" activeClassName="active">
                                            Login
                                        </NavLink>
                                    </li>                           
                                </>
                            )
                        }                    
                </ul>
            </nav>     

            <Route path="/" component={Home} exact={true} />
            <Route path="/register" component={RegistrationForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/account" component={UserAccount} />
            <Route path="/mynotes" component={NotesContainer} />
        </div>
    )
}

export default withRouter(Navbar)