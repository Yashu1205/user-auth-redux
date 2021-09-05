import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const UserAccount = (props) => {
    const { userDetail } = useSelector((state) => {
        return state.user
    })

    useEffect(() => {
        if(!localStorage.getItem('token')){
            props.history.push('/login')
        }
    }, [])
    
    return (
        <div className="card" style={{width: '50%'}}>
            <div className="card-body">
            {   Object.keys(userDetail).length > 0 && 
                <table className="table table-borderless ">
                    <thead></thead>
                    <tbody>
                        <tr>
                            <td>username</td>
                            <td>{ userDetail.username}</td>
                        </tr>
                        <tr>
                            <td>email</td>
                            <td>{ userDetail.email}</td>
                        </tr>
                        <tr>
                            <td>join date</td>
                            <td>{ userDetail.createdAt.substr(0,10)}</td>
                        </tr>
                    </tbody>
                </table>
            }
            </div>
            
        </div>
    )
}

export default UserAccount