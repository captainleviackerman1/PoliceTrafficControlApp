import supabase from './supabase.js'
// app.js
import supabase from './supabase.js'

// 1️⃣ Get all vehicles
async function getVehicles() {
  const { data, error } = await supabase.from('vehicles').select('*')
  if (error) console.log('Error getting vehicles:', error)
  else console.log('Vehicles:', data)
}

// 2️⃣ Update a traffic light
async function updateTrafficLight(junction, status) {
  const { data, error } = await supabase
    .from('traffic-lights')
    .update({ status })
    .eq('junction', junction)

  if (error) console.log('Error updating traffic light:', error)
  else console.log('Traffic light updated:', data)
}

// 3️⃣ Listen for alerts
async function listenAlerts() {
  supabase
    .from('alerts') // table name
    .on('INSERT', payload => {
      console.log('New alert:', payload.new)
    })
    .subscribe()
}

// Call functions to test
getVehicles()
updateTrafficLight('north', 'GREEN')
listenAlerts()
