import View from './View.js'

class gamesView extends View {
  _parentElement = document.querySelector('.games-grid')

  _generateMarkup() {
    const markup = this._data
      .map(
        (game) => ` 
      <div class="game" data-id="${game.id}">
      <img
        src="${game.thumbnail}"
        alt=""
        class="game__image"
      />
      <div class="game__name">${game.title}</div>
      <div class="game-info-hover" data-id="${game.id}">
      ${
        game.short_description.length < 120
          ? game.short_description
          : game.short_description.slice(0, 120) + '...'
      } <br><br>
      <span>Click to see more.</span>
    </div>
    </div>
    
      `
      )
      .join('')

    return markup
  }
}

export default new gamesView()
