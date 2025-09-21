import supabase from './supabase.js'
async function getVehicles() {
  const { data, error } = await supabase.from('vehicles').select('*')
  if (error) console.log(error)
  else console.log(data)
}

getVehicles()
