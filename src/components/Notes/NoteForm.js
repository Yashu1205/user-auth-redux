import { useState } from 'react'

const NoteForm = (props) => {
    const { title: noteTitle, body: noteBody, toggle, handleToggle, formSubmission } = props
    const [ title, setTitle ] = useState(noteTitle || '')
    const [ body, setBody ] = useState(noteBody || '')
    const [formError, setFormError] = useState({})

    const handleChange = (e) => {
        const inputName = e.target.name
        if(inputName === 'title'){
            setTitle(e.target.value)
            if(formError.title){
                setFormError({})
            }
        } else if(inputName === 'body'){
            setBody(e.target.value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            title: title,
            body: body
        }

        if(title.trim().length === 0){
            setFormError({title: 'Title cannot be blank'})
        }
        else{
            setFormError({})
            const resetForm = () => {
                setTitle('')
                setBody('')
            }
            formSubmission(formData, resetForm)        
        }
    }

    const cancelEdit = () => {
        handleToggle()
    }


    return (
        <div className="card">
            <div className="card-body">
            <h2>{toggle ? 'Update' : 'Add'} Note</h2>

                <form onSubmit={handleSubmit}>

                    <input type="text" className="form-control"
                        name="title" 
                        value={title} 
                        onChange={handleChange}
                        placeholder="Enter title"
                    />
                    { formError.title && <span className="text-danger"> {formError.title}<br/> </span> }
                    <br/>

                    <textarea name="body" className="form-control"
                            value={body}
                            onChange={handleChange}
                            placeholder="Enter body">
                    </textarea> <br/>

                    <input type="submit" className="btn btn-primary btn-sm" value={toggle ? 'update' : 'save'} />
                    
                    { toggle && <button className="btn btn-secondary btn-sm" style={{marginLeft: '5px'}}
                                        onClick={cancelEdit}>Cancel</button> }
                </form>
            </div>
        </div>
    )
}

export default NoteForm