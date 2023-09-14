import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

const NotePage = () => {

    let [note, setNote] = useState()
    let { id } = useParams()
    let navigate = useNavigate();

    useEffect(() => {
        console.log('hello get note');
        getNote()
    }, [id])

    const apiUrl = 'https://hritik7465.pythonanywhere.com'
    const getNote = async () => {
        if (id === 'new'){
            return
        }
        let response = await fetch(`${apiUrl}/notes/${id}/`)
        let data = await response.json()
        // console.log(data)
        setNote(data)
    }
    // console.log(note);

    let createNote = async () => {
        await fetch(`${apiUrl}/notes/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note)
        })
        navigate('/')
    }

    let updateNote = async () => {
        await fetch(`${apiUrl}/notes/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note)
        })
        navigate('/')
    }

    let deleteNote = async () => {
        await fetch(`${apiUrl}/notes/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        navigate('/')
    }

    let handleChange = (value) => {
        // console.log(note)
        setNote(note => ({...note, 'body': value}))
    }

    let handleSubmit = () => {
        if (id !== 'new' && note.body === '') {
            deleteNote()
        } else if (id !== 'new') {
            updateNote()
        } else if (id === 'new' && note && note.body !== '') {
            createNote()
        }
        // window.location.reload();
    }


    return (
        <div className="note" >
            <div className="note-header">
                <h3 onClick={handleSubmit}>
                    <ArrowLeft />
                </h3>
                {
                    id === 'new'
                        ? <button onClick={handleSubmit}>Done</button>
                        : <button onClick={deleteNote}>Delete</button>
                }
            </div>
            <textarea value={note?.body} onChange={(e) => handleChange(e.target.value)}></textarea>
        </div>
    )
}

export default NotePage






