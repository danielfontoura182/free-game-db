import * as model from './model.js'
import gamesView from './views/gamesView.js'
import modalView from './views/modalView.js'

async function controlGames() {
  try {
    await model.setState()
    gamesView.render(model.state.games)
    controlModal()
    controlGenres()
  } catch (err) {
    console.log(err)
    throw err
  }
}

function controlModal() {
  const gamesGrid = document.querySelector('.games-grid')
  gamesGrid.addEventListener('click', (e) => {
    const target = e.target.closest('div')

    if (!target.classList.contains('game')) {
      return
    }

    const gameToPass = model.state.games.filter(
      (game) => game.id === +target.dataset.id
    )[0]
    openModal(gameToPass)

    // close modal
    const modal = document.querySelector('.modal')
    modal.addEventListener('click', (e) => {
      if (
        e.target.classList.contains('modal') ||
        e.target.classList.contains('close-modal')
      )
        closeModal()
    })
  })
}

function openModal(game) {
  modalView.render(game, true)
}

function closeModal() {
  document.querySelector('.modal').remove()
}

function controlGenres() {
  const containers = [
    document.querySelector('.main-container'),
    document.querySelector('.genres-container'),
  ]

  containers.forEach((el) => {
    el.addEventListener('click', (e) => {
      const filteredData = model.state.games.filter(
        (game) =>
          game.genre.toLowerCase().trim() ===
          e.target.textContent.toLowerCase().trim()
      )
      gamesView.render(filteredData)
      window.scrollTo(0, 350)
    })
  })
}

function init() {
  controlGames()
}

init()
