import React from 'react'


export default function MenuBar({ onOpenTimer, onOpenNotes, onOpenMusic, onOpenBackgrounds }) {
return (
<div className="menu-bar">
<button onClick={onOpenTimer}>⏱️ Pomodoro</button>
<button onClick={onOpenNotes}>📝 Notes</button>
<button onClick={onOpenMusic}>🎵 Music / Noise</button>
<button onClick={onOpenBackgrounds}>🎬 Backgrounds</button>
</div>
)}