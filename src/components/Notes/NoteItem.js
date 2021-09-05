import { useState } from 'react'
import { useDispatch } from 'react-redux' 
import { startShowNote, startDeleteNote } from '../../actions/noteActions'
import EditNote from './EditNote'
import Swal from 'sweetalert2'

const NoteItem = (props) => {
    const [ toggle, setToggle ] = useState(false)
    const { _id, title, body } = props
    const dispatch = useDispatch()

    const showNote = () => {
        dispatch(startShowNote(_id))
    }

    const deleteNote = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        })
       .then((result) => {
            if (result.isConfirmed) {
                dispatch(startDeleteNote(_id))
            }
       })
    }

    const handleToggle = () => {
        setToggle(!toggle)
    }

    return (
        <div className="card mb-2" key={_id}>
        <div className="card-body">
            {!toggle && 
                <>
                    <span style={{cursor: 'pointer'}} onClick={showNote}> { title} </span>

                    <div className="mt-2" style={{float:'right'}}>
                        <button className="btn btn-primary btn-sm"
                                style={{marginRight:'5px'}}
                                onClick={handleToggle}>
                            Edit </button>

                        <button className="btn btn-danger btn-sm" 
                                onClick={deleteNote}>
                            Delete </button>
                    </div>
                </>
            }

            { toggle && <EditNote id={_id} title={title} body={body} 
                                  toggle={toggle}
                                  handleToggle={handleToggle}/> }
            
        </div>
    </div>
    )
}

export default NoteItem