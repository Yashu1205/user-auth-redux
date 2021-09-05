import { useDispatch } from 'react-redux'
import { startEditNote } from '../../actions/noteActions'
import NoteForm from './NoteForm'


const EditNote = (props) => {
    const {id, title, body, toggle, handleToggle} = props
    const dispatch = useDispatch()

    const formSubmission = (formData) => {
        dispatch(startEditNote(id, formData, handleToggle))
    } 

    return (
            <NoteForm id={id} title={title} body={body} 
                      toggle={toggle} 
                      handleToggle={handleToggle} 
                      formSubmission={formSubmission} />
    )
}

export default EditNote  