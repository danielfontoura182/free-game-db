import { API_KEY } from './secrets.js'

/* 
developer: "Phoenix Labs, Iron Galaxy"
freetogame_profile_url: "https://www.freetogame.com/dauntless"
game_url: "https://www.freetogame.com/open/dauntless"
genre: "MMORPG"
id: 1
platform: "PC (Windows)"
publisher: "Phoenix Labs"
release_date: "2019-05-21"
short_description: "A free-to-play, co-op action RPG with gameplay similar to Monster Hunter."
thumbnail: "https://www.freetogame.com/g/1/thumbnail.jpg"
title: "Dauntless"

*/
async function getData() {
  try {
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
    return data
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const state = {}

export const currentState = {}

function formatDate(data) {
  const formatted = data

  formatted.forEach((game) => {
    game.release_date = new Date(game.release_date).toLocaleDateString()
  })
  return formatted
}

export async function setState() {
  const data = await getData()
  const dataFormatted = formatDate(data)
  state.games = dataFormatted
  setCurrentState(dataFormatted)
}

export function setCurrentState(data) {
  currentState.games = data
}
