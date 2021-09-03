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
    controlSearch()
    controlBackToTop()
  } catch (err) {
    console.log(err)
    throw err
  }
}

function controlModal() {
  const gamesGrid = document.querySelector('.games-grid')
  gamesGrid.addEventListener('click', (e) => {
    const target = e.target.closest('div')

    if (!target.classList.contains('game-info-hover')) {
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

  const currentGenre = document.querySelector('.current-genre')

  containers.forEach((el) => {
    el.addEventListener('click', (e) => {
      const filteredData = model.state.games.filter(
        (game) =>
          game.genre.toLowerCase().trim() ===
          e.target.textContent.toLowerCase().trim()
      )
      currentGenre.textContent = e.target.textContent
      model.setCurrentState(filteredData)
      gamesView.render(filteredData)
      controlAllGamesButton(true)

      // set selected option back to unordered
      document.getElementById('order-selection').value = 'unordered'
      window.scrollTo({ top: 350, behavior: 'smooth' })
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
  const currentGenre = document.querySelector('.current-genre')

  allGamesBtn.addEventListener('click', () => {
    currentGenre.textContent = 'All games'
    gamesView.render(model.state.games)
    model.setCurrentState(model.state.games)
    allGamesBtn.classList.remove('active')
    document.getElementById('order-selection').value = 'unordered'

    window.scrollTo({ top: 350, behavior: 'smooth' })
  })

  if (active) {
    allGamesBtn.classList.add('active')
    return
  }

  allGamesBtn.classList.remove('active')
}

function controlSearch() {
  const search = document.querySelector('.search')
  const currentGenre = document.querySelector('.current-genre')

  search.addEventListener('keyup', function () {
    renderMatches(this)
    controlAllGamesButton(true)
    window.scrollTo({ top: 350, behavior: 'smooth' })
    window.addEventListener('click', (e) => {
      console.log(e.target)
      if (
        e.target.classList.contains('all-games-button') ||
        e.target.classList.contains('genre') ||
        e.target.classList.contains('main-genre__description')
      ) {
        search.value = ''
      }
    })

    currentGenre.textContent = ''

    if (this.value === '') {
      currentGenre.textContent = 'All games'
      controlAllGamesButton()
    }
  })
}

function findMatches(toMatch, data) {
  return data.filter((item) => {
    const regex = new RegExp(toMatch, 'gi')
    return item.title.match(regex)
  })
}

function renderMatches(search) {
  const matchResult = findMatches(search.value, model.state.games)

  if (!matchResult || matchResult.length === 0) {
    gamesView.renderNoMatch()
    return
  }

  model.setCurrentState(matchResult)
  gamesView.render(matchResult)
}

function controlBackToTop() {
  const backTop = document.querySelector('.back-to-top')

  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}

function init() {
  controlGames()
}

init()
