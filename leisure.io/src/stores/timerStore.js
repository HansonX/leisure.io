import { create } from 'zustand'

// Modes
typeof window !== 'undefined' && (window.__leisure = window.__leisure || {})


export const useTimerStore = create((set, get) => ({
mode: 'focus', // 'focus' | 'shortBreak' | 'longBreak'
running: false,
endsAt: null,
lengths: { focus: 25, shortBreak: 5, longBreak: 15 }, // minutes

setMode: (m) => set({ mode: m }),
setLengths: (len) => set((s) => ({ lengths: { ...s.lengths, ...len } })),

start: (mode) => {
    const m = mode || get().mode
    const minutes = get().lengths[m]
    const endsAt = performance.timeOrigin + performance.now() + minutes * 60_000
    set({ mode: m, running: true, endsAt })
},

stop: () => set({ running: false, endsAt: null }),

remainingMs: () => {
    const { running, endsAt } = get()
    if (!running || !endsAt) return 0
        return Math.max(0, endsAt - (performance.timeOrigin + performance.now()))
    }
}))