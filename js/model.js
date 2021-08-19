import API_KEY from './secrets.js'

async function getData() {
  const res = await fetch(
    'https://free-to-play-games-database.p.rapidapi.com/api/games',
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
        'x-rapidapi-key': API_KEY,
      },
    }
  )
  const data = await res.json()
  console.log(data)
}

getData()
