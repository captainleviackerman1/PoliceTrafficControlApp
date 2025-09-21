import { createClient } from '@supabase/supabase-js'

// Use the URL and key your friend gave you
const supabaseUrl = 'https://ylkmgjpodraeyvtbeouf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzl1NilslnR5cCI6IKpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSlslnJIZil6lnlsa21nanBvZHJhZXL2dGJIb3Vmliwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0mjY5ODgslmV4cCI6MjA3NDAwMjk4Oh0.MfC--yVM00uLbv9Oz8e6AJa669fVhatrjeFZTKx4CKg'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
