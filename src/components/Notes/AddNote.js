import { useDispatch } from 'react-redux'
import { startAddNote } from '../../actions/noteActions'
import NoteForm from './NoteForm'

const AddNote = () => {
    const dispatch = useDispatch()
    const formSubmission = (formData, resetForm) => {
        dispatch(startAddNote(formData, resetForm))
    } 

    return (
            <NoteForm formSubmission={formSubmission} />
    )
}

export default AddNote