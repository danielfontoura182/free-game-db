import * as model from './model.js'
import gamesView from './views/gamesView.js'
import modalView from './views/modalView.js'

async function controlGames() {
  try {
    gamesView.renderSpinner()
    await model.setState()
    gamesView.render(model.state.games)
    controlModal()
    controlGenres()
    controlOderBy()
    controlAllGamesButton()
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
      model.setCurrentState(filteredData)
      gamesView.render(filteredData)
      controlAllGamesButton(true)

      // set selected option back to unordered
      document.getElementById('order-selection').value = 'unordered'
      window.scrollTo(0, 350)
    })
  })
}

function controlOderBy() {
  const orderSelection = document.getElementById('order-selection')

  orderSelection.addEventListener('change', (e) => {
    const value = orderSelection.value

    if (value === 'name') {
      const ordered = [...model.currentState.games]
      gamesView.render(
        ordered.sort((a, b) => {
          return a.title > b.title ? 1 : b.title > a.title ? -1 : 0
        })
      )
    } else {
      gamesView.render(model.currentState.games)
    }
  })
}

function controlAllGamesButton(active = false) {
  const allGamesBtn = document.querySelector('.all-games-button')

  allGamesBtn.addEventListener('click', () => {
    gamesView.render(model.state.games)
    model.setCurrentState(model.state.games)
    allGamesBtn.classList.remove('active')
  })

  if (active) {
    allGamesBtn.classList.add('active')
    return
  }
}

function init() {
  controlGames()
}

init()
