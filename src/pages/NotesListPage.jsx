import React, { useEffect, useState } from 'react'
import SingleNote from '../components/SigleNote'
import AddButton from '../components/AddButton'

const NotesListPage = () => {

    let [notes, setNotes] = useState([])

    useEffect(() => {

        getNotes();

    }, [])

    const apiUrl = 'https://hritik7465.pythonanywhere.com'

    let getNotes = async () => {
        let response = await fetch(`${apiUrl}/notes/`)
        let data = await response.json()
        // console.log(data)
        setNotes(data)
    }


    return (
        <div className="notes">
            <div className="notes-header">
                <h2 className="notes-title">&#9782; Notes</h2>
                <p className="notes-count">{notes.length}</p>
            </div>

            <div className="notes-list">
                {notes.map((note, index) => (
                    <SingleNote key={index} note={note} />
                ))}
            </div>
            <AddButton />
        </div>
    )
}

export default NotesListPage