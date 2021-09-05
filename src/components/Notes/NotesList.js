
import { useSelector } from 'react-redux'
import NoteItem from './NoteItem' 

const NotesList = (props) => {
    const { notes } = useSelector((state) => {
        return state.notes
    })
    
    return (
        <div>
            {
                notes.length === 0 ? (
                    <h5>No notes found.</h5>
                ) : (                    
                        notes.map(note => {
                            return (
                                <NoteItem key={note._id} 
                                           {...note} />
                            )
                        })                                        
                )
            }
        </div>
    )
}

export default NotesList