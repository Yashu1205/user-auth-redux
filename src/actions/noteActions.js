import axios from 'axios'
import Swal from 'sweetalert2'

export const SET_USER_NOTES = 'SET_USER_NOTES' 
export const ADD_NOTE = 'ADD_NOTE'
export const DELETE_NOTE = 'DELETE_NOTE' 
export const EDIT_NOTE = 'EDIT_NOTE'
export const CLEAR_NOTES = 'CLEAR_NOTES'

export const startUserNotes = () => {

    return (dispatch) => {
            axios.get("http://dct-user-auth.herokuapp.com/api/notes", {
                    headers : {
                        'x-auth' : localStorage.getItem('token')
                    }
                })
                .then((response) => {
                    const result = response.data                    
                    console.log(result)
                    dispatch(setUserNotes(result.reverse()))
                })
                .catch((error) => {
                    Swal.fire('Oops..', error.message, 'error')
                })
    }
} 

const setUserNotes = (notes) => {
    return {
        type: SET_USER_NOTES,
        payload: notes
    }
}

export const startAddNote = (formData, resetForm) => {
    
    return (dispatch) => {
        axios.post('http://dct-user-auth.herokuapp.com/api/notes', formData, {
                    headers: {
                        'x-auth' : localStorage.getItem('token') 
                    }
                })
                .then((response) => {
                    const result = response.data
                    dispatch(setAddNote(result))
                    resetForm()
                    Swal.fire('Success', 'Note added successfully', 'success')
                })
                .catch((error) => {
                    Swal.fire('Oops...', error.message, 'error')
                })
    }
} 

const setAddNote = (result) => {
    return {
        type: ADD_NOTE,
        payload: result
    }
}

export const startShowNote = (noteId) => {

    return (dispatch) => {
        axios.get(`http://dct-user-auth.herokuapp.com/api/notes/${noteId}`,
            {
                headers: {
                    'x-auth' : localStorage.getItem('token')
                }
            }
        )
        .then((response) => {
            const result = response.data
            if(result.hasOwnProperty('errors')){
                Swal.fire('',result.errors,'error')
            }
            else{
                Swal.fire({
                    title: `<h3>${result.title}</h3>`,
                    text: result.body
                  })
            }
        })
        .catch((error) => {
            Swal.fire('Oops..',error.message,'error')
        })
    }
}

export const startDeleteNote = (noteId) => {

    return (dispatch) => {
            axios.delete(`http://dct-user-auth.herokuapp.com/api/notes/${noteId}`, {
                    headers : {
                        'x-auth': localStorage.getItem('token') 
                    }
                 })
                .then((response) => {
                    Swal.fire('Success', 'Note deleted successfully', 'success')
                    dispatch(setDeleteNote(noteId))
                }) 
                .catch((error) => {
                    Swal.fire('Oops...', error.message, 'error')
                })
    }

}

const setDeleteNote = (noteId) => {
    return {
        type: DELETE_NOTE,
        payload: noteId
    }
}

export const startEditNote = (noteId, formData, handleToggle) => {

    return (dispatch) => {
        axios.put(`http://dct-user-auth.herokuapp.com/api/notes/${noteId}`, formData, {
                    headers : {
                        'x-auth': localStorage.getItem('token') 
                    }
                 })
                .then((response) => {
                    Swal.fire('Success', 'Note updated successfully', 'success')
                    dispatch(setEditNote(response.data))
                    handleToggle()
                }) 
                .catch((error) => {
                    Swal.fire('Oops...', error.message, 'error')
                })
    }
}

const setEditNote = (updatedData) => {
    return {
        type: EDIT_NOTE,
        payload: updatedData
    }
}

export const clearNotes = () => {
    return {
        type: CLEAR_NOTES
    }
}