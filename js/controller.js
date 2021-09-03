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
      e.preventDefault()
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

  allGamesBtn.addEventListener('click', (e) => {
    e.preventDefault()

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

  search.addEventListener('keyup', function (e) {
    e.preventDefault()

    renderMatches(this)
    controlAllGamesButton(true)
    window.addEventListener('click', (e) => {
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

    window.mobileCheck = function () {
      let check = false
      ;(function (a) {
        if (
          /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
            a
          ) ||
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
            a.substr(0, 4)
          )
        )
          check = true
      })(navigator.userAgent || navigator.vendor || window.opera)
      return check
    }

    if (window.mobileCheck) {
      window.scrollTo({ top: 615, behavior: 'smooth' })
      return
    }

    window.scrollTo({ top: 450, behavior: 'smooth' })
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

  backTop.addEventListener('click', (e) => {
    e.preventDefault()

    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}

function init() {
  controlGames()
}

init()
