import * as model from './model.js'
import gamesView from './views/gamesView.js'

async function controlGamesGrid() {
  try {
    await model.setState()
    gamesView.render(model.state.games)
  } catch (err) {
    console.log(err)
    throw err
  }
}

function init() {
  controlGamesGrid()
}

init()
