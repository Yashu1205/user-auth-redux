import { SET_USER_NOTES, ADD_NOTE, DELETE_NOTE, EDIT_NOTE } from '../actions/noteActions'
import { CLEAR_NOTES } from '../actions/noteActions'

const initialNotes = { notes: []}

const notesReducer = (state = initialNotes, action) => {
    switch(action.type){
        case SET_USER_NOTES: {
            return {...state, notes: action.payload}
        }

        case ADD_NOTE: {
            const newNotes = [action.payload,...state.notes ]
            return {...state, notes: newNotes}
        }

        case DELETE_NOTE: {
            const newNotes = state.notes.filter(note => note._id !== action.payload)
            return {...state, notes: newNotes}
        }

        case EDIT_NOTE: {
            const newNotes = state.notes.map(note => {
                if(note._id === action.payload._id){
                    return {...note, title: action.payload.title, body: action.payload.body}
                }
                else{
                    return {...note}
                }
            })
            return {...state, notes: newNotes}
        }

        case CLEAR_NOTES: {
            return {...state, notes: []}
        }
        default:{
            return {...state}
        }
    }
}

export default notesReducer