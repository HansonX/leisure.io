import React, { useEffect, useState } from 'react'
import { useNotesStore } from '../stores/notesStore'
import { nanoid } from 'nanoid'


export default function NotesPanel() {
const { notes, load, upsert, remove } = useNotesStore()
const [draft, setDraft] = useState('')


useEffect(() => { load() }, [load])


const add = async () => {
if (!draft.trim()) return
const now = Date.now()
await upsert({ id: nanoid(), title: draft.split('\n')[0] || 'Untitled', content: draft, updatedAt: now })
setDraft('')
}


return (
<div className="card wide">
<div className="card-header">Notes</div>
<textarea value={draft} onChange={(e)=>setDraft(e.target.value)} placeholder="Quick note…" className="notes-input" />
<div className="row">
<button onClick={add}>Add</button>
</div>
<ul className="notes-list">
{notes.map(n => (
<li key={n.id} className="note-item">
<div>
<div className="note-title">{n.title}</div>
<div className="note-content">{n.content}</div>
</div>
<button className="danger" onClick={()=>remove(n.id)}>Delete</button>
</li>
))}
</ul>
</div>
)
}