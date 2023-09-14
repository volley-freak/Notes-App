import React from 'react'
import { Link } from 'react-router-dom'

const SigleNote = ({ note }) => {

    let getTitle = (note) => {
        let title = note.body.split('\n')[0].slice(0, 45)
        return title
    }

    let getTime = (note) => {
        return new Date(note.updated).toLocaleDateString()
    }

    let getContent = (note) =>{
        let title = getTitle(note)
        let content = note.body.replaceAll('\n', ' ')
        content = content.replaceAll(title, '')
        if(content.length > 45){
            return content.slice(0, 45) + '...'
        }
        return content
    }

    return (
        <Link to={`/notes/${note.id}`}>
            <div className='notes-list-item'>
                <h3>{getTitle(note)}</h3>
                <p><span>{getTime(note)}</span>{getContent(note)}</p>
            </div>
        </Link>

    )
}

export default SigleNote