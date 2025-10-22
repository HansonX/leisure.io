import React from 'react'


export default function Modal({ title, open, onClose, children }) {
if (!open) return null
return (
<div className="modal-overlay" onClick={onClose}>
<div className="modal" onClick={(e)=>e.stopPropagation()}>
<div className="modal-header">
<span>{title}</span>
<button className="modal-close" onClick={onClose}>Close</button>
</div>
<div className="modal-body">{children}</div>
</div>
</div>
)
}