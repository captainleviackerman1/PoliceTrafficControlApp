import { createClient } from '@supabase/supabase-js'

// Use the URL and key your friend gave you
const supabaseUrl = 'https://ylkmgjpodraeyvtbeouf.supabase.co'
const supabaseKey = 'YOUR_ANON_KEY_HERE'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
