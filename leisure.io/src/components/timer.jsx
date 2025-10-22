import React, { useEffect, useState } from 'react'
import { useTimerStore } from '../stores/timerStore'


function msToMinSec(ms) {
const total = Math.ceil(ms / 1000)
const m = Math.floor(total / 60)
const s = total % 60
return `${m}:${String(s).padStart(2, '0')}`
}


export default function Timer() {
const { mode, running, start, stop, remainingMs, setMode, lengths, setLengths } = useTimerStore()
const [tick, setTick] = useState(0)


useEffect(() => {
const id = setInterval(() => setTick((t) => t + 1), 200)
return () => clearInterval(id)
}, [])


const rem = remainingMs()
const done = running && rem <= 0


useEffect(() => { if (done) stop() }, [done, stop])


return (
<div className="card">
<div className="card-header">Pomodoro</div>
<div className="timer-mode">
<button className={mode==='focus'?'active':''} onClick={() => setMode('focus')}>Focus</button>
<button className={mode==='shortBreak'?'active':''} onClick={() => setMode('shortBreak')}>Short Break</button>
<button className={mode==='longBreak'?'active':''} onClick={() => setMode('longBreak')}>Long Break</button>
</div>
<div className="timer-display">{running ? msToMinSec(rem) : `${lengths[mode]}:00`}</div>
<div className="timer-actions">
<button onClick={() => start()}>Start</button>
<button onClick={() => stop()} className="secondary">Stop</button>
</div>
<div className="timer-settings">
<label>
Focus (min)
<input type="number" value={lengths.focus} onChange={e=>setLengths({focus: Number(e.target.value)})} />
</label>
<label>
Short (min)
<input type="number" value={lengths.shortBreak} onChange={e=>setLengths({shortBreak: Number(e.target.value)})} />
</label>
<label>
Long (min)
<input type="number" value={lengths.longBreak} onChange={e=>setLengths({longBreak: Number(e.target.value)})} />
</label>
</div>
</div>
)
}