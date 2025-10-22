import React from 'react'


export default function BackgroundVideo({ src }) {
return (
<div className="bg-video-container" aria-hidden>
<video
className="bg-video"
src={src}
autoPlay
muted
loop
playsInline
preload="auto"
/>
<div className="bg-video-overlay" />
</div>
)
}