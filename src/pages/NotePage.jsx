import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

const NotePage = () => {

    let [note, setNote] = useState()
    let { id } = useParams()
    let navigate = useNavigate();

    useEffect(() => {
        getNote()
    }, [id])

    const getNote = async () => {
        if (id === 'new'){
            return
        }
        let response = await fetch(`/notes/${id}/`)
        let data = await response.json()
        // console.log(data)
        setNote(data)
    }
    // console.log(note);

    let createNote = async () => {
        fetch('/notes/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note)
        })
    }

    let updateNote = async () => {
        fetch(`/notes/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note)
        })
    }

    let deleteNote = async () => {
        fetch(`/notes/${id}/`, {
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
        navigate('/')
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






