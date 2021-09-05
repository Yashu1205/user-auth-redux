import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import NotesList from './NotesList'
import AddNote from './AddNote'

const NotesContainer = (props) => {
    const { notes } = useSelector((state) => {
        return state.notes
    })

    useEffect(() => {
        if(!localStorage.getItem('token')){
            props.history.push('/login')
        }
    }, [])

    return (
        <div>
            
            <div className="row">
                <div className="col-md-7"> 
                    <h4>My Notes -  {notes.length}</h4>
                    <NotesList /> 
                </div>
                <div className="col-md-5" style={{marginTop: '35px'}}> 
                    <AddNote /> 
                </div>             
            </div>
            
        </div>
    )
}

export default NotesContainer