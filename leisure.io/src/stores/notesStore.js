import { create } from 'zustand'
import Dexie from 'dexie'

const db = new Dexie('leisure_db')
db.version(1).stores({ notes: 'id, updatedAt' })

export const useNotesStore = create((set, get) => ({
notes: [],

load: async () => {
const rows = await db.table('notes').orderBy('updatedAt').reverse().toArray()
set({ notes: rows })
},

upsert: async (note) => {
await db.table('notes').put(note)
await get().load()
},

remove: async (id) => {
await db.table('notes').delete(id)
await get().load()
}
}))