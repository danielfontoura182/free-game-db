import View from './View.js'

class gamesView extends View {
  _parentElement = document.querySelector('.games-grid')

  _generateMarkup() {
    const markup = this._data
      .map(
        (game) => ` 
      <div class="game">
      <img
        src="${game.thumbnail}"
        alt=""
        class="game__image"
      />
      <div class="game__name">${game.title}</div>
    </div>
      `
      )
      .join('')

    return markup
  }
}

export default new gamesView()
