async function getData() {
  const res = await fetch(
    'https://free-to-play-games-database.p.rapidapi.com/api/games',
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
        'x-rapidapi-key': 'a123bf2cb2mshd5fa2af593ef59ap120794jsn6fe472401051',
      },
    }
  )
  const data = await res.json()
  console.log(data)
}

getData()
