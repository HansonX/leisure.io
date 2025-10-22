import React, { useEffect, useState } from 'react'
import Timer from './components/timer'
import AudioPlayer from './components/audioPlayer'
import NotesPanel from './components/notesPanel'
import BackgroundVideo from './components/background'
import Modal from './components/modal'
import MenuBar from './components/menuBar'
import './index.css'


const VIDEO_OPTIONS = [
{ id: 'cafe', label: 'Cafe', src: '/videos/cafe.mp4' }
]


export default function App() {
// pop-up visibility
const [show, setShow] = useState({ timer: false, notes: false, music: false, backgrounds: false })
const toggle = (k) => setShow((s) => ({ ...s, [k]: !s[k] }))


// background selection
const [bg, setBg] = useState(() => localStorage.getItem('leisure_bg') || VIDEO_OPTIONS[0].src)
useEffect(() => { localStorage.setItem('leisure_bg', bg) }, [bg])


return (
<main className="app">
<BackgroundVideo src={bg} />


<h1 className="title">leisure.io</h1>


<MenuBar
onOpenTimer={() => toggle('timer')}
onOpenNotes={() => toggle('notes')}
onOpenMusic={() => toggle('music')}
onOpenBackgrounds={() => toggle('backgrounds')}
/>


{/* Pop-ups */}
<Modal title="Pomodoro" open={show.timer} onClose={() => toggle('timer')}>
<Timer />
</Modal>


<Modal title="Notes" open={show.notes} onClose={() => toggle('notes')}>
<NotesPanel />
</Modal>


<Modal title="Music / White Noise" open={show.music} onClose={() => toggle('music')}>
<AudioPlayer />
</Modal>


<Modal title="Choose Background" open={show.backgrounds} onClose={() => toggle('backgrounds')}>
<div className="video-grid">
{VIDEO_OPTIONS.map(v => (
<button key={v.id} className={`thumb ${bg===v.src ? 'selected' : ''}`} onClick={() => setBg(v.src)}>
<video src={v.src} muted playsInline preload="metadata" />
<span>{v.label}</span>
</button>
))}
</div>
</Modal>

</main>
)
}