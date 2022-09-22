import Dexie from 'dexie';

export const db = new Dexie('db');
db.version(1).stores({
    pastSolves: '++id, time',
})