import React, { useEffect, useRef, useState } from 'react'
function createWhiteNoise(ctx) {
    var bufferSize = 2 * ctx.sampleRate
    var buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    var data = buffer.getChannelData(0)
    for (var i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1
    var src = ctx.createBufferSource()
    src.buffer = buffer
    src.loop = true
    return src
    }

export default function AudioPlayer() {
    const [on, setOn] = useState(false)
    const [busy, setBusy] = useState(false)
    const ctxRef = useRef(null)
    const gainRef = useRef(null)
    const srcRef = useRef(null)
    
    
    function safeClose() {
    var ctx = ctxRef.current
    if (!ctx) return Promise.resolve()
    if (ctx.state === 'closed') {
    ctxRef.current = null
    return Promise.resolve()
    }
    return ctx.close().catch(function(){ /* ignore */ }).then(function(){ ctxRef.current = null })
    }
    
    
useEffect(function () {
return function cleanup() { safeClose() }
}, [])


function startAudio() {
var AC = window.AudioContext || window.webkitAudioContext
var ctx = new AC()
var gain = ctx.createGain()
gain.gain.setValueAtTime(0.2, ctx.currentTime)
var src = createWhiteNoise(ctx)
src.connect(gain)
gain.connect(ctx.destination)
src.start()
ctxRef.current = ctx
gainRef.current = gain
srcRef.current = src
}


function stopAudio() {
var ctx = ctxRef.current
var gain = gainRef.current
var src = srcRef.current
if (!ctx || !gain) return Promise.resolve()


try { gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3) } catch (e) {}


return new Promise(function (resolve) {
setTimeout(function () {
try { if (src) src.stop() } catch (e) {}
try { if (src) src.disconnect() } catch (e) {}
try { gain.disconnect() } catch (e) {}
gainRef.current = null
srcRef.current = null
safeClose().then(resolve)
}, 320)
})
}


function toggle() {
if (busy) return
setBusy(true)
if (!on) {
startAudio()
setOn(true)
setBusy(false)
} else {
stopAudio().then(function(){
setOn(false)
setBusy(false)
})
}
}


function handleVolume(e) {
var ctx = ctxRef.current
var gain = gainRef.current
if (ctx && gain) {
try { gain.gain.setValueAtTime(parseFloat(e.target.value), ctx.currentTime) } catch (e) {}
}
}


return (
<div className="card">
<div className="card-header">White Noise</div>
<div className="audio-controls">
<button onClick={toggle} disabled={busy}>{on ? 'Stop' : 'Play'}</button>
<input type="range" min={0} max={1} step={0.01} onChange={handleVolume} />
</div>
</div>
)
}