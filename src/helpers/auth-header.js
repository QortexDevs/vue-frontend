export function authHeader () {
  const apiKey = import.meta.env.VITE_API_KEY
  return { Authorization: 'Api-Key ' + apiKey }
}
