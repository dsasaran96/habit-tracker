import { Pool } from 'pg'

export const pool = new Pool({
    user: "dragossasaran",
    host: "localhost",
    port: 5432,
    database: "habit_app",
})