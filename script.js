async function getData() {
  const res = await fetch(
    'https://free-to-play-games-database.p.rapidapi.com/api/games',
    {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'a123bf2cb2mshd5fa2af593ef59ap120794jsn6fe472401051',
        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
      },
    }
  )

  const data = await res.json()
  const genres = []

  /* data.forEach((game) => {
    if (!genres.includes(game.genre)) {
      genres.push(game.genre)
    }
  })*/

  console.log(data)
}

getData()
